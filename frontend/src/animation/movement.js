import { mainView } from "../app.js";
import { actionSender, eventSender } from "../js_modules/player_actions/actionSender.js";
import { currentAction } from "../js_modules/player_actions/keypresses.js";
import { currentEvent } from "../js_modules/player_actions/eventModel.js";

export function update() {
    // update player position based on key press
    // update
    if (currentEvent) {
      
        eventSender(currentEvent);
        return;
    }
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
