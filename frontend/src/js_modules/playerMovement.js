import { juice } from "../test/test.js";

const PLAYER_MOVEMENT_SPEED = 2;

export const Direction = {
  up: "direction-up",
  down: "direction-down",
  left: "direction-left",
  right: "direction-right",
};
export const movementLookup = {
  [Direction.left]: { x: -PLAYER_MOVEMENT_SPEED, y: 0 },
  [Direction.right]: { x: PLAYER_MOVEMENT_SPEED, y: 0 },
  [Direction.up]: { x: 0, y: -PLAYER_MOVEMENT_SPEED },
  [Direction.down]: { x: 0, y: PLAYER_MOVEMENT_SPEED },
};

const movementHandler = {
  w() {
    console.log(movementLookup[Direction.up].x);
    juice.position = [
      movementLookup[Direction.up].x,
      movementLookup[Direction.up].y,
    ];
  },
  s() {
    juice.position = [
      movementLookup[Direction.down].x,
      movementLookup[Direction.down].y,
    ];
  },
  a() {
    juice.position = [
      movementLookup[Direction.left].x,
      movementLookup[Direction.left].y,
    ];
  },
  d() {
    juice.position = [
      movementLookup[Direction.right].x,
      movementLookup[Direction.right].y,
    ];
  },
};


movementHandler.ArrowUp = movementHandler.w
movementHandler.ArrowDown = movementHandler.s;
movementHandler.ArrowLeft = movementHandler.a;
movementHandler.ArrowRight = movementHandler.d;


export function listenPlayerMovement() {
  document.addEventListener("keydown", (event) => {
    try {
      movementHandler[event.key]();
    } catch {
      console.log("error: wrong key");
    }
  });
}
