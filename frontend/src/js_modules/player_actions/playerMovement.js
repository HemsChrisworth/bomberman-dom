import { mainView } from "../../app.js";
import { throttle } from "../../utils/throttler.js";
import { WS_REQUEST_TYPE_PLAYER_ACTION } from "../consts/consts.js";
import { PLAYER_MOVE } from "../consts/playerActionTypes.js";
import { PlaceBomb } from "./actionModel.js";
// import { mainView } from "../test/test.js";


// export const movementCalculate = {
//   [PLAYER_MOVE_LEFT]: ([x, y]) => [x - PLAYER_MOVEMENT_SPEED, y],
//   [PLAYER_MOVE_RIGHT]: ([x, y]) => [x + PLAYER_MOVEMENT_SPEED, y],
//   [PLAYER_MOVE_UP]: ([x, y]) => [x, y - PLAYER_MOVEMENT_SPEED],
//   [PLAYER_MOVE_DOWN]: ([x, y]) => [x, y + PLAYER_MOVEMENT_SPEED],
// };




export const playerMovementThrottler = throttle(getNewPlayerPosition, 20);


// this will send the ws request with the next position of the current player
/**
 * 
 * @param {string} currentAction the action of the player, ex 'moveLeft' or 'moveRight'
*/
function getNewPlayerPosition(currentAction) {
  // const collision = false
  // if (!collision) {
  //   const currentPosition = mainView.currentPlayer.position;
  //   const newPosition = movementCalculate[currentAction](currentPosition);
  //   // send ws request for playerMovement with new coordinates
  //   mainView.chatModel.socket.request(WS_REQUEST_TYPE_PLAYER_ACTION, newPosition);
  // }
  if (mainView.currentPlayer[currentAction]()) {
    const newPosition = mainView.currentPlayer.position;
    console.log("move "+currentAction+"--\n"+ mainView.currentPlayer.model)

    const playerAction = new PlaceBomb(PLAYER_MOVE, newPosition);
    mainView.chatModel.socket.request(WS_REQUEST_TYPE_PLAYER_ACTION, playerAction);
    //mainView.chatModel.socket.request(WS_REQUEST_TYPE_PLAYER_ACTION, newPosition);
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
