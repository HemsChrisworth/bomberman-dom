package wshub

import (
	"fmt"
	"sync"
)

type SafeClientsMap struct {
	sync.RWMutex
	items map[string]*Client
}

func NewSafeClientsMap() *SafeClientsMap {
	sm := &SafeClientsMap{}
	sm.items = make(map[string]*Client)
	return sm
}

type Room struct {
	ID         string          `json:"id"`
	Clients    *SafeClientsMap `json:"-"`
	Registered chan bool
	GameMap string // for the game map from randomMapGenerator func
}

type SafeRoomsMap struct {
	sync.RWMutex
	items map[string]*Room
}

func NewSafeRoomsMap() *SafeRoomsMap {
	sm := &SafeRoomsMap{}
	sm.items = make(map[string]*Room)
	return sm
}

func (sm *SafeClientsMap) Set(key string, value *Client) {
	sm.Lock()
	defer sm.Unlock()
	sm.items[key] = value
}

func (sm *SafeClientsMap) Get(key string) (value *Client, ok bool) {
	sm.RLock()
	defer sm.RUnlock()
	value, ok = sm.items[key]
	return value, ok
}

func (sm *SafeClientsMap) Len() int {
	sm.RLock()
	defer sm.RUnlock()

	return len(sm.items)
}

func (sm *SafeClientsMap) Delete(key string) {
	sm.Lock()
	defer sm.Unlock()
	delete(sm.items, key)
}

func (sm *SafeClientsMap) RRange(act func(key string, value *Client)) {
	sm.RLock()
	defer sm.RUnlock()
	for key, value := range sm.items {
		act(key, value)
	}
}

func (sm *SafeRoomsMap) Set(key string, value *Room) {
	sm.Lock()
	defer sm.Unlock()
	sm.items[key] = value
}

func (sm *SafeRoomsMap) Get(key string) (value *Room, ok bool) {
	sm.RLock()
	defer sm.RUnlock()
	value, ok = sm.items[key]
	return value, ok
}

func (sm *SafeRoomsMap) Len() int {
	sm.RLock()
	defer sm.RUnlock()

	return len(sm.items)
}

func (sm *SafeRoomsMap) Delete(key string) {
	sm.Lock()
	defer sm.Unlock()
	delete(sm.items, key)
}

func (sm *SafeRoomsMap) RRange(act func(key string, value *Room)) {
	sm.RLock()
	defer sm.RUnlock()
	for key, value := range sm.items {
		act(key, value)
	}
}

/*
creates a new room and registers it in the hub
*/
func NewRoom(hub *Hub, ID string) (*Room, bool) {
	room := createRoom(hub, ID)

	hub.RegisterRoomToHub(room)
	// Wait for client registration to complete
	ok := <-room.Registered
	return room, ok
}

func createRoom(hub *Hub, ID string) *Room {
	return &Room{
		ID:         ID,
		Clients:    NewSafeClientsMap(),
		Registered: make(chan bool),
	}
}

func (r *Room) isThereClient(client *Client) bool {
	_, ok := r.Clients.Get(client.UserName)
	return ok
}

func (r *Room) DeleteClient(client *Client) {
	if r.isThereClient(client) {
		r.Clients.Delete(client.UserName)
	}
}

func (r *Room) GetUsersInRoom() []ClientUser {
	r.Clients.RLock()
	defer r.Clients.RUnlock()

	users := make([]ClientUser, len(r.Clients.items))
	i := 0
	for _, client := range r.Clients.items {
		users[i] = client.ClientUser
		i++
	}

	return users
}

/*
*
returns number of users in the room
*/
func (r *Room) Size() int {
	return r.Clients.Len()
}

func (r *Room) ContainsUser(UserName string) bool {
	r.Clients.RLock()
	defer r.Clients.RUnlock()

	for _, client := range r.Clients.items {
		if client.UserName == UserName {
			return true
		}
	}

	return false
}

func (r *Room) String() string {
	return fmt.Sprintf("id: %s", r.ID)
}
