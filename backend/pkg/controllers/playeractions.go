package controllers

import (
	"01.kood.tech/git/Hems_Chrisworth/bomberman-dom/backend/application"
	"01.kood.tech/git/Hems_Chrisworth/bomberman-dom/backend/pkg/controllers/wsconnection"
	"01.kood.tech/git/Hems_Chrisworth/bomberman-dom/backend/pkg/webmodel"
)

/*
ReplyStartGame sends the GameMap String, which is used for the frontend to generate the gameMap
*/
func ReplyStartGame(app *application.Application) wsconnection.FuncReplyCreator {
	return func(currConnection *wsconnection.UsersConnection, message webmodel.WSMessage) (any, error) {
		if app.WaitingRoom != nil && app.WaitingRoom.ID==currConnection.Client.Room.ID {
			app.WaitingRoom = nil
		}
		return currConnection.Client.Room.GameMap, nil // reply to current user
	}
}

/*
broadcasts messages to clients connected to the chat
*/
func ReplyPlayerAction(app *application.Application) wsconnection.FuncReplyCreator {
	return func(currConnection *wsconnection.UsersConnection, message webmodel.WSMessage) (any, error) {
		// action, err := parse.PayloadToString(message.Payload)
		// if err != nil {
		// 	return nil, currConnection.WSError(fmt.Sprintf("Invalid payload for a player's action: '%s'", message.Payload), err)
		// }

		playerAction := webmodel.PlrAction{
			UserName: currConnection.Client.UserName,
			Action:   message.Payload,
		}

		_, _, err := currConnection.SendMessageToClientRoom(webmodel.PlayerAction, playerAction)
		if err != nil {
			return nil, currConnection.WSError("sending action to client room failed", err)
		}
		return "sent", err // reply to current user
	}
}
