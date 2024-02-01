import { mainView } from "../../app.js";
import { WS_REQUEST_TYPE_PLAYER_ACTION } from "../consts/consts.js";
import { PlayerMove } from "./actionModel.js";
// import { mainView } from "../test/test.js";

// this will send the ws request with the next position of the current player
/**
 * 
 * @param {string} currentAction the action of the player, ex 'moveLeft' or 'moveRight'
*/
export function getNewPlayerPosition(currentAction) {
  if (mainView.currentPlayer[currentAction]()) {
    const newPosition = mainView.currentPlayer.position;

    const playerAction = new PlayerMove(newPosition);
    mainView.chatModel.socket.request(WS_REQUEST_TYPE_PLAYER_ACTION, playerAction);
  }
}

// this is for after the websocket response
/**
 * 
 * @param {string} playerName name of the current player
 * @param {[number, number]} position new [x, y] position of player
 * 
 */

export function movementHandler(playerName, position) {
  mainView.PlayerList.players[playerName].position = position; // in draw, it will render the newly set x and y position into the VElement
}
