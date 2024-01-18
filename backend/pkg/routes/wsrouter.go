package routes

import (
	"errors"

	"01.kood.tech/git/Hems_Chrisworth/bomberman-dom/backend/application"
	"01.kood.tech/git/Hems_Chrisworth/bomberman-dom/backend/pkg/controllers"
	"01.kood.tech/git/Hems_Chrisworth/bomberman-dom/backend/pkg/controllers/wsconnection"
	"01.kood.tech/git/Hems_Chrisworth/bomberman-dom/backend/pkg/webmodel"
)

const (
	WS_REPLYERS_UNI = iota
	WS_REPLYERS_CHAT
)

func CreateUniWsRoutes(app *application.Application) wsconnection.WSmux { // wsconnection.WSmux is map[string]Replier
	return wsconnection.WSmux{
		webmodel.UserOffline: sendReplyForLoggedUser(wsconnection.FuncReplier(controllers.SendUserStatusToUsers(app, webmodel.UserOffline))),

		webmodel.PostsPortion:        sendReplyForLoggedUser(wsconnection.FuncReplyCreator(controllers.ReplyPosts)),
		webmodel.PostsPortionInGroup: sendReplyForLoggedUser(wsconnection.FuncReplyCreator(controllers.ReplyPostsInGroup)),
		webmodel.UserPostsPortion:    sendReplyForLoggedUser(wsconnection.FuncReplyCreator(controllers.ReplyUserPostsPortion)), // WIP
		webmodel.FullPostAndComments: sendReplyForLoggedUser(wsconnection.FuncReplyCreator(controllers.ReplyFullPostAndComments)),
		webmodel.NewPost:             sendReplyForLoggedUser(wsconnection.FuncReplyCreator(controllers.ReplyNewPost)),
		webmodel.DeletePost:          sendReplyForLoggedUser(wsconnection.FuncReplyCreator(controllers.ReplyDeletePost)),
		webmodel.NewComment:          sendReplyForLoggedUser(wsconnection.FuncReplyCreator(controllers.ReplyNewComment)),

		// webmodel.OpenChat:               sendReplyForLoggedUser(wsconnection.FuncReplyCreator(controllers.ReplyOpenPrivateChat)),
		webmodel.GetChatList: sendReplyForLoggedUser(wsconnection.FuncReplyCreator(controllers.ReplyGetChatList)),
		// webmodel.CloseChat:              sendReplyForLoggedUser(wsconnection.FuncReplyCreator(controllers.ReplyCloseChat)),

		webmodel.CreateGroup:               sendReplyForLoggedUser(wsconnection.FuncReplyCreator(controllers.ReplyCreateGroup)),
		webmodel.GetGroupProfile:           sendReplyForLoggedUser(wsconnection.FuncReplyCreator(controllers.ReplyGetGroupProfile)),
		webmodel.LeaveGroup:                sendReplyForLoggedUser(wsconnection.FuncReplyCreator(controllers.ReplyLeaveGroup)),
		webmodel.RequestToJoinToGroup:      sendReplyForLoggedUser(wsconnection.FuncReplyCreator(controllers.ReplyRequestToJoinToGroup)),
		webmodel.InviteToGroup:             sendReplyForLoggedUser(wsconnection.FuncReplyCreator(controllers.ReplyInviteToGroup)),
		webmodel.AcceptRequestToJoinGroup:  sendReplyForLoggedUser(wsconnection.FuncReplyCreator(controllers.ReplyAcceptRequestToJoinGroup)),
		webmodel.DeclineRequestToJoinGroup: sendReplyForLoggedUser(wsconnection.FuncReplyCreator(controllers.ReplyDeclineRequestToJoinGroup)),
		webmodel.AcceptInvitationToGroup:   sendReplyForLoggedUser(wsconnection.FuncReplyCreator(controllers.ReplyAcceptInvitationToGroup)),
		webmodel.DeclineInvitationToGroup:  sendReplyForLoggedUser(wsconnection.FuncReplyCreator(controllers.ReplyDeclineInvitationToGroup)),
		webmodel.GroupMembers:              sendReplyForLoggedUser(wsconnection.FuncReplyCreator(controllers.ReplyGroupMembers)),
		webmodel.UserGroups:                sendReplyForLoggedUser(wsconnection.FuncReplyCreator(controllers.ReplyUserGroups)),

		webmodel.CreateGroupEvent:         sendReplyForLoggedUser(wsconnection.FuncReplyCreator(controllers.ReplyCreateGroupEvent)),
		webmodel.GetGroupEvent:            sendReplyForLoggedUser(wsconnection.FuncReplyCreator(controllers.ReplyGetGroupEvent)),
		webmodel.GetGroupEventsList:       sendReplyForLoggedUser(wsconnection.FuncReplyCreator(controllers.ReplyGetGroupEventsList)),
		webmodel.SetUserOptionForEvent:    sendReplyForLoggedUser(wsconnection.FuncReplyCreator(controllers.ReplySetUserOptionForEvent)),
		webmodel.ChangeUserOptionForEvent: sendReplyForLoggedUser(wsconnection.FuncReplyCreator(controllers.ReplyChangeUserOptionForEvent)),

		webmodel.GetUserProfile: sendReplyForLoggedUser(wsconnection.FuncReplyCreator(controllers.ReplyGetUserProfile)),
		webmodel.SetProfileType: sendReplyForLoggedUser(wsconnection.FuncReplyCreator(controllers.ReplySetProfileType)),

		webmodel.UserFollowers:        sendReplyForLoggedUser(wsconnection.FuncReplyCreator(controllers.ReplyUserFollowers)),
		webmodel.UserFollowing:        sendReplyForLoggedUser(wsconnection.FuncReplyCreator(controllers.ReplyUserFollowing)),
		webmodel.FollowUser:           sendReplyForLoggedUser(wsconnection.FuncReplyCreator(controllers.ReplyFollowUser)),
		webmodel.GetFollowStatus:      sendReplyForLoggedUser(wsconnection.FuncReplyCreator(controllers.ReplyGetFollowStatus)),
		webmodel.AcceptFollowRequest:  sendReplyForLoggedUser(wsconnection.FuncReplyCreator(controllers.ReplyAcceptFollowRequest)),
		webmodel.DeclineFollowRequest: sendReplyForLoggedUser(wsconnection.FuncReplyCreator(controllers.ReplyDeclineFollowRequest)),
		webmodel.UnFollowUser:         sendReplyForLoggedUser(wsconnection.FuncReplyCreator(controllers.ReplyUnFollowUser)),
		webmodel.AddCloseFriend:       sendReplyForLoggedUser(wsconnection.FuncReplyCreator(controllers.ReplyAddCloseFriend)),

		webmodel.SearchGroupsUsers:     sendReplyForLoggedUser(wsconnection.FuncReplyCreator(controllers.ReplySearchGroupsUsers)),
		webmodel.SearchUsersNotInGroup: sendReplyForLoggedUser(wsconnection.FuncReplyCreator(controllers.ReplySearchUsersNotInGroup)),
		webmodel.SearchNotCloseFriends: sendReplyForLoggedUser(wsconnection.FuncReplyCreator(controllers.ReplySearchUsersNotFriends)),

		webmodel.LikePost: sendReplyForLoggedUser(wsconnection.FuncReplyCreator(controllers.ReplyReaction)),

		webmodel.VerifyGroupView: sendReplyForLoggedUser(wsconnection.FuncReplyCreator(controllers.ReplyVerifyGroupView)),

		webmodel.GetUserNotifications: sendReplyForLoggedUser(wsconnection.FuncReplyCreator(controllers.ReplyGetUserNotifications)),

		// needed WIP routes

	}
}

func CreateChatWsRoutes(app *application.Application) wsconnection.WSmux { // wsconnection.WSmux is map[string]Replier
	return wsconnection.WSmux{
		webmodel.SendMessageToChat: sendReplyForLoggedUser(wsconnection.FuncReplyCreator(controllers.ReplySendMessageToChat)),
		webmodel.ChatPortion:       sendReplyForLoggedUser(wsconnection.FuncReplyCreator(controllers.ReplyChatPortion)),
		webmodel.UserOffline:       sendReplyForLoggedUser(wsconnection.FuncReplier(controllers.SendUserStatusToChatMembers(app, webmodel.UserQuitChat))),
	}
}

var ErrNoPost = errors.New("could not find post")

func sendReplyForLoggedUser(next wsconnection.Replier) wsconnection.Replier {
	return wsconnection.FuncReplier(func(app *application.Application, currConnection *wsconnection.UsersConnection, wsMessage webmodel.WSMessage) error {
		err := currConnection.CheckLoggedStatus(app, wsMessage)
		if err != nil {
			return err
		}

		return next.SendReply(app, currConnection, wsMessage)
	})
}
