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
    welcomeScreenModel.loadWaitingScreen();
    
    const players = [];
    payload.data.forEach(user => {
      if (user.playerName === mainView.currentPlayer.name) {
        mainView.currentPlayer.number = user.playerNumber;
        players.push(mainView.currentPlayer);
      } else {
        players.push(new Player(user.playerName, user.playerNumber));
      }
    });

    mainView.addPlayers(...players);
  },

  registerNewPlayer(payload) {
    if (!isSuccessPayload(payload)) {
      console.error("registerNewPlayer error: " + payload.data);
      if (payload.data === 'duplicate user name') {
        mainView.showError('user with this name already exists');
        mainView.chatModel.stop();
        mainView.delCurrentPlayer();
      }
      return
    }
    let user = payload.data;
    if (user.playerName !== mainView.currentPlayer.name) {
      mainView.addPlayers(new Player(user.playerName, user.playerNumber))
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
