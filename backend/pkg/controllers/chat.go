package controllers

import (
	"fmt"

	"01.kood.tech/git/Hems_Chrisworth/bomberman-dom/backend/application"
	"01.kood.tech/git/Hems_Chrisworth/bomberman-dom/backend/pkg/controllers/wsconnection"
	"01.kood.tech/git/Hems_Chrisworth/bomberman-dom/backend/pkg/webmodel"
	"01.kood.tech/git/Hems_Chrisworth/bomberman-dom/backend/pkg/webmodel/parse"
)

const (
	PRIVATE_CHAT_ROOM = "private"
	GROUP_CHAT_ROOM   = "group"
)

/*
broadcasts messages to clients connected to the chat
*/
func ReplySendMessageToChat(app *application.Application) wsconnection.FuncReplyCreator {
	return func(currConnection *wsconnection.UsersConnection, message webmodel.WSMessage) (any, error) {
		chatMessage, err := parse.PayloadToChatMessage(message.Payload)
		if err != nil {
			return nil, currConnection.WSError(fmt.Sprintf("Invalid payload for a chat message: '%s'", message.Payload), err)
		}

		errmessage := chatMessage.Validate()
		if errmessage != "" {
			return nil, currConnection.WSBadRequest(message, errmessage)
		}

		chatMessage.UserName = currConnection.Client.UserName

		_, _, err = currConnection.SendMessageToClientRoom(webmodel.InputChatMessage, chatMessage)
		if err != nil {
			return nil, currConnection.WSError("sending message to client room failed", err)
		}
		return "sent", err // reply to current user
	}
}
