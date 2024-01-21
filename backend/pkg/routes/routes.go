package routes

import (
	"fmt"
	"log"
	"net/http"
	"time"

	"01.kood.tech/git/Hems_Chrisworth/bomberman-dom/backend/application"
	"01.kood.tech/git/Hems_Chrisworth/bomberman-dom/backend/pkg/controllers/wsconnection"
	"01.kood.tech/git/Hems_Chrisworth/bomberman-dom/backend/pkg/handlers"
)

func routerMiddleware(app *application.Application, next http.Handler) http.Handler { // middleware, to check authentication
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		w.Header().Add("Access-Control-Allow-Credentials", "true")
		w.Header().Add("Access-Control-Allow-Headers", "*")
		w.Header().Add("Access-Control-Allow-Origin", "http://localhost:8080")

		start := time.Now()
		req := fmt.Sprintf("%s %s", r.Method, r.URL)
		app.InfoLog.Println(req)

		// // TODO maybe set some cookie
		// //
		// //	http.SetCookie(w, respCookie)
		// sess := "" // TODO
		// // Store user information in the request context
		// //		app.InfoLog.Printf("session for user '%v' is added to the context", sess.User)
		// ctx := context.WithValue(r.Context(), handlers.CTX_USER, sess)
		// // Call the next handler in the chain with the updated context
		// next.ServeHTTP(w, r.WithContext(ctx))
		log.Println(req, "completed in", time.Since(start))
	})
}

func CreateAPIroutes(mux *http.ServeMux, app *application.Application, wsHandlers wsconnection.WSmux) *http.ServeMux {
	// mux.Handle("/img/", http.StripPrefix("/img/", http.FileServer(http.Dir("data/img"))))

	mux.Handle(handlers.JOOIN_GAME_URL, routerMiddleware(app, handlers.JoinGame(app, wsHandlers))) // websocket stuff here
	return mux
}
