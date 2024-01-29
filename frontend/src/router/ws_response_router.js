import { mainView } from "../app.js";
import { Player } from "../js_modules/models/playersModel.js";

// routes the response from websocket to various functions for components

export const wsResponseRouter = {
  usersInRoom(payload) {
    if (!mainView.isInRegisterState()) {
      console.error("illegal attempt to register, main view is not in register state");

    }
    if (!isSuccessPayload(payload)) {
      console.error("registerNewPlayer error: " + payload.data);
      if (payload.data === 'duplicate user name') {
        mainView.showError('user with this name already exists');
        mainView.chatModel.stop();
        mainView.delCurrentPlayer();
      }
      return
    }

    console.log("handle usersInRoom message with payload:", payload);

    const players = [];
    payload.data.forEach(user => {
      if (user.playerName === mainView.currentPlayer.name) {
        mainView.currentPlayer.number = user.playerNumber;
        players.push(mainView.currentPlayer);
      } else {
        players.push(new Player(user.playerName, user.playerNumber));
      }
    });

    mainView.showWaitingScreen(...players);
  },

  registerNewPlayer(payload) {
    if (!isSuccessPayload(payload)) {
      console.error(payload);
      return
    }

    let user = payload.data;
    if (user.playerName !== mainView.currentPlayer.name) {
      mainView.addPlayers(new Player(user.playerName, user.playerNumber))
    }
  },

  startGame(payload) {
    if (!isSuccessPayload(payload)) {
      console.error("Could not get random Game map from server:", payload);
      return;
    }
    let gameMapString = payload.data;
    // TODO: use gameMapString to generate the tiles for the player!
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
