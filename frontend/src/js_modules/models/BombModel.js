import { VElement } from "../../../../framework/VElement.js";
import { mainView } from "../../app.js";
import { BOMB_EXPLOSION_TIMER, BOMB_Z_INDEX, LEFT, RIGHT, UP, DOWN, SPRITE_POS, BOMB, SPRITE_SHEET_URL, MAP_TILE_SIZE } from "../consts/consts.js";
import { Tile } from "./map/tileModel.js";

function setBombStyleAttrs(x, y) {
    const style = `left: ${x}px;
                   top:  ${y}px;
                   z-index: ${BOMB_Z_INDEX};
                   background-image: url(${SPRITE_SHEET_URL});
                   background-position: ${SPRITE_POS[BOMB]};
                   width: ${MAP_TILE_SIZE}px;
                   height: ${MAP_TILE_SIZE}px;`;
    return style;
}

/**bomb's position on the game map
 * 
 * @property row - current row on the map grid
 * @property column - current column on the map grid
 * @property power - indicate size of expolde
 * @property getBlocksOn - an object containing functions that return blocks on the diriction of the player's movment
 * @property changePosition - an object containing functions that change the position of the player (row or columns) depending on the direction of movment
 */
class BombModel {
    constructor(row, column, power) {
        this.row = row;
        this.column = column;
        this._power = power;
    }

    set power(p) {
        if (p >= 1) {
            this._power = p
        }
    }
    get power() {
        return this._power;
    }

    toString() {
        if (Object.keys(this).length === 0) return '';
        return `
      row: ${this.row}
      column: ${this.column} 
      power: ${this.power}
      `;
    }

    // returns array: [{row, columns}]
    getBlocksAround = () => {
        const blocks = {
            [LEFT]: [],
            [RIGHT]: [],
            [UP]: [],
            [DOWN]: [],
        };
        for (let i = 1; i <= this.power; i++) {
            const block = { row: this.row, column: this.column - i };
            if (!mainView.gameMap?.getTilesOnWay(block)) {
                break;
            }
            blocks[LEFT].push(block);
        }
        for (let i = 1; i <= this.power; i++) {
            const block = { row: this.row, column: this.column + i };
            if (!mainView.gameMap?.getTilesOnWay(block)) {
                break;
            }
            blocks[RIGHT].push(block);
        }
        for (let i = 1; i <= this.power; i++) {
            const block = { row: this.row - i, column: this.column };
            if (!mainView.gameMap?.getTilesOnWay(block)) {
                break;
            }
            blocks[UP].push(block);
        }
        for (let i = 1; i <= this.power; i++) {
            const block = { row: this.row + i, column: this.column };
            if (!mainView.gameMap?.getTilesOnWay(block)) {
                break;
            }
            blocks[DOWN].push(block);
        }
        return blocks;
    }
}

export class Bomb {
    constructor({row, column, power}) {
        this.model = new BombModel(row, column, power)
        console.log('new bomb', row, column, power)
        this.x = this.model.column * MAP_TILE_SIZE
        this.y = this.model.row * MAP_TILE_SIZE
        this.z = BOMB_Z_INDEX;
        this.hasExploded = false; // if true, remove bomb (set to true after exploding)
        //this.sprite = "src/assets/images/spritesheets/spritesheet.png";
        this.vElement = new VElement({
            tag: "div",
            attrs: {
                class: 'bomb',
                style: setBombStyleAttrs(this.x, this.y),
            },
        });
        this.renderBomb();
        setTimeout(this.explode, BOMB_EXPLOSION_TIMER, this.vElement.vId); // set timer for bomb to explose after placing
    }
    renderBomb() {
        mainView.gameMap.vElement.addChild(this.vElement)
    }

    explode(bombvID) {
        this.hasExploded = true;
        mainView.vElement.delChild(bombvID); // removes bomb element

        // add explosion elements
        // handle player lives and block destroying within radius
    }
}



