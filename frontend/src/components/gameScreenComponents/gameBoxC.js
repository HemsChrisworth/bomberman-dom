import { VElement } from "../../../../framework/VElement.js";
import { gamePanelC } from "./gameBoxComponents/gamePanel.js";

export const gameBoxC = new VElement({
    tag: 'div',
    attrs: {id: 'game'},
    children: [
        gamePanelC
    ]
})
