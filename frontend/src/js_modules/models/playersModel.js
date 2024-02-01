import { VElement } from "../../../../framework/VElement.js"
import { mainView } from "../../app.js"
import { BOMB_PLACEMENT_DELAY, MAP_TILE_SIZE, PLAYER_MOVEMENT_SPEED, PLAYER_START_POSITIONS, PLAYER_Z_INDEX } from "../consts/consts.js"
import { PLAYER_MOVE_DOWN, PLAYER_MOVE_LEFT, PLAYER_MOVE_RIGHT, PLAYER_MOVE_UP, PLAYER_PLACE_BOMB } from "../consts/playerActionTypes.js";

const OFFSET_IGNORED = 10;
function setPlayerStyleAttrs(x, y) {
  const style = `transform: translate(${x}px, ${y}px);
                 z-index: ${PLAYER_Z_INDEX};
                 width: ${MAP_TILE_SIZE}px;
                 height: ${MAP_TILE_SIZE}px;`;
  return style;
}
function newPlayerStyleTransform(x, y) {
  return { transform: `translate(${x}px, ${y}px)` }

}
/**player's position on the game map
 * 
 * @property row - current row on the map grid
 * @property column - current column on the map grid
 * @property offsetX - offset from the feft edge of the current column
 * @property offsetY - offset from the top edge of the current row
 * @property getBlocksOn - an object containing functions that return blocks on the diriction of the player's movment
 * @property changePosition - an object containing functions that change the position of the player (row or columns) depending on the direction of movment
 */
class PlayerModel {
  constructor(row, column) {
    this.row = row;
    this.column = column;
    this.offsetY = 0;
    this.offsetX = 0;
  }

  set offset([x, y]) {
    this.offsetX = x
    this.offsetY = y
  }
  get offset() {
    return [this.offsetX, this.offsetY]
  }

  toString() {
    if (Object.keys(this).length === 0) return '';
    return `
    row: ${this.row}
    column: ${this.column} 
    offsetX: ${this.offsetX}
    offsetY: ${this.offsetY}
    `;
  }

  // returns array: [{row, columns}]
  getBlocksOn = {
    [PLAYER_MOVE_LEFT]: () => {
      const blocks = [];
      if (this.offsetY > 0) {
        blocks.push({ row: this.row, column: this.column - 1 }, { row: this.row + 1, column: this.column - 1 })
      } else {
        blocks.push({ row: this.row, column: this.column - 1 })
      }
      return blocks;
    },
    [PLAYER_MOVE_RIGHT]: () => {
      const blocks = [];
      if (this.offsetY > 0) {
        blocks.push({ row: this.row, column: this.column + 1 }, { row: this.row + 1, column: this.column + 1 })
      } else {
        blocks.push({ row: this.row, column: this.column + 1 })
      }
      return blocks;
    },
    [PLAYER_MOVE_UP]: () => {
      const blocks = [];
      if (this.offsetX > 0) {
        blocks.push({ row: this.row - 1, column: this.column }, { row: this.row - 1, column: this.column + 1 })
      } else {
        blocks.push({ row: this.row - 1, column: this.column })
      }
      return blocks;
    },
    [PLAYER_MOVE_DOWN]: () => {
      const blocks = [];
      if (this.offsetX > 0) {
        blocks.push({ row: this.row + 1, column: this.column }, { row: this.row + 1, column: this.column + 1 })
      } else {
        blocks.push({ row: this.row + 1, column: this.column })
      }
      return blocks;
    }
  }

  changePosition = {
    [PLAYER_MOVE_LEFT]: () => { this.column--; },
    [PLAYER_MOVE_RIGHT]: () => { this.column++; },
    [PLAYER_MOVE_UP]: () => { this.row--; },
    [PLAYER_MOVE_DOWN]: () => { this.row++; },
  }
}

export class Player { // add all player properties here, for example image, movements etc
  constructor(name, number) {
    this.name = name;
    if (number) {
      this._number = number;
      const { row, column } = PLAYER_START_POSITIONS[number - 1]
      this.model = new PlayerModel(row, column)
      this.x = this.model.column * MAP_TILE_SIZE // have x and y randomly allocated
      this.y = this.model.row * MAP_TILE_SIZE
    }
    this.lives = 3
    this.fireTiles = 3 // the lenght of fire in tiles
    this.bombAmount = 3 // the amount of bombs
    this.sprite = "src/assets/images/spritesheets/spritesheet.png";

    this.vElement = new VElement({
      tag: "div",
      attrs: {
        class: 'player',
        style: setPlayerStyleAttrs(this.x, this.y),
      },
    });
  }
  set position([x, y]) {
    this.x = x
    this.y = y
  }
  get position() {
    return [this.x, this.y]
  }
  moveOn(shiftX, shiftY) {
    this.x += shiftX;
    this.y += shiftY;
  }
  setVPosition() {
    this.vElement.setStyle(newPlayerStyleTransform(this.x, this.y))
  }
  set number(number) {
    this._number = number;
    const { row, column } = PLAYER_START_POSITIONS[number - 1];
    this.model = new PlayerModel(row, column);
    this.x = this.model.column * MAP_TILE_SIZE; // have x and y randomly allocated
    this.y = this.model.row * MAP_TILE_SIZE;
    this.setVPosition();
  }
  get number() {
    return this._number;
  }
  renderPlayer(gameBoxM) {
    gameBoxM.vElement.addChild(this.vElement)
  }

  adgustByX() {
    let shiftX = 0;
    const oldModel = {
      offsetX: this.model.offsetX,
      column: this.model.column
    };
    if (this.model.offsetX <= OFFSET_IGNORED) {
      shiftX = -this.model.offsetX;
      this.model.offsetX = 0;
    } else if (this.model.offsetX >= MAP_TILE_SIZE - OFFSET_IGNORED) {
      shiftX = MAP_TILE_SIZE - this.model.offsetX;
      this.model.offsetX = 0;
      this.model.column++;
    }
    return [oldModel, shiftX]
  }
  adgustByY() {
    let shiftY = 0;
    const oldModel = {
      offsetY: this.model.offsetY,
      row: this.model.row
    };
    if (this.model.offsetY <= OFFSET_IGNORED) {
      shiftY = -this.model.offsetY;
      this.model.offsetY = 0;
    } else if (this.model.offsetY >= MAP_TILE_SIZE - OFFSET_IGNORED) {
      shiftY = MAP_TILE_SIZE - this.model.offsetY;
      this.model.offsetY = 0;
      this.model.row++;
    }
    return [oldModel, shiftY]
  }

  [PLAYER_MOVE_DOWN] = () => {
    let [oldModel, shiftX] = this.adgustByX();

    if (this.model.offsetY == 0 && !mainView.gameMap?.getTilesOnWay(this.model.getBlocksOn[PLAYER_MOVE_DOWN]())) {
      Object.assign(this.model, oldModel);
      return false;
    }

    let shiftY = PLAYER_MOVEMENT_SPEED;
    this.model.offsetY += shiftY;

    if (this.model.offsetY >= MAP_TILE_SIZE) {
      this.model.index = this.model.changePosition[PLAYER_MOVE_DOWN]();
      if (!mainView.gameMap?.getTilesOnWay(this.model.getBlocksOn[PLAYER_MOVE_DOWN]())) {
        shiftY -= this.model.offsetY - MAP_TILE_SIZE
        this.model.offsetY = 0;
      } else {
        this.model.offsetY -= MAP_TILE_SIZE;
      }
    }

    this.moveOn(shiftX, shiftY);
    return true;
  }
  [PLAYER_MOVE_UP] = () => {
    let [oldModel, shiftX] = this.adgustByX();

    if (this.model.offsetY == 0 && !mainView.gameMap?.getTilesOnWay(this.model.getBlocksOn[PLAYER_MOVE_UP]())) {
      Object.assign(this.model, oldModel);
      return false;
    }

    let shiftY = -PLAYER_MOVEMENT_SPEED;
    this.model.offsetY += shiftY;

    if (this.model.offsetY < 0) {
      if (!mainView.gameMap?.getTilesOnWay(this.model.getBlocksOn[PLAYER_MOVE_UP]())) {
        shiftY -= this.model.offsetY
        this.model.offsetY = 0;
      } else {
        this.model.index = this.model.changePosition[PLAYER_MOVE_UP]();
        this.model.offsetY += MAP_TILE_SIZE;
      }
    }

    this.moveOn(shiftX, shiftY);
    return true;
  }
  [PLAYER_MOVE_LEFT] = () => {
    let [oldModel, shiftY] = this.adgustByY();

    if (this.model.offsetX == 0 && !mainView.gameMap?.getTilesOnWay(this.model.getBlocksOn[PLAYER_MOVE_LEFT]())) {
      Object.assign(this.model, oldModel);
      return false;
    }

    let shiftX = - PLAYER_MOVEMENT_SPEED;
    this.model.offsetX += shiftX;

    if (this.model.offsetX < 0) {
      if (!mainView.gameMap?.getTilesOnWay(this.model.getBlocksOn[PLAYER_MOVE_LEFT]())) {
        shiftX -= this.model.offsetX
        this.model.offsetX = 0;
      } else {
        this.model.index = this.model.changePosition[PLAYER_MOVE_LEFT]();
        this.model.offsetX += MAP_TILE_SIZE;
      }
    }

    this.moveOn(shiftX, shiftY);
    return true;
  }
  [PLAYER_MOVE_RIGHT] = () => {
    let [oldModel, shiftY] = this.adgustByY();

    if (this.model.offsetX == 0 && !mainView.gameMap?.getTilesOnWay(this.model.getBlocksOn[PLAYER_MOVE_RIGHT]())) {
      Object.assign(this.model, oldModel);
      return false;
    }
    let shiftX = PLAYER_MOVEMENT_SPEED;
    this.model.offsetX += shiftX;

    if (this.model.offsetX >= MAP_TILE_SIZE) {
      this.model.index = this.model.changePosition[PLAYER_MOVE_RIGHT]();
      if (!mainView.gameMap?.getTilesOnWay(this.model.getBlocksOn[PLAYER_MOVE_RIGHT]())) {
        shiftX -= this.model.offsetX - MAP_TILE_SIZE
        this.model.offsetX = 0;
      } else {
        this.model.offsetX -= MAP_TILE_SIZE;
      }
    }

    this.moveOn(shiftX, shiftY);
    return true;
  }

  [PLAYER_PLACE_BOMB] = () => {
    this.bombAmount--;
    setTimeout(() => { this.bombAmount++ }, BOMB_PLACEMENT_DELAY);
    let { row, column } = this.model;
    const power = this.fireTiles;
    if (this.model.offsetX > MAP_TILE_SIZE / 2) {
      column++;
    }
    if (this.model.offsetY > MAP_TILE_SIZE / 2) {
      row++;
    }
    return { row, column, power };
  }
}
