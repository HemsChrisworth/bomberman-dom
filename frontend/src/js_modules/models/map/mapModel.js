import { VElement } from "../../../../../framework/VElement.js";
import { mainView } from "../../../app.js";
import { BACKEND_MAP_CODES, BACKEND_TILE_TYPE_CODES, MAP_COLUMNS, MAP_ROWS, MAP_TILE_SIZE, SPRITESHEET_COLUMNS } from "../../consts/consts.js";
import { Tile, tileTranslator } from "./tileModel.js";

export class GameMap {
  /**
   *
   * @param {number[][]} tileMap
   */
  constructor(tileMap) {
    // outer circle is just blocks
    this.columns = MAP_COLUMNS;
    this.rows = MAP_ROWS;
    this.tileSize = MAP_TILE_SIZE; // depends on sprite sheet ig
    //this.tileMap = tileMap;
    this.baseMap = []
    this.createMap(tileMap)
    this.vElement = new VElement({
      // here we add all the tiles of the game as VElement children
      tag: "div",
      attrs: { id: "gamescreen" },
      children: [
      ],
    });
    this.renderMap()
  }
  createMap(tileMap) {
    for (let row = 0; row < this.rows; row++) {
      this.baseMap[row] = [];
      for (let column = 0; column < this.columns; column++) {
        const tileCode = tileMap[row * this.columns + column]; // number of the tile to get from spritesheet
        const tileIndex = this.getMapTileIndex(tileCode);
        const [spriteOffsetX, spriteOffsetY] =
          this.getSpritePositions(tileIndex);

        //console.log(spriteOffsetX, spriteOffsetY);
        const x = column * this.tileSize;
        const y = row * this.tileSize;
        const tileType = this.getTileTypeIndex(tileCode)
        const tile = tileTranslator[tileType](x, y, spriteOffsetX, spriteOffsetY);
        this.baseMap[row][column] = tile;
      }
    }
  }
  getMapTileIndex(tileCode) {
    return BACKEND_MAP_CODES[tileCode];
  }
  getTileTypeIndex(tileCode) {
    return BACKEND_TILE_TYPE_CODES[tileCode];
  }
  getSpritePositions(tileIndex) {
    const sourceX = (tileIndex % SPRITESHEET_COLUMNS) * MAP_TILE_SIZE;
    const sourceY = Math.floor(tileIndex / SPRITESHEET_COLUMNS) * MAP_TILE_SIZE;
    return [sourceX, sourceY];
  }
  renderMap() {
    for (const row of this.baseMap) {
      for (const tile of row) {
        this.vElement.addChild(tile.vElement);
      }
    }
  }

  getTilesOnWay(tilesToCheck) {
    const powersup = []
    for (const tile of tilesToCheck){
      if (!this.baseMap[tile.row][tile.column].passable){
        return false;
      }else{
        if (tile.powersup){
          powersup.push(tile.powersup)
        }
      }
    }
    return powersup;
}
}
