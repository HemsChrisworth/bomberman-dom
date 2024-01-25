import { VElement } from "../../../../framework/VElement.js";
import { mainGameScreen } from "./gameBoxComponents/gamePanel.js";
import { gameInfoPanelC } from "./gameBoxComponents/gameInfoPanelC.js";

export function createGameBoxC() {
    return new VElement({ // the whole div of all game stuff
        tag: 'div',
        attrs: { id: 'game' },
        children: [
            gameInfoPanelC,     // the panel of game info
            mainGameScreen,     // the game itself
            // chatC,              // the chat panel added in mainView
        ],
    })
}
