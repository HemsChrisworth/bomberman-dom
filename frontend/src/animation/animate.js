import { mainView } from "../app.js";
import { actionSender, eventSender } from "../js_modules/player_actions/actionSender.js";
import { currentAction } from "../js_modules/player_actions/keypresses.js";
import { currentEvent } from "../js_modules/player_actions/eventModel.js";

const frameDuration = 1000 / 60; // Duration of each frame in milliseconds for 60 FPS
let lastFrameTime = 0;
let accumulator = 0;

export function animate(timestamp) {
  let deltaTime = timestamp - lastFrameTime;
  lastFrameTime = timestamp;
  accumulator += deltaTime;
  // Update game state at fixed intervals
  while (accumulator >= frameDuration) {
    update();
    accumulator -= frameDuration;
  }

  draw();
  requestAnimationFrame(animate);
}

function update() {
    // update player position based on key press or events
    updatePlayerPosition();
    // Update player animation frames
    updatePlayerFrames();
}

function updatePlayerPosition() {
    if (currentEvent) {
        eventSender(currentEvent);
        return;
    }
    if (currentAction) {
        actionSender(currentAction);
    }
}

// Update the animation frame of all players
function updatePlayerFrames() {
  Object.values(mainView.PlayerList.players).forEach(updatePlayerFrame);
}

// Update the animation frame of a single player
function updatePlayerFrame(player) {
  if (player.currentFrame < 2) {
    player.currentFrame++;
  } else {
    player.currentFrame = 0;
  }
}

function draw() {
  drawPlayerPositions();
}

function drawPlayerPositions() {
    Object.keys(mainView.PlayerList.players).forEach((player) => {
        mainView.PlayerList.players[player].setVPosition();
        mainView.PlayerList.players[player].setVAnimation();
    });
}
