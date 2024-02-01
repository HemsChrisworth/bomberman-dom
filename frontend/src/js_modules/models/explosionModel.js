import { VElement } from "../../../../framework/VElement.js";
import { mainView } from "../../app.js";
import { SPRITE_POS, SPRITE_SHEET_URL, MAP_TILE_SIZE, EXPLOSION_Z_INDEX, EXPLOSION_CENTER, EXPLOSION_LEFT, EXPLOSION_RIGHT, EXPLOSION_UP, EXPLOSION_DOWN, EXPLOSION_LASTING_TIMER, EXPLOSION_EDGES } from "../consts/consts.js";

function setExplosionStyle(x, y) {
    return {
        left: `${x}px`,
        top: `${y}px`,
        ["z-index"]: `${EXPLOSION_Z_INDEX}`,
        ["background-image"]: `url(${SPRITE_SHEET_URL})`,
        width: `${MAP_TILE_SIZE}px`,
        height: `${MAP_TILE_SIZE}px`,
    }
}
function setExplosionPicture(direction) {
    const [spriteOffsetX, spriteOffsetY] = SPRITE_POS[direction];
    const spriteSheetPosition = `-${spriteOffsetX}px -${spriteOffsetY}px`
    return {
        ["background-position"]: `${spriteSheetPosition}`,
    }
}

/**bomb's position on the game map
 * 
 * @property row - current row on the map grid
 * @property column - current column on the map grid
 * @property power - indicate size of expolde
 * @property getBlocksOn - an object containing functions that return blocks on the diriction of the player's movment
 * @property changePosition - an object containing functions that change the position of the player (row or columns) depending on the direction of movment
 */
class ExplosionModel {
    constructor(row, column, power) {
        this.row = row;
        this.column = column;
        this.blocks = {
            [EXPLOSION_LEFT]: [],
            [EXPLOSION_RIGHT]: [],
            [EXPLOSION_UP]: [],
            [EXPLOSION_DOWN]: [],
        };
        for (let i = 1; i <= power; i++) {
            const block = { row: this.row, column: this.column - i };
            const tile = mainView.gameMap?.getTileToDestroy(block);
            if (!tile) {
                this.blocks[EXPLOSION_LEFT].push(block);
                continue; // it was passable tile
            }
            if (tile.destroyable) {
                block.tile = tile;
                this.blocks[EXPLOSION_LEFT].push(block);
            }
            break; // tile was not passable 
        }
        for (let i = 1; i <= power; i++) {
            const block = { row: this.row, column: this.column + i };
            const tile = mainView.gameMap?.getTileToDestroy(block);
            if (!tile) {
                this.blocks[EXPLOSION_RIGHT].push(block);
                continue;
            }
            if (tile.destroyable) {
                block.tile = tile;
                this.blocks[EXPLOSION_RIGHT].push(block);
            }
            break;
        }
        for (let i = 1; i <= power; i++) {
            const block = { row: this.row - i, column: this.column };
            const tile = mainView.gameMap?.getTileToDestroy(block);
            if (!tile) {
                this.blocks[EXPLOSION_UP].push(block);
                continue;
            }
            if (tile.destroyable) {
                block.tile = tile;
                this.blocks[EXPLOSION_UP].push(block);
            }
            break;
        }
        for (let i = 1; i <= power; i++) {
            const block = { row: this.row + i, column: this.column };
            const tile = mainView.gameMap?.getTileToDestroy(block);
            console.log("down expl: ",tile)

            if (!tile) {
                this.blocks[EXPLOSION_DOWN].push(block);
                continue;
            }
            if (tile.destroyable) {
                block.tile = tile;
                this.blocks[EXPLOSION_DOWN].push(block);
            }
            break;
        }
    }

    toString() {
        if (Object.keys(this).length === 0) return '';
        let blstr= 'blocks:\n';
        for (const direct in this.blocks) {
            blstr+=direct+': ';
            for (const block of this.blocks[direct]) {
                blstr+= `
                row: ${block.row}
                column: ${block.column}
                tile: ${block.tile}`
            }
            blstr+= '\n';
        }
        return `
      row: ${this.row}
      column: ${this.column} 
      ${blstr}
      `;
    }
}

export class Explosion {
    constructor({ row, column, power }) {
        
        this.model = new ExplosionModel(row, column, power)
        this.x = this.model.column * MAP_TILE_SIZE
        this.y = this.model.row * MAP_TILE_SIZE
        this.z = EXPLOSION_Z_INDEX;
        console.log("new explosion: " + this.model)
        this.affectedPlayers = [];
        //this.sprite = "src/assets/images/spritesheets/spritesheet.png";
        this.vElements = []
        // center
        this.vElements.push(new VElement({
            tag: "div",
            attrs: {
                class: 'explosion',
            },
            style: setExplosionStyle(this.x, this.y),
        }).setStyle(setExplosionPicture(EXPLOSION_CENTER))
        );
        for (const [direction, blocks] of Object.entries(this.model.blocks)) {
            this.addBeam(direction, blocks);
        }
        this.renderExplosion();
        setTimeout(this.delEsplosion, EXPLOSION_LASTING_TIMER); // set timer for bomb to explose after placing
    }

    addBeam = (direction, blocks) => {
        if (blocks.length === 0) { return }
        for (let i = 0; i < blocks.length - 1; i++) {
            const x = blocks[i].column * MAP_TILE_SIZE;
            const y = blocks[i].row * MAP_TILE_SIZE;
            this.vElements.push(new VElement({
                tag: "div",
                attrs: {
                    class: 'explosion',
                },
                style: setExplosionStyle(x, y),
            }).setStyle(setExplosionPicture(direction))
            );
        }
        const x = blocks[blocks.length - 1].column * MAP_TILE_SIZE;
        const y = blocks[blocks.length - 1].row * MAP_TILE_SIZE;
        this.vElements.push(new VElement({
            tag: "div",
            attrs: {
                class: 'explosion',
            },
            style: setExplosionStyle(x, y),
        }).setStyle(setExplosionPicture(EXPLOSION_EDGES[direction]))
        );
        // if the last one is destroyable tile, destroy it
        blocks[blocks.length - 1].tile?.destroy();
    }
    renderExplosion = () => {
        for (const vElement of this.vElements) { mainView.gameMap.vElement.addChild(vElement) }
    }
    delEsplosion = () => {
        for (const vElement of this.vElements) { mainView.gameMap.vElement.delChild(vElement.vId) }
    }
}



