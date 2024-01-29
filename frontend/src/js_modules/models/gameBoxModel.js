import { animate } from "../../animation/animate.js";
import { createGameBoxC } from "../../components/gameScreenComponents/gameBoxC.js";
import { listenPlayerMovement } from "../playerMovement.js";

//this object contains components that could be used in other components
export class gameBoxModel {
    constructor(chatC) {
        this.gameBoxC = createGameBoxC(); //TODO create and add other components
        this.gameBoxC.addChild(chatC);
        listenPlayerMovement()
        requestAnimationFrame(animate);
    }

    get vElement() {
        return this.gameBoxC;
    }
    
}