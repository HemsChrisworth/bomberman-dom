package wsconnection

import (
	"encoding/json"

	"01.kood.tech/git/Hems_Chrisworth/social-network/backend/application"
	"01.kood.tech/git/Hems_Chrisworth/social-network/backend/pkg/controllers/wshub"
	"01.kood.tech/git/Hems_Chrisworth/social-network/backend/pkg/helpers"
	"01.kood.tech/git/Hems_Chrisworth/social-network/backend/pkg/session"
	"01.kood.tech/git/Hems_Chrisworth/social-network/backend/pkg/webmodel"
)

type UsersConnection struct {
	Session  *session.Session
	Client   *wshub.Client
	Repliers WSmux
}

/*
checks the session status, changes it if necessary. Returns nil only if the session has Loggedin status,
otherwise sends an error message to the websocket connection ('conn') and returns an error
*/
func (uc *UsersConnection) CheckLoggedStatus(app *application.Application, requestMessage webmodel.WSMessage) error {
	_, err := uc.Session.Tidy(app)
	if err != nil {
		return uc.WSError(app, "invalid session status", err)
	}
	if !uc.Session.IsLoggedin() {
		return uc.WSBadRequest(app, requestMessage, "not logged in")
	}

	return nil
}

/*
sends uc.Client a successful reply to the requestMessage with the data as payload
*/
func (uc *UsersConnection) SendReply(app *application.Application, requestMessage webmodel.WSMessage, data any) error {
	wsMessage, err := requestMessage.CreateReplyToRequestMessage("success", data)
	if err != nil {
		return uc.WSErrCreateMessage(app, err)
	}

	uc.Client.WriteMessage(wsMessage)
	app.InfoLog.Printf("send message %s to channel of client %p", helpers.ShortMessage(wsMessage), uc.Client)
	return nil
}

/*
sends uc.Client a successful message with the type = 'messageType' and 'data' as payload.
It returns the message converted into json.
It returns error if the message could not be converted to json.
*/
func (uc *UsersConnection) SendSuccessMessage(app *application.Application, messageType string, data any) (json.RawMessage, error) {
	wsMessage, err := webmodel.CreateJSONMessage(messageType, "success", data)
	if err != nil {
		return wsMessage, uc.WSErrCreateMessage(app, err)
	}

	uc.Client.WriteMessage(wsMessage)
	return wsMessage, nil
}

/*
sends 'recipient' client a successful message with the type = 'messageType' and 'data' as payload.
It returns the message converted into json.
It returns error if the message could not be converted to json.
*/
func (uc *UsersConnection) SendMessageToOtherClient(app *application.Application, recipient *wshub.Client, messageType string, data any) (json.RawMessage, error) {
	wsMessage, err := webmodel.CreateJSONMessage(messageType, "success", data)
	if err != nil {
		return wsMessage, uc.WSErrCreateMessage(app, err)
	}

	recipient.WriteMessage(wsMessage)
	return wsMessage, nil
}

/*
sends a client of the user with given 'userID' a successful message with the type = 'messageType' and 'data' as payload.
It returns the message converted into json and true if the message was sent successfully.
It returns error if the message could not be converted to json.
*/
func (uc *UsersConnection) SendMessageToUser(app *application.Application, userID string, messageType string, data any) (json.RawMessage, bool, error) {
	wsMessage, err := webmodel.CreateJSONMessage(messageType, "success", data)
	if err != nil {
		return wsMessage, false, uc.WSErrCreateMessage(app, err)
	}

	ok := uc.SendBytesToUser(app, userID, wsMessage)

	return wsMessage, ok, nil
}

/*
sends bytes to a client of the user with given 'userID'.
It returns the message converted into json and true if the message was sent successfully.
It returns error if the message could not be converted to json.
*/
func (uc *UsersConnection) SendBytesToUser(app *application.Application, userID string, rawData []byte) bool {
	sentMark := app.Hub.SendMessageToUsers(rawData, []string{userID})
	_, ok := sentMark[userID]

	return ok
}

/*
sends clients of the users on the list a successful message with the type = 'messageType' and 'data' as payload.
It returns the message converted into json and true if the message was sent successfully.
It returns error if the message could not be converted to json.
*/
func (uc *UsersConnection) SendMessageToUsers(app *application.Application, usersID []string, messageType string, data any) (json.RawMessage, map[string]bool, error) {
	wsMessage, err := webmodel.CreateJSONMessage(messageType, "success", data)
	if err != nil {
		return wsMessage, nil, uc.WSErrCreateMessage(app, err)
	}

	sentMark := uc.SendBytesToUsers(app, usersID, wsMessage)

	return wsMessage, sentMark, nil
}

/*
sends bytes to clients of the users on the list.
It returns the message converted into json and true if the message was sent successfully.
It returns error if the message could not be converted to json.
*/
func (uc *UsersConnection) SendBytesToUsers(app *application.Application, usersID []string, rawData []byte) map[string]bool {
	sentMark := app.Hub.SendMessageToUsers(rawData, usersID)

	return sentMark
}

/*
sends to the 'room' a successful message with the type = 'messageType' and 'data' as payload.
It returns the message converted into json and a map with true value if the message was sent successfully and false otherwise.
It returns error if the message could not be converted to json.
*/
func (uc *UsersConnection) SendMessageToClientRoom(app *application.Application, messageType string, data any) (json.RawMessage, map[string]bool, error) {
	wsMessage, err := webmodel.CreateJSONMessage(messageType, "success", data)
	if err != nil {
		return wsMessage, nil, uc.WSErrCreateMessage(app, err)
	}

	sentMarksMap := uc.SendBytesToClientRoom(app, wsMessage)

	return wsMessage, sentMarksMap, nil
}

/*
sends bytes to the 'room' .
It returns the message converted into json and a map with true value if the message was sent successfully and false otherwise.
*/
func (uc *UsersConnection) SendBytesToClientRoom(app *application.Application, rawData []byte) map[string]bool {
	sentMarksMap := app.Hub.BroadcastMessageInRoom(rawData, uc.Client.Room)

	return sentMarksMap
}

