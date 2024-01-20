package application

import (
	"log"
	"net/http"
	"time"

	"01.kood.tech/git/Hems_Chrisworth/bomberman-dom/backend/pkg/controllers/wshub"
	"01.kood.tech/git/Hems_Chrisworth/bomberman-dom/backend/pkg/logger"

	"github.com/gorilla/websocket"
)

type Application struct {
	ErrLog      *log.Logger
	InfoLog     *log.Logger
	Hub         *wshub.Hub
	WaitingRoom *wshub.Room
	Upgrader    websocket.Upgrader
	Server      *http.Server
}

func New(serverAddress string) *Application {
	application := &Application{}

	application.ErrLog, application.InfoLog = logger.CreateLoggers()

	application.Hub = wshub.NewHub()

	application.Upgrader = websocket.Upgrader{
		ReadBufferSize:  1024,
		WriteBufferSize: 1024,
		CheckOrigin: func(r *http.Request) bool {
			origin := r.Header.Get("Origin")
			return origin == "http://localhost:8080" || origin == "http://127.0.0.1:8080"
			// return true
		},
	}

	application.Server = &http.Server{
		Addr:         serverAddress,
		ReadTimeout:  15 * time.Second,
		WriteTimeout: 15 * time.Second,
		IdleTimeout:  15 * time.Second,
		ErrorLog:     application.ErrLog,
	}

	return application
}
