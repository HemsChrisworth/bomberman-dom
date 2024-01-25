package wshub

import (
	"fmt"

	"github.com/gorilla/websocket"
)

// Client is a middleman between the websocket connection and the hub.
type Client struct {
	UserName   string
	Room *Room

	// The websocket connection.
	Conn *websocket.Conn
	// Buffered channel of received messages.
	ReceivedMessages chan []byte
	// TODO chan for hub errors

	Registered chan bool
}

// TODO use this in the correct place
func NewClient(hub *Hub, userName string, room *Room, conn *websocket.Conn, receivedMessages chan []byte, clientRegistered chan bool) (*Client, error) {
	client := &Client{
		UserName: userName,
		Room:       room,
		Conn:       conn,
	}

	if receivedMessages == nil {
		client.ReceivedMessages = make(chan []byte, 256)
	} else {
		client.ReceivedMessages = receivedMessages
	}

	if clientRegistered == nil {
		client.Registered = make(chan bool)
	} else {
		client.Registered = clientRegistered
	}

	hub.RegisterClientToHub(client)
	// Wait for client registration to complete
	ok := <-client.Registered
	if !ok {
		return nil, fmt.Errorf("cannot create a client: room id '%s' does not exist", room.ID)
	}
	return client, nil
}

func (c *Client) WriteMessage(message []byte) {
	c.ReceivedMessages <- message
}

func (c *Client) String() string {
	return fmt.Sprintf("addr: %p || User:'%s' || connection: %p || channels: clientRegistered %p  |  ReceivedMessages %p", c, c.UserName, c.Conn, c.Registered, c.ReceivedMessages)
}
