import { juice } from "../test/test.js";

const PLAYER_MOVEMENT_SPEED = 2;

export const Direction = {
  up: "direction-up",
  down: "direction-down",
  left: "direction-left",
  right: "direction-right",
};


const movementHandler = {
  upMovement: function () {
    juice.position = [
      movementLookup[Direction.up[x]],
      movementLookup[Direction.up[y]],
    ];
  },
  downMovement: function () {
    juice.position = [
      movementLookup[Direction.down[x]],
      movementLookup[Direction.down[y]],
    ];
  },
};

movementHandler.ArrowUp = movementHandler.w = movementHandler.upMovement()

export const movementLookup = {
  [Direction.left]: { x: -PLAYER_MOVEMENT_SPEED, y: 0 },
  [Direction.right]: { x: PLAYER_MOVEMENT_SPEED, y: 0 },
  [Direction.up]: { x: 0, y: -PLAYER_MOVEMENT_SPEED },
  [Direction.down]: { x: 0, y: PLAYER_MOVEMENT_SPEED },
};

console.log(" jeees")

document.addEventListener("keydown", (event) => {
  console.log("yeee")
  try {
    movementHandler[event.key]
  } catch {
    console.log("error: wrong key")
  }
  
})

