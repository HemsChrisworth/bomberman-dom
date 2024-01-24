import { MAP_TILE_SIZE, SPRITESHEET_COLUMNS } from "../../consts/consts.js";
import { gameTiles } from "../../gameTiles.js";
import { Tile } from "./tileModel.js";

export class GameMap {
  /**
   *
   * @param {number[][]} levelMap
   */
  constructor(levelMap) {
    // outer circle is just blocks
    this.columns = levelMap[0].length;
    this.rows = levelMap.length;
    this.tileSize = MAP_TILE_SIZE; // depends on sprite sheet ig
    this.levelMap = levelMap;
  }
  createMap(VElement) {
    for (let column = 0; column < this.columns; column++) {
      for (let row = 0; row < this.rows; row++) {
        const tileIndex = this.getTileIndex(column, row);
        const [spriteOffsetX, spriteOffsetY] =
          this.getSpritePositions(tileIndex);

        console.log(spriteOffsetX, spriteOffsetY);
        const x = column * this.tileSize;
        const y = row * this.tileSize;
        this.createTile(x, y, spriteOffsetX, spriteOffsetY);
      }
    }
  }
  getTileIndex(column, row) {
    const tile = this.levelMap[row][column]; // number of the tile to get from spritesheet
    return tile;
  }
  getSpritePositions(tileIndex) {
    const sourceX = (tileIndex % SPRITESHEET_COLUMNS) * MAP_TILE_SIZE;
    const sourceY = Math.floor(tileIndex / SPRITESHEET_COLUMNS) * MAP_TILE_SIZE;
    return [sourceX, sourceY];
  }
  /**
   *
   * @param {*} spriteSheetPosition this is the number of the tile in the spritesheet
   * @param {*} x corresponds to the x position in the gameScreen div
   * @param {*} y corresponds to the y position in the gameScreen div
   */
  createTile(x, y, spriteOffsetX, spriteOffsetY) {
    // currentFrame is the tile number in the spritesheet

    // put the x and y coordinates of the tile into the VElement of the game screen
    const tile = new Tile(x, y, spriteOffsetX, spriteOffsetY);
    gameTiles.push(tile);
  }
}