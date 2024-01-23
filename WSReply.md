WS messages on backend

if there is a **server error**, the reply will be like:
{
	type: "ERROR", 
	data:{
		result: "serverError", 
		data: \<errmessage\>
	}
}

if there is a **request error**, the reply will be like:
{
	type: \<typeOfRequest\>, 
	data:{
		result: "error", 
		data: \<errmessage\>
	}
}

**"successful"** replies (payload.result="success"):	

*Type*:  **usersInRoom** (sends handler JoinRoom - list of users to the new user)
	*request payload*:  - 
	*reply payload.data:* []userName string
 
*Type*:  **registerNewPlayer** (sends handler JoinGame - a new user to users in the room)
	*request payload*:  - 
	*reply payload.data:* userName


*Type*:  **sendMessageToChat**  
	*request payload*:  webmodel.ChatMessage
		{
			content       string   
			dateCreate    time.Time
		}
	*reply payload.data:* 
		*to creator*	payload.data: "sent"
		*to recepients* webmodel.ChatMessage with type  **inputChatMessage**

*Type*:  **PlayerAction**  
	*request payload*:   action string
	*reply payload.data:* 
		*to creator*	payload.data: "sent"
		*to recepients* webmodel.PlrAction with type  **PlayerAction**
		{
			playerName  string
			action      string
		}

*Type*:  **inputChatMessage** (sends ReplySendMessageToChat)
	*request payload*:  -  (sent along with reply to **sendMessageToChat**)
	*reply payload.data*
		{
			userName    string   //author
			content     string   
			dateCreate  time.Time
		}


*Type*:  **"userQuitChat"** (sends readPump if it closes connenction)
	*request payload*:  -
	*reply payload.data:*  userName string // server will delete info about "current opened chat" 

