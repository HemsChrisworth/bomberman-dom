import { createGameBoxC } from "../../components/gameScreenComponents/gameBoxC.js";


//this object contains components that could be used in other components
export class gameBoxModel {
    constructor(chatC) {
        this.gameBoxC = createGameBoxC(); //TODO create and add other components
        this.gameBoxC.addChild(chatC);
    }

    get vElement() {
        return this.gameBoxC;
    }
}