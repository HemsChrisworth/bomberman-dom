package routes

import (
	"01.kood.tech/git/Hems_Chrisworth/bomberman-dom/backend/application"
	"01.kood.tech/git/Hems_Chrisworth/bomberman-dom/backend/pkg/controllers"
	"01.kood.tech/git/Hems_Chrisworth/bomberman-dom/backend/pkg/controllers/wsconnection"
	"01.kood.tech/git/Hems_Chrisworth/bomberman-dom/backend/pkg/webmodel"
)

func CreateChatWsRoutes(app *application.Application) wsconnection.WSmux { // wsconnection.WSmux is map[string]Replier
	wsServer := wsconnection.WSmux{
		InfoLog: app.InfoLog,
		ErrLog:  app.ErrLog,
		Hub:     app.Hub,
	}
	wsServer.WShandlers = map[string]wsconnection.Replier{
		webmodel.SendMessageToChat: controllers.ReplySendMessageToChat(app),
		webmodel.PlayerAction:      controllers.ReplyPlayerAction(app),
		webmodel.StartGame:         controllers.ReplyStartGame(app),
		webmodel.ReadyToStart:      controllers.ReadyToStart(app),
		webmodel.UserQuitChat:      controllers.SendUserToRoomMembers(webmodel.UserQuitChat),
	}
	// TODO make frontend send message gameOver and handle it here: {}.sendRely() - close conn and unregister the client and its room
	return wsServer
}
