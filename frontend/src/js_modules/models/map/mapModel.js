import { MAP_TILE_SIZE } from "../../consts/consts";

export class Map {
    /**
     * 
     * @param {number[][]} levelMap 
     */
    constructor(levelMap) { // outer circle is just blocks
        this.columns = levelMap[0].length
        this.rows = levelMap.length
        this.tileSize = MAP_TILE_SIZE // depends on sprite sheet ig
        this.levelMap = levelMap
    }
    renderMap(VElement) {
        for (let column = 0; column < this.columns; column++) {
          for (let row = 0; row < this.rows; row++) {
            const tile = this.getTile(column, row);
            const x = column * this.tileSize;
            const y = row * this.tileSize;
            drawTile(tile, x, y, VElement);
          }
        }
    }
    getTile(column, row) {
        const tile = this.levelMap[row][column] // number of the tile to get from spritesheet
        return tile
    }
    drawTile() { // put the x and y coordinates of the tile into the VElement of the game screen

    }
}