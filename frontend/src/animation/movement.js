import { mainView } from "../app.js";
import { actionSender } from "../js_modules/player_actions/actionSender.js";
import { currentAction } from "../js_modules/player_actions/keypresses.js";

export function update() {
    // update player position based on key press
    // update
    if (currentAction) {
        actionSender(currentAction)
    }
}

export function draw() {
    drawPlayerPositions()
    // draw bomb placement
}


function drawPlayerPositions() {
    Object.keys(mainView.PlayerList.players).forEach((player) => {
      mainView.PlayerList.players[player].setVPosition();
    });
}
