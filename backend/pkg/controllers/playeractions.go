package controllers

import (
	"01.kood.tech/git/Hems_Chrisworth/bomberman-dom/backend/application"
	"01.kood.tech/git/Hems_Chrisworth/bomberman-dom/backend/pkg/controllers/wsconnection"
	"01.kood.tech/git/Hems_Chrisworth/bomberman-dom/backend/pkg/webmodel"
)

func ReadyToStart(app *application.Application) wsconnection.FuncReplier {
	return func(currConnection *wsconnection.UsersConnection, wsMessage webmodel.WSMessage) error {
		if app.WaitingRoom != nil && app.WaitingRoom.ID == currConnection.Client.Room.ID {
			app.WaitingRoom = nil
		}
		return nil
	}
}

/*
ReplyStartGame sends the GameMap String, which is used for the frontend to generate the gameMap
*/
func ReplyStartGame(app *application.Application) wsconnection.FuncReplyCreator {
	return func(currConnection *wsconnection.UsersConnection, message webmodel.WSMessage) (any, error) {
		if app.WaitingRoom != nil && app.WaitingRoom.ID == currConnection.Client.Room.ID {
			app.WaitingRoom = nil
		}
		return currConnection.Client.Room.GameMap, nil // reply to current user
	}
}

/*
broadcasts messages to clients connected to the chat
*/
func ReplyPlayerAction(app *application.Application) wsconnection.FuncReplier {
	return func(currConnection *wsconnection.UsersConnection, message webmodel.WSMessage) error {

		playerAction := webmodel.PlrAction{
			UserName: currConnection.Client.UserName,
			Action:   message.Payload,
		}

		_, _, err := currConnection.SendMessageToClientRoom(webmodel.PlayerAction, playerAction)
		if err != nil {
			return currConnection.WSError("sending action to client room failed", err)
		}
		return nil
		//return "sent", err // reply to current user
	}
}
