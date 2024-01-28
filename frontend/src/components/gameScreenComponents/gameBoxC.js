import { VElement } from "../../../../framework/VElement.js";
import { baseMap } from "../../js_modules/consts/levelData.js";
import { GameMap } from "../../js_modules/models/map/mapModel.js";
import { gameInfoPanelC } from "./gameBoxComponents/gameInfoPanelC.js";

export const mainGameMap = new GameMap(baseMap)

export function createGameBoxC() {
    return new VElement({ // the whole div of all game stuff
        tag: 'div',
        attrs: { id: 'game' },
        children: [
            gameInfoPanelC,     // the panel of game info
            mainGameMap.vElement,     // the game itself
            // chatC,              // the chat panel added in mainView
        ],
    })
}
