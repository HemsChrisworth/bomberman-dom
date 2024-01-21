package wsconnection

import (
	"encoding/json"

	"01.kood.tech/git/Hems_Chrisworth/bomberman-dom/backend/pkg/controllers/wshub"
	"01.kood.tech/git/Hems_Chrisworth/bomberman-dom/backend/pkg/helpers"
	"01.kood.tech/git/Hems_Chrisworth/bomberman-dom/backend/pkg/webmodel"
)

type UsersConnection struct {
	Client   *wshub.Client
	WsServer WSmux
}

/*
sends uc.Client a successful reply to the requestMessage with the data as payload
*/
func (uc *UsersConnection) SendReply(requestMessage webmodel.WSMessage, data any) error {
	wsMessage, err := requestMessage.CreateReplyToRequestMessage("success", data)
	if err != nil {
		return uc.WSErrCreateMessage(err)
	}

	uc.Client.WriteMessage(wsMessage)
	uc.WsServer.InfoLog.Printf("send message %s to channel of client %p", helpers.ShortMessage(wsMessage), uc.Client)
	return nil
}

/*
sends uc.Client a successful message with the type = 'messageType' and 'data' as payload.
It returns the message converted into json.
It returns error if the message could not be converted to json.
*/
func (uc *UsersConnection) SendSuccessMessage(messageType string, data any) (json.RawMessage, error) {
	wsMessage, err := webmodel.CreateJSONMessage(messageType, "success", data)
	if err != nil {
		return wsMessage, uc.WSErrCreateMessage(err)
	}

	uc.Client.WriteMessage(wsMessage)
	return wsMessage, nil
}

/*
sends to the 'room' a successful message with the type = 'messageType' and 'data' as payload.
It returns the message converted into json and a map with true value if the message was sent successfully and false otherwise.
It returns error if the message could not be converted to json.
*/
func (uc *UsersConnection) SendMessageToClientRoom(messageType string, data any) (json.RawMessage, map[string]bool, error) {
	wsMessage, err := webmodel.CreateJSONMessage(messageType, "success", data)
	if err != nil {
		return wsMessage, nil, uc.WSErrCreateMessage(err)
	}

	sentMarksMap := uc.SendBytesToClientRoom(wsMessage)

	return wsMessage, sentMarksMap, nil
}

/*
sends bytes to the 'room' .
It returns the message converted into json and a map with true value if the message was sent successfully and false otherwise.
*/
func (uc *UsersConnection) SendBytesToClientRoom(rawData []byte) map[string]bool {
	sentMarksMap := uc.WsServer.Hub.BroadcastMessageInRoom(rawData, uc.Client.Room)

	return sentMarksMap
}
