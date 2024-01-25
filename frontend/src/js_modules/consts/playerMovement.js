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

