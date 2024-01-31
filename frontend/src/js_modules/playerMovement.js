import { mainView } from "../app.js";
import { throttle } from "../utils/throttler.js";
import { PLAYER_MOVEMENT_SPEED, PLAYER_MOVE_DOWN, PLAYER_MOVE_LEFT, PLAYER_MOVE_RIGHT, PLAYER_MOVE_UP, PLAYER_PLACE_BOMB } from "./consts/consts.js";
import { currentAction } from "./player_actions/keypresses.js";
// import { mainView } from "../test/test.js";


const movementCalculate = {
  [PLAYER_MOVE_LEFT]: ([x, y]) => [x - PLAYER_MOVEMENT_SPEED, y],
  [PLAYER_MOVE_RIGHT]: ([x, y]) => [x + PLAYER_MOVEMENT_SPEED, y],
  [PLAYER_MOVE_UP]: ([x, y]) => [x, y - PLAYER_MOVEMENT_SPEED],
  [PLAYER_MOVE_DOWN]: ([x, y]) => [x, y + PLAYER_MOVEMENT_SPEED],
};


// this will send the ws request with the next position of the current player
/**
 * 
 * @param {string} currentAction the action of the player, ex 'moveLeft' or 'placeBomb'
*/

const playerMovementThrottler = throttle(getNewPlayerPosition, 20);

export function actionSender(currentAction) {
  
  if (currentAction !== PLAYER_PLACE_BOMB) {
    playerMovementThrottler(currentAction)
  } else if (currentAction === PLAYER_PLACE_BOMB) {
    const payload = {
      type: PLAYER_PLACE_BOMB,
      coords: mainView.currentPlayer.position,
    };
    // send ws request with the bomb payload
  }
}

function getNewPlayerPosition(currentAction) {
  // TODO: check collision here
  const collision = false
  if (!collision) {
    const currentPosition = mainView.currentPlayer.position;
    const newPosition = movementCalculate[currentAction](currentPosition);
    // send ws request for playerMovement with new coordinates
    mainView.chatModel.socket.request("playerAction", newPosition);
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


