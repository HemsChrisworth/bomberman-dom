import { animate } from "../../animation/animate.js";
import { createGameBoxC } from "../../components/gameScreenComponents/gameBoxC.js";
import { listenPlayerMovement } from "../playerMovement.js";
import { GameMap } from "./map/mapModel.js";

//this object contains components that could be used in other components
export class gameBoxModel {
    constructor(baseMap) {
        this.gameMap = new GameMap(baseMap)

        this.gameBoxC = createGameBoxC(this.gameMap.vElement); //TODO create and add other components
        listenPlayerMovement()
        requestAnimationFrame(animate);
    }

    get vElement() {
        return this.gameBoxC;
    }
    
}