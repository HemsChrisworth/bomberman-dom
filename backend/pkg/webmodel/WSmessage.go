package webmodel

import (
	"encoding/json"
	"errors"
	"fmt"
	"strings"
)

const (
	ERROR = "ERROR"

	UsersInRoom    = "usersInRoom"
	UserJoinedRoom = "userJoinedRoom"
	UserQuitChat   = "userQuitChat"
	InputChatMessage       = "inputChatMessage"
	SendMessageToChat      = "sendMessageToChat"
	UserOffline = "offlineUser"

	OnlineUsers = "onlineUsers"
	UserOnline  = "newOnlineUser"
)


var ErrWarning = errors.New("Warning")

type Payload struct {
	Result string `json:"result"`
	Data   any    `json:"data,omitempty"`
}

type WSMessage struct {
	Type    string          `json:"type"`
	Payload json.RawMessage `json:"payload"`
}

func (m *WSMessage) String() string {
	if m == nil {
		return "nil"
	}
	return fmt.Sprintf("Type: %s | Payload: %s\n", m.Type, m.Payload)
}

func (m *WSMessage) CreateReplyToRequestMessage(result string, data any) (json.RawMessage, error) {
	return CreateJSONMessage(m.Type, result, data)
}

func CreateJSONMessage(messageType string, result string, data any) (json.RawMessage, error) {
	wsMessage, err := createWSMessage(messageType, result, data)
	if err != nil {
		return nil, fmt.Errorf("CreateJSONMessage failed: %v", err)
	}

	jsonMessage, err := json.Marshal(wsMessage)
	if err != nil {
		return nil, fmt.Errorf("CreateJSONMessage failed: %v", err)
	}
	return jsonMessage, nil
}

func createWSMessage(messageType string, result string, data any) (WSMessage, error) {
	payload, err := json.Marshal(Payload{Result: result, Data: data})
	if err != nil {
		return WSMessage{}, fmt.Errorf("createWSMessage failed: %v", err)
	}
	message := WSMessage{
		Type:    messageType,
		Payload: payload,
	}
	return message, nil
}

func IsEmpty(field string) bool {
	return strings.TrimSpace(field) == "" || field == "undefined"
}
