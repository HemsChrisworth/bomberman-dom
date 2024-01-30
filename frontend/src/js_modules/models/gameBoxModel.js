import { animate } from "../../animation/animate.js";
import { createGameBoxC } from "../../components/gameScreenComponents/gameBoxC.js";
import { listenPlayerMovement } from "../playerMovement.js";

//this object contains components that could be used in other components
export class gameBoxModel {
    constructor(gameMap) {

        this.gameBoxC = createGameBoxC(gameMap.vElement); //TODO create and add other components
        listenPlayerMovement()
        requestAnimationFrame(animate);
    }

    get vElement() {
        return this.gameBoxC;
    }
    
}