import { mainView } from "../../app.js";
import { WS_REQUEST_TYPE_PLAYER_ACTION } from "../consts/consts.js";
import { PLAYER_DIE, PLAYER_RESPAWN } from "../consts/playerActionTypes.js";
import { PlayerDie, PlayerMove } from "./actionModel.js";
import { currentAction } from "./keypresses.js";
// import { mainView } from "../test/test.js";

export let currentEvent = null;

export const activeEvent = {
  [PLAYER_DIE]: false,
  [PLAYER_RESPAWN]: false,
  initiateEvent(event) {
    if (event == PLAYER_DIE) {
      this[PLAYER_DIE] = true;
      this[PLAYER_RESPAWN] = false;
    }
    if (event == PLAYER_RESPAWN) {
      this[PLAYER_DIE] = false;
      this[PLAYER_RESPAWN] = true;
    }
    currentEvent = event;
  },
  endEvent(event) {
    this[PLAYER_DIE] = false;
    this[PLAYER_RESPAWN] = false;

    currentEvent = null;
  }
}

export function playerDie() {
  const newLives = mainView.currentPlayer.getLives();

  const playerAction = new PlayerDie(newLives);
  mainView.chatModel.socket.request(WS_REQUEST_TYPE_PLAYER_ACTION, playerAction);
}
export function playerRespawn() {
  const newPosition = mainView.currentPlayer.position;

  const playerAction = new PlayerMove(newPosition);
  mainView.chatModel.socket.request(WS_REQUEST_TYPE_PLAYER_ACTION, playerAction);
  activeEvent.endEvent();
}

// this is for after the websocket response
/**
 * 
 * @param {string} playerName name of the current player
 * @param {number} position new number of player's lives
 * 
 */

export function dyingHandler(playerName, lives) {
  console.log("in dyingHandler, name, lives: ", playerName, lives);
  mainView.PlayerList.players[playerName].setLives(lives); // in draw, it will render the newly set x and y position into the VElement
}
