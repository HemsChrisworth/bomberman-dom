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
		webmodel.UserQuitChat:      wsconnection.FuncReplier(controllers.SendUserToRoomMembers(webmodel.UserQuitChat)),
	}

	return wsServer
}
