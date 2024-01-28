import { VElement } from "../../../../../framework/VElement.js";
import { mainView } from "../../../app.js";
import { MAP_TILE_SIZE, SPRITESHEET_COLUMNS } from "../../consts/consts.js";
import { Tile, tileTranslator } from "./tileModel.js";

export class GameMap {
  /**
   *
   * @param {number[][]} tileMap
   */
  constructor(tileMap) {
    // outer circle is just blocks
    this.columns = tileMap[0].length;
    this.rows = tileMap.length;
    this.tileSize = MAP_TILE_SIZE; // depends on sprite sheet ig
    this.tileMap = tileMap;
    this.baseMap = []
    this.createMap()
    this.vElement = new VElement({
      // here we add all the tiles of the game as VElement children
      tag: "div",
      attrs: { id: "gamescreen" },
      children: [
      ],
    });
  }
  createMap(VElement) {
    for (let column = 0; column < this.columns; column++) {
      for (let row = 0; row < this.rows; row++) {
        const tileIndex = this.getTileIndex(column, row);
        const [spriteOffsetX, spriteOffsetY] =
          this.getSpritePositions(tileIndex);

        //console.log(spriteOffsetX, spriteOffsetY);
        const x = column * this.tileSize;
        const y = row * this.tileSize;
        const tile = tileTranslator[tileIndex](x, y, spriteOffsetX, spriteOffsetY)
        this.baseMap.push(tile);
      }
    }
  }
  getTileIndex(column, row) {
    const tile = this.tileMap[row][column]; // number of the tile to get from spritesheet
    return tile;
  }
  getSpritePositions(tileIndex) {
    const sourceX = (tileIndex % SPRITESHEET_COLUMNS) * MAP_TILE_SIZE;
    const sourceY = Math.floor(tileIndex / SPRITESHEET_COLUMNS) * MAP_TILE_SIZE;
    return [sourceX, sourceY];
  }
  renderMap() {
    for (const tile of this.baseMap) {
      this.vElement.addChild(tile.vElement);
    }
  }
  renderPlayers() {
    Object.keys(mainView.PlayerList).forEach((playerName) => {
      if (playerName != length) {
        mainView.PlayerList[playerName].renderPlayer()
      }
    });
  }
}