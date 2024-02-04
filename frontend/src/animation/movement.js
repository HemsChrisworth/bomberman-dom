import { mainView } from "../app.js";
import { PLAYER_RESPAWN } from "../js_modules/consts/playerActionTypes.js";
import { actionSender } from "../js_modules/player_actions/actionSender.js";
import { currentAction } from "../js_modules/player_actions/keypresses.js";
import { activeEvent, currentEvent } from "../js_modules/player_actions/playerDyingRespawn.js";

export function update() {
    // update player position based on key press
    // update
    if (currentEvent){
        actionSender(currentEvent);
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
