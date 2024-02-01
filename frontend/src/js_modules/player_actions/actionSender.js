import { mainView } from "../../app.js";
import { BOMB, SPRITE_POS } from "../consts/consts.js";
import { PLAYER_MOVE, PLAYER_MOVE_DOWN, PLAYER_MOVE_LEFT, PLAYER_MOVE_RIGHT, PLAYER_MOVE_UP, PLAYER_PLACE_BOMB } from "../consts/playerActionTypes.js";
import { Bomb } from "../models/map/tileModel.js";
import { playerActioner } from "./actionModel.js";
// import { bombPlaceThrottle } from "./bombPlace.js";
// import { playerMovementThrottler } from "./playerMovement.js";

const actionConverter = {
  [PLAYER_MOVE_LEFT]: PLAYER_MOVE,
  [PLAYER_MOVE_RIGHT]: PLAYER_MOVE,
  [PLAYER_MOVE_UP]: PLAYER_MOVE,
  [PLAYER_MOVE_DOWN]: PLAYER_MOVE,
  [PLAYER_PLACE_BOMB]: PLAYER_PLACE_BOMB,
  getActionType(key) {
    return this[key]
  }
}

export function actionSender(currentAction) {
  const actionType = actionConverter.getActionType(currentAction);
  playerActioner[actionType].send(currentAction);
  // if (currentAction !== PLAYER_PLACE_BOMB) {
  //   playerMovementThrottler(currentAction);
  // } else if (currentAction === PLAYER_PLACE_BOMB) {
  //   // create a throttler type function that places
  //   bombPlaceThrottle()
    // send ws request with the bomb payload
  // }
}
