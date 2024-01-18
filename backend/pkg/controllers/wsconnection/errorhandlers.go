package wsconnection

import (
	"errors"
	"fmt"
	"runtime"
	"runtime/debug"

	"01.kood.tech/git/Hems_Chrisworth/social-network/backend/application"
	"01.kood.tech/git/Hems_Chrisworth/social-network/backend/pkg/webmodel"
)

// WSError sends to the front-end side websocket connection `conn` a message of  type 'ERROR'  with the Payload= `errmessage`. It also logs the `errmessage` and `err` to the app.ErrLog logger.
func (uc *UsersConnection) WSError(app *application.Application, errMessage string, err error) error {
	funcName := ""
	pc, _, _, ok := runtime.Caller(1)
	details := runtime.FuncForPC(pc)
	if ok && details != nil {
		funcName = details.Name()
	}

	errMessage = funcName + ": " + errMessage
	app.ErrLog.Output(2, fmt.Sprintf("websocket:: ERROR: %s: %v\nDebug Stack:  %s", errMessage, err, debug.Stack()))

	wsMessage, err := webmodel.CreateJSONMessage(webmodel.ERROR, "serverError", errMessage)
	if err != nil {
		errText := fmt.Sprintf("websocket:: WSError:can't create serverError WSmessage: %v", err)
		uc.Client.WriteMessage([]byte(`"` + errText + `"`))
		app.ErrLog.Output(2, fmt.Sprintf("%s\nDebug Stack:  %s", errText, debug.Stack()))
		return fmt.Errorf("%s: %#v", errText, err)
	}
	uc.Client.WriteMessage(wsMessage)

	return fmt.Errorf("%s: %#v", errMessage, err)
}

func (uc *UsersConnection) WSErrCreateMessage(app *application.Application, err error) error {
	return uc.WSError(app, "creating message to websocket failed", err)
}

// WSBadRequest sends to the front-end side websocket connection `conn` a message of `messageType` with the result = "error" and Data= `messageText`. It also logs the messageText to the app.InfoLog logger.
func (uc *UsersConnection) WSBadRequest(app *application.Application, requestMessage webmodel.WSMessage, errMessage string) error {
	app.InfoLog.Printf("websocket:: send reply '%s' to: '%s'\n", errMessage, requestMessage.Type)

	wsMessage, err := requestMessage.CreateReplyToRequestMessage("error", errMessage)
	if err != nil {
		errText := fmt.Sprintf("websocket:: can't create BadRequest WSmessage to '%s': %v", requestMessage.Type, err)
		uc.Client.WriteMessage([]byte(`"` + errText + `"`))
		app.ErrLog.Output(2, fmt.Sprintf("%s\nDebug Stack:  %s", errText, debug.Stack()))
		return fmt.Errorf("%s: %#v", errText, err)
	}
	uc.Client.WriteMessage(wsMessage)
	return errors.Join(webmodel.ErrWarning, errors.New(errMessage))
}
