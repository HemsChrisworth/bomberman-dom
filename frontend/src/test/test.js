import { mainGameScreen } from "../components/gameScreenComponents/gameBoxComponents/gamePanel.js";
import { levelMap } from "../js_modules/consts/levelData.js";
import { gameTiles } from "../js_modules/gameScreen.js";
import { GameMap } from "../js_modules/models/map/mapModel.js";


export function testCreateMap() {
    const newMap = new GameMap(levelMap);

    newMap.createMap();
    console.log(gameTiles)
}

export function testRenderMap() {
    testCreateMap()
    for (const tile of gameTiles) {
        mainGameScreen.addChild(tile.vElement)
    }
}