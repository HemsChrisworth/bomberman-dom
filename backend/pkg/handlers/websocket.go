package handlers

import (
	"errors"
	"fmt"
	"net/http"
	"net/url"

	"01.kood.tech/git/Hems_Chrisworth/bomberman-dom/backend/application"
	"01.kood.tech/git/Hems_Chrisworth/bomberman-dom/backend/pkg/controllers"
	"01.kood.tech/git/Hems_Chrisworth/bomberman-dom/backend/pkg/controllers/wsconnection"
	"01.kood.tech/git/Hems_Chrisworth/bomberman-dom/backend/pkg/controllers/wshub"
	"01.kood.tech/git/Hems_Chrisworth/bomberman-dom/backend/pkg/errorhandle"
	"01.kood.tech/git/Hems_Chrisworth/bomberman-dom/backend/pkg/helpers"
	"01.kood.tech/git/Hems_Chrisworth/bomberman-dom/backend/pkg/webmodel"
	"github.com/gorilla/websocket"
)

const (
	JOOIN_GAME_URL = "/joinGame"
)

const MAX_ROOM_SIZE = 4

var Err_Duplicate_User = errors.New("duplicate user name")

type contestKey string

const CTX_USER = contestKey("userSession")

func logErrorAndCloseConn(app *application.Application, conn *websocket.Conn, errMessage string, err error) {
	app.ErrLog.Printf("%s: %v", errMessage, err)

	err = conn.Close()
	if err != nil {
		app.ErrLog.Printf("error closing connection: %v", err)
	}
}

func JoinGame(app *application.Application, wsReplyersSet wsconnection.WSmux) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		w.Header().Add("Access-Control-Allow-Credentials", "true")
		w.Header().Add("Access-Control-Allow-Headers", "*")
		w.Header().Add("Access-Control-Allow-Origin", "http://localhost:8080")
		// create chat and join current user to it
		var err error

		userName, err := getChatParams(r.URL)
		if err != nil {
			errorhandle.BadRequestError(app, w, r, err.Error())
			return
		}

		if app.WaitingRoom == nil {
			app.WaitingRoom, err = createRoom(app.Hub)
			if err != nil {
				errorhandle.BadRequestError(app, w, r, err.Error())
				return
			}
			app.InfoLog.Printf("WaitingRoom created, id: %s", app.WaitingRoom)
			
		}

		conn, err := app.Upgrader.Upgrade(w, r, nil)
		if err != nil {
			errorhandle.ServerError(app, w, r, "Upgrade failed:", err)
			return
		}
		// the connection will be closed in WritePump or ReadPump functions
		app.InfoLog.Printf("connection %p to '%s' is upgraded to the WebSocket protocol", conn, r.URL.Path)

		currentConnection, err := createClient(app, userName, conn, wsReplyersSet)
		if err == Err_Duplicate_User {
			wsMessage, err1 := webmodel.CreateJSONMessage(webmodel.UsersInRoom, webmodel.ERROR_RESULT, err.Error())
			if err1 != nil {
				conn.Close()
				errorhandle.ServerError(app, w, r, "cant create a client:", err)
				return
			}
			conn.WriteMessage(websocket.TextMessage, wsMessage)
			conn.Close()
			errorhandle.BadRequestError(app, w, r, err.Error())
			return
		}
		if err != nil {
			conn.Close()
			errorhandle.ServerError(app, w, r, "cant create a client:", err)
			return
		}

		go currentConnection.WritePump()
		go currentConnection.ReadPump()

		err = controllers.SendListOfUsersInRoom(app, currentConnection)
		if err != nil && !errors.Is(err, webmodel.ErrWarning) {
			logErrorAndCloseConn(app, conn, "sending users in room failed", err)
			return
		}

		app.InfoLog.Printf("User '%s' joined  room '%s' ", userName, currentConnection.Client.Room)
	}
}

/*
gets user's name from the request's url.
URL must be  "/joinRoom?name=<userName>"
*/
func getChatParams(url *url.URL) (userName string, err error) {
	userName = url.Query().Get("name")
	if userName == "" {
		err = fmt.Errorf("no name specified")
	}

	return
}

/*
creates a room in hub.
*/
func createRoom(hub *wshub.Hub) (*wshub.Room, error) {
	var roomID string

	roomID, err := helpers.GenerateNewUUID()
	if err != nil {
		return nil, fmt.Errorf("cannot generate uuid for new room: %v", err)
	}

	waitingRoom, ok := wshub.NewRoom(hub, roomID)
	if !ok {
		return nil, fmt.Errorf("room with id '%s' was already created, try again", roomID)
	}

	waitingRoom.GameMap = helpers.DefaultRandomMapGenerator()

	return waitingRoom, nil
}

func createClient(app *application.Application, userName string, conn *websocket.Conn, wsReplyersSet wsconnection.WSmux) (*wsconnection.UsersConnection, error) {
	if app.WaitingRoom.ContainsUser(userName) {
		return nil, Err_Duplicate_User
	}

	client, err := wshub.NewClient(app.Hub, userName, app.WaitingRoom, conn, nil, nil)
	if err != nil {
		return nil, fmt.Errorf("createClient:: NewClient failed: %v", err)
	}

	if app.WaitingRoom.Size() == MAX_ROOM_SIZE {
		app.WaitingRoom = nil
	}

	app.InfoLog.Printf("New client in room '%s' is created: %s", app.WaitingRoom, client)

	return &wsconnection.UsersConnection{
		Client:   client,
		WsServer: wsReplyersSet,
	}, nil
}
