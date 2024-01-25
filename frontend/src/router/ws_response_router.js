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
      if (payload.data === "duplicate user name") {
        mainView.showError('user with this name already exists');
        mainView.chatModel.stop();
        mainView.delCurrentPlayer();
      }
      return
    }
    console.log("handle usersInRoom message with payload:", payload);
    welcomeScreenModel.loadWaitingScreen()
    payload.data.forEach(user => {
      let player
      if (user === mainView.currentPlayer.name) {
        player = mainView.currentPlayer;
      } else {
        player = new Player(user);
      }
      mainView.addPlayer(player);
    });
  },

  registerNewPlayer(payload) {
    if (!isSuccessPayload(payload)) {
      console.error("registerNewPlayer error: " + payload.data);
      return
    }

    if (payload.data !== mainView.currentPlayer.name) {
      mainView.addPlayer(new Player(payload.data))
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
