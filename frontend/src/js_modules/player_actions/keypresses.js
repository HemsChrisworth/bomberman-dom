import { throttle } from "../../utils/throttler.js";
import { PLAYER_MOVE_DOWN, PLAYER_MOVE_LEFT, PLAYER_MOVE_RIGHT, PLAYER_MOVE_UP, PLAYER_PLACE_BOMB } from "../consts/playerActionTypes.js"
import { currentEvent } from "./eventModel.js";

/**
 * turns keyboard keys into strings of player actions
 */
export const keyConvert = {
  w: PLAYER_MOVE_UP,
  s: PLAYER_MOVE_DOWN,
  a: PLAYER_MOVE_LEFT,
  d: PLAYER_MOVE_RIGHT,
  " ": PLAYER_PLACE_BOMB, // spacebar
  getAction(key) {
    return this[key]
  }
};

// this turns arrow keys and wsad into a single direction
keyConvert.W = keyConvert.w;
keyConvert.S = keyConvert.s;
keyConvert.A = keyConvert.a;
keyConvert.D = keyConvert.d;
keyConvert.ArrowUp = keyConvert.w;
keyConvert.ArrowDown = keyConvert.s;
keyConvert.ArrowLeft = keyConvert.a;
keyConvert.ArrowRight = keyConvert.d;

export let currentAction = null;
export const activeAction = {
  [PLAYER_MOVE_LEFT]: false,
  [PLAYER_MOVE_RIGHT]: false,
  [PLAYER_MOVE_UP]: false,
  [PLAYER_MOVE_DOWN]: false,
  [PLAYER_PLACE_BOMB]: false,

  initiateAction(action) {
    if (currentEvent?.stopAction) {
      return;
    }
    this[action] = true;
    currentAction = action;
  },
  endAction(action) {
    this[action] = false
    if (action === currentAction) { // if another action has been made before cancelling previous action, do not cancel current action
      currentAction = null; // TODO:  for some reason doesn't work with space bar
    }
  }
};

function keyDownHandler(event) {
  try {
    const action = keyConvert.getAction(event.key);
    if (action) {
      if (!activeAction[action]) {
        activeAction.initiateAction(action);
      }
    }

  } catch {
    console.log("error: invalid key");
  }
}

function keyUpHandler(event) {
  try {
    const action = keyConvert[event.key];
    if (action) {
      activeAction.endAction(action);
    }
  } catch {
    console.log("error: invalid key");
  }
}

export function listenPlayerActions() {
  //TODO need to put these while focused on gamebox, to prevent chat breaking(gamebox attr "tabindex=0" and focus() when the game starts)
  document.addEventListener("keydown", throttle(keyDownHandler, 2));
  document.addEventListener("keyup", keyUpHandler);
}
