import { animate } from "../../animation/animate.js";
import { createGameBoxC } from "../../components/gameScreenComponents/gameBoxC.js";
import { listenPlayerActions } from "../player_actions/keypresses.js";

//this object contains components that could be used in other components
export class gameBoxModel {
    constructor(gameMap) {

        this.gameBoxC = createGameBoxC(this.gameMap.vElement); //TODO create and add other component
        
        requestAnimationFrame(animate);
        listenPlayerActions()
    }

    get vElement() {
        return this.gameBoxC;
    }
}