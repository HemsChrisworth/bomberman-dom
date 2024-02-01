import { animate } from "../animation/animate.js";
import { mainView } from "../app.js";
import { createGameBoxC } from "../components/gameScreenComponents/gameBoxC.js";
import { listenPlayerActions } from "../js_modules/player_actions/keypresses.js";

//this object contains components that could be used in other components
export class gameBoxModel {
    constructor(gameMap, playerList) {

        this.gameBoxC = createGameBoxC(gameMap.vElement, playerList); //TODO create and add other component

        requestAnimationFrame(animate);
        listenPlayerActions()
    }

    get vElement() {
        return this.gameBoxC;
    }
}