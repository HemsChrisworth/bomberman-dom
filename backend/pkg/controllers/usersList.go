package controllers

import (
	"errors"
	"fmt"

	"01.kood.tech/git/Hems_Chrisworth/bomberman-dom/backend/application"
	"01.kood.tech/git/Hems_Chrisworth/bomberman-dom/backend/pkg/controllers/wsconnection"
	"01.kood.tech/git/Hems_Chrisworth/bomberman-dom/backend/pkg/webmodel"
)

/*
sends the list of users in chat to the new joined user
and the new user's joined status to the other users in chat
*/
func SendListOfUsersInRoom(app *application.Application, currConnection *wsconnection.UsersConnection) error {
	err := sendListOfUsersInRoomToCurrentUser(app, currConnection)
	if err != nil && !errors.Is(err, webmodel.ErrWarning) {
		return currConnection.WSError(fmt.Sprintf("sending list of users in the room '%s' to the user %s faild", currConnection.Client.Room.ID, currConnection.Client.UserName), err)
	}

	// send the new user to the room members
	err = SendUserToRoomMembers(webmodel.UserJoinedRoom)(currConnection, webmodel.WSMessage{})
	if err != nil {
		return errors.Join(webmodel.ErrWarning, err)
	}

	return nil
}

/*
sends list of users in room to the current user
*/
func sendListOfUsersInRoomToCurrentUser(app *application.Application, currConnection *wsconnection.UsersConnection) error {
	users := currConnection.Client.Room.GetUsersInRoom()

	_, err := currConnection.SendSuccessMessage(webmodel.UsersInRoom, users)
	return err
}

/*
sends current user's status (join/quit chat) to users in the user's chat room
*/
func SendUserToRoomMembers(statusType string) wsconnection.FuncReplier {
	return func(currConnection *wsconnection.UsersConnection, wsMessage webmodel.WSMessage) error {
		_, _, err := currConnection.SendMessageToClientRoom(statusType, currConnection.Client.UserName)
		return err
	}
}
