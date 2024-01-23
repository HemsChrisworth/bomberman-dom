import { VElement } from "../../../../../framework/VElement.js";
import { MAP_TILE_SIZE } from "../../consts/consts.js";

export class Tile {
    constructor(x, y, spriteOffsetX, spriteOffsetY) {
        this.x = x;
        this.y = y;
        this.sprite = 'src/assets/images/spritesheets/spritesheet.png';
        this.passable = false; //TODO make it true/false based on the tile index or perhaps only collide with items that have the same z-index?
        const spriteSheetPosition = `-${spriteOffsetX}px -${spriteOffsetY}px`;
        this.vElement = new VElement({
          tag: "div",
          attrs: {
            src: this.sprite,
            style: `background-image: url(${this.sprite});
            background-position: ${spriteSheetPosition};
            left: ${this.x}px;
            top: ${this.y}px;
            width: ${MAP_TILE_SIZE}px;
            height: ${MAP_TILE_SIZE}px;
            position: absolute;`,
          },
        });
    }
}


class Bomb extends Tile {
    
}

class DestroyableBlock extends Tile {

}