import { levelMap } from "../consts/levelData.js";
import { GameMap } from "../models/map/mapModel.js";

export function createMap() {
    const gameMap = new GameMap(levelMap);
    gameMap.renderMap()
}



// logic for creating map

// have 
