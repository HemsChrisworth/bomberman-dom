import { mainView } from "../app.js";
import { PLAYER_MOVE_LEFT } from "../js_modules/consts/consts.js";
import { gameBoxModel } from "../views/gameBoxView.js";
import { Player } from "../js_modules/models/playersModel.js";
import { movementHandler } from "../js_modules/playerMovement.js";

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
      console.error("Error in registerNewPlayer handler:", payload.data);
      return
    }

    let user = payload.data;
    if (user.playerName !== mainView.currentPlayer.name) {
      mainView.addPlayers(new Player(user.playerName, user.playerNumber))
    }
  },

  startGame(payload) {
    if (!isSuccessPayload(payload)) {
      console.error("Could not get random Game map from server:", payload.data);
      return;
    }
    let gameMapString = payload.data;
    console.log("Game map--", gameMapString);
    mainView.showGameBox(gameMapString);
  },

  userQuitChat(payload) {
    if (!isSuccessPayload(payload)) {
      console.error("Error in userQuitChat handler:", payload.data);
      return
    }
    const user = payload.data;
    Object.values(mainView.PlayerList.players).forEach((player) => {
      if (player.name === user.playerName) {
        mainView.delPlayers(player)
      } else if (player.number > user.playerNumber) {
        player.number--;
      }

    });

  },

  inputChatMessage(payload) {
    if (!isSuccessPayload(payload)) {
      console.error("Error in inputChatMessage handler:", payload.data);
      return
    }
    const mess = payload.data;
    mainView.chatModel.chatMessageArea.addChild(`${mess.userName} - ${mess.dateCreate}\n ${mess.content} `)
  },

  sendMessageToChat(payload) {
    //
  },

  playerAction(payload) {
    if (!isSuccessPayload(payload)) {
      console.error("Error in playerAction handler:", payload.data);
      return
    }
    //TODO have a separate function to handle bombs
    movementHandler(payload.data.playerName, payload.data.action);
  },
};

function isSuccessPayload(payload) {
  if (payload.result !== "success") {
    return false
  }
  return true
}
