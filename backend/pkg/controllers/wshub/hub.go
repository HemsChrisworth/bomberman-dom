package wshub

import (
	"encoding/json"
	"fmt"
)

const (
	UNIVERSAL_ROOM_ID = "UniversalRoom"
)

// Hub maintains the set of active clients and broadcasts messages to the clients.
type Hub struct {
	// Registered Rooms.
	Rooms   *SafeRoomsMap

	broadcast chan *message

	clientRegister   chan *Client
	clientUnregister chan *Client

	roomRegister   chan *Room
	roomUnregister chan *Room

	// OnlineUsersRequest chan *Client
}

func NewHub() *Hub {
	hub := &Hub{
		broadcast:         make(chan *message),
		Rooms:             NewSafeRoomsMap(),
		clientRegister:    make(chan *Client),
		clientUnregister:  make(chan *Client),
		roomRegister:      make(chan *Room),
		roomUnregister:    make(chan *Room),
	}

	return hub
}

type message struct {
	content   json.RawMessage
	room      *Room
	sentTo chan map[string]bool
}

func (h *Hub) Run() {
	for { 
		select {
		case room := <-h.roomRegister:
			if !h.isThereRoom(room) {
				h.Rooms.Set(room.ID, room)
				room.Registered <- true
			} else {
				fmt.Printf("room id %s is already registered", room.ID)
				room.Registered <- false
			}
			
		case room := <-h.roomUnregister:			
			if h.isThereRoom(room) {
				h.Rooms.Delete(room.ID)
			}

		case client := <-h.clientRegister:
			if h.isThereRoom(client.Room) {
				client.Room.Clients.Set(client.UserName, client)

				client.Registered <- true
			} else {
				client.Registered <- false
			}

		case client := <-h.clientUnregister:
			if h.isThereRoom(client.Room) {
				if client.Room.isThereClient(client) {
					client.Room.DeleteClient(client)
					// TODO: if client.Room.Clients.Len() != 0 send a message fmt.Sprintf("user %s left the chat", client.UserName)
				}
			}

		case message := <-h.broadcast:
			// h.rooms.Lock()

			if h.isThereRoom(message.room) {
				usersSentTo := make(map[string]bool)
				for _, client := range message.room.Clients.items {
					usersSentTo[client.UserName] = sendMessageToClient(message.content, client)
				}

				message.sentTo <- usersSentTo
			}
		}
	}
}

func sendMessageToClient(messageContent json.RawMessage, client *Client) bool {
	select {
	case client.ReceivedMessages <- messageContent: 
		return true
	default:
		// If the client's send buffer is full, then the hub assumes that the client is dead or stuck.
		// In this case, the hub unregisters the client.
		close(client.ReceivedMessages)
		client.Room.DeleteClient(client)
		return false
	}
}

// RegisterRoomToHub registers the room to its hub
func (h *Hub) RegisterRoomToHub(r *Room) {
	h.roomRegister <- r
}

// UnRegisterRoomToHub removes the room from its hub
func (h *Hub) UnRegisterRoomFromHub(r *Room) {
	h.roomUnregister <- r
}

// RegisterClientToHub registers the client to its hub
func (h *Hub) RegisterClientToHub(c *Client) {
	h.clientRegister <- c
}

// UnRegisterClientToHub removes the client from its hub
func (h *Hub) UnRegisterClientFromHub(c *Client) {
	h.clientUnregister <- c
}

func (h *Hub) isThereRoom(room *Room) bool {
	_, ok := h.Rooms.items[room.ID]
	return ok
}

func (h *Hub) GetRoom(id string) (*Room, bool) {
	h.Rooms.RLock()
	defer h.Rooms.RUnlock()
	room, ok := h.Rooms.items[id]
	return room, ok
}

func (h *Hub) BroadcastMessageInRoom(content json.RawMessage, room *Room)  map[string]bool{
	message := &message{
		content:   content,
		room:      room,
		sentTo: make(chan map[string]bool),
	}

	h.broadcast <- message
	return <-message.sentTo	
}
