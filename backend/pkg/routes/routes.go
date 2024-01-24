package routes

import (
	"net/http"

	"01.kood.tech/git/Hems_Chrisworth/bomberman-dom/backend/application"
	"01.kood.tech/git/Hems_Chrisworth/bomberman-dom/backend/pkg/controllers/wsconnection"
	"01.kood.tech/git/Hems_Chrisworth/bomberman-dom/backend/pkg/handlers"
)

func CreateAPIroutes(mux *http.ServeMux, app *application.Application, wsHandlers wsconnection.WSmux) *http.ServeMux {
	// mux.Handle("/img/", http.StripPrefix("/img/", http.FileServer(http.Dir("data/img"))))

	mux.Handle(handlers.JOOIN_GAME_URL, handlers.JoinGame(app, wsHandlers)) // websocket stuff here
	return mux
}
