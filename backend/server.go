package main

import (
	"fmt"
	"log"
	"net/http"

	"01.kood.tech/git/Hems_Chrisworth/bomberman-dom/backend/application"
	"01.kood.tech/git/Hems_Chrisworth/bomberman-dom/backend/pkg/routes"
)

var port = "8000" // DB   *sqlite.DBModel

func main() {
	log.SetFlags(log.LstdFlags | log.Lshortfile) // set flags in log package to print out file/line number on errors
	var err error

	// app keeps all dependences used by handlers

	addr := fmt.Sprintf(":%s", port) // localhost
	app := application.New(addr)
	if err != nil {
		log.Fatalln(err)
	}
	// TODO put these in the application struct
	wsHandlers := routes.CreateChatWsRoutes(app)

	mux := http.NewServeMux()
	app.Server.Handler = routes.CreateAPIroutes(mux, app, wsHandlers)

	go app.Hub.Run()
	app.InfoLog.Println("The chat Hub is running...")

	log.Println("main: running server on port", port)
	if err := app.Server.ListenAndServe(); err != nil {
		app.ErrLog.Fatalf("main: couldn't start server: %v\n", err)
	}
}
