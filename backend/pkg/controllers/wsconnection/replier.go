package wsconnection

import (
	"01.kood.tech/git/Hems_Chrisworth/social-network/backend/application"
	"01.kood.tech/git/Hems_Chrisworth/social-network/backend/pkg/webmodel"
)

type Replier interface {
	SendReply(app *application.Application, currConnection *UsersConnection, wsMessage webmodel.WSMessage) error
}

type (
	FuncReplyCreator func(*application.Application, *UsersConnection, webmodel.WSMessage) (any, error)
	FuncReplier      func(*application.Application, *UsersConnection, webmodel.WSMessage) error
)
type WSmux map[string]Replier

var Repliers WSmux

func (fRC FuncReplyCreator) SendReply(app *application.Application, currConnection *UsersConnection, wsMessage webmodel.WSMessage) error {
	replyData, err := fRC(app, currConnection, wsMessage)
	if err != nil {
		return err
	}

	return currConnection.SendReply(app, wsMessage, replyData)
}

func (fR FuncReplier) SendReply(app *application.Application, currConnection *UsersConnection, wsMessage webmodel.WSMessage) error {
	return fR(app, currConnection, wsMessage)
}
