
import { mainView } from "../app.js";
import { baseMap } from "../js_modules/consts/levelData.js";
import { GameMap } from "../js_modules/models/map/mapModel.js";
import { tileTranslator } from "../js_modules/models/map/tileModel.js";
import { Player } from "../js_modules/models/playersModel.js";


export function testCreateMap() {
    const newMap = new GameMap(baseMap);

    newMap.renderMap()
}

export function testTileTranslator() {
    console.log(tileTranslator[45](0, 0, 0, 0))
}

export const juice = new Player("juice", 1);

export function testGameBox() {
    
    mainView.showGameBox();
    juice.renderPlayer(mainView.currentViewModel);
}
