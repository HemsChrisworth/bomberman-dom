import { mainView } from "../app.js";
import { ChatModel } from "../js_modules/models/chatModel.js";
import { Player } from "../js_modules/models/playersModel.js";

// routes the response from websocket to various functions for components

export const wsResponseRouter = {
  usersInRoom(payload) {
    let welcomeScreenModel
    try {
      welcomeScreenModel = mainView.getWelcomeScreenModel();
    } catch (error) {
      console.error(error);
      return
    }

    if (!isSuccessPayload(payload)) {
      console.error(payload);
     
      return
    }
    console.log("handle usersInRoom message with payload:", payload);
    welcomeScreenModel.loadWaitingScreen()
    payload.data.forEach(user => {
      if (user.playerName === mainView.currentPlayer.name) {
        mainView.currentPlayer.number = user.playerNumber;
        mainView.addPlayer(mainView.currentPlayer);
      } else {
        mainView.addPlayer(new Player(user.playerName, user.playerNumber));
      }
    });
  },

  registerNewPlayer(payload) {
    if (!isSuccessPayload(payload)) {
      console.error("registerNewPlayer error: " + payload.data);
      return
    }
let user = payload.data;
    if (user.playerName !== mainView.currentPlayer.name) {
      mainView.addPlayer(new Player(user.playerName, user.playerNumber))
    }
  },

  sendMessageToChat(payload) {
    //TODO
  },

  playerAction(payload) {
    //TODO
  },

  inputChatMessage(payload) {
    //TODO
  },
};

function isSuccessPayload(payload) {
  if (payload.result !== "success") {
    return false
  }
  return true
}
