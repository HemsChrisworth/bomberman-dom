import { mainView } from "../../app.js";
import { BOMB, SPRITE_POS } from "../consts/consts.js";
import { PLAYER_PLACE_BOMB } from "../consts/playerActionTypes.js";
import { Bomb } from "../models/map/tileModel.js";
import { bombPlaceThrottle } from "./bombPlace.js";
import { playerMovementThrottler } from "./playerMovement.js";

export function actionSender(currentAction) {
  if (currentAction !== PLAYER_PLACE_BOMB) {
    playerMovementThrottler(currentAction);
  } else if (currentAction === PLAYER_PLACE_BOMB) {
    // create a throttler type function that places
    bombPlaceThrottle()
    // send ws request with the bomb payload
  }
}
