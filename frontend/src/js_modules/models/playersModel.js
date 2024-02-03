import { VElement } from "../../../../framework/VElement.js"
import { mainView } from "../../app.js"
import { convertRowColumnToXY } from "../../utils/spriteSheetCalc.js";
import { MAP_TILE_SIZE, PLAYER_START_POSITIONS, PLAYER_Z_INDEX, PLAYER_MOVEMENT_SPEED, BOMB_EXPLOSION_TIMER, BOMBPUP, FIREPUP, SPEEDPUP, PLAYER_RESPAWN_TIME } from "../consts/consts.js"
import { PLAYER_MOVE_DOWN, PLAYER_MOVE_LEFT, PLAYER_MOVE_RIGHT, PLAYER_MOVE_UP, PLAYER_PLACE_BOMB } from "../consts/playerActionTypes.js";

const OFFSET_IGNORED = 10;
function setPlayerStyleAttrs() {
  const style = `z-index: ${PLAYER_Z_INDEX};
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
    this.stats = new PlayerStats(); // for lives in the vElement
    this.dead = false
    this.sprite = "src/assets/images/spritesheets/bomberman.png"; // currently uses url in style.css
    
    this.vElement = new VElement({
      tag: "div",
      attrs: {
        class: "player",
        style: setPlayerStyleAttrs(),
      },
    });
    if (number) {
      this.number =number;
      // this._number = number;
      // const { row, column } = PLAYER_START_POSITIONS[number - 1];
      // this.model = new PlayerModel(row, column);
      // this.x = this.model.column * MAP_TILE_SIZE; // have x and y randomly allocated
      // this.y = this.model.row * MAP_TILE_SIZE;
    }
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
    [this.x, this.y] = convertRowColumnToXY(this.model.row, this.model.column)
    this.setVPosition();
  }
  get number() {
    return this._number;
  }
  renderPlayer(gameBoxM) {
    gameBoxM.vElement.addChild(this.vElement)
  }

  die() {
    this.dead = true
    this.stats.loseLife();
    this.respawn();
    //setTimeout(this.respawn, PLAYER_RESPAWN_TIME); //
  }
  respawn() {
    const {row, column} = this._number ? PLAYER_START_POSITIONS[this._number - 1] : PLAYER_START_POSITIONS[0];
    this.model = new PlayerModel(row, column);
    const [x, y] = convertRowColumnToXY(row, column)
    this.position = [x, y] // add websocket stuff later
  }
  adjustByX() {
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
  adjustByY() {
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

  checkTilesOnWay(direction) {
    // because of the map's structure there will be never more than one tile with a powerUp. 
    // If there are 2 tiles on the player way it means that 1 of them is solid. 
    // So if getTilesOnWay returns not false value it means tiles arary contains omnly 1 element. But let it be.
    const tiles = mainView.gameMap?.getTilesOnWay(this.model.getBlocksOn[direction]());
    if (!tiles) { return false; }
    for (let tile of tiles) {
      console.log("checkTilesOnWay, tile : ",tile.onFire)
      if (tile.onFire) {
        mainView.currentPlayer.die()
        return
      }
      if (tile.powerup != null) {//!=null or undefined
        this.stats[tile.powerup]();
        console.log("checkTilesOnWay, player stat  : " + this.stats)
        tile.removePowerUp();
      }
    }
    return true; // if we want to send the stats changes to the server, it has to return object with changed stats properties
  }

  [PLAYER_MOVE_DOWN] = () => {
    let [oldModel, shiftX] = this.adjustByX();


    if (this.model.offsetY == 0 && !this.checkTilesOnWay(PLAYER_MOVE_DOWN)) {
      Object.assign(this.model, oldModel);
      return false;
    }

    let shiftY = this.stats.moveSpeed;
    this.model.offsetY += shiftY;

    if (this.model.offsetY >= MAP_TILE_SIZE) {
      this.model.index = this.model.changePosition[PLAYER_MOVE_DOWN]();
      if (!this.checkTilesOnWay(PLAYER_MOVE_DOWN)) {
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
    let [oldModel, shiftX] = this.adjustByX();

    if (this.model.offsetY == 0 && !this.checkTilesOnWay(PLAYER_MOVE_UP)) {
      Object.assign(this.model, oldModel);
      return false;
    }

    let shiftY = -this.stats.moveSpeed;
    this.model.offsetY += shiftY;

    if (this.model.offsetY < 0) {
      if (!this.checkTilesOnWay(PLAYER_MOVE_UP)) {
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
    let [oldModel, shiftY] = this.adjustByY();

    if (this.model.offsetX == 0 && !this.checkTilesOnWay(PLAYER_MOVE_LEFT)) {
      Object.assign(this.model, oldModel);
      return false;
    }

    let shiftX = - this.stats.moveSpeed;
    this.model.offsetX += shiftX;

    if (this.model.offsetX < 0) {
      if (!this.checkTilesOnWay(PLAYER_MOVE_LEFT)) {
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
    let [oldModel, shiftY] = this.adjustByY();

    if (this.model.offsetX == 0 && !this.checkTilesOnWay(PLAYER_MOVE_RIGHT)) {
      Object.assign(this.model, oldModel);
      return false;
    }
    let shiftX = this.stats.moveSpeed;
    this.model.offsetX += shiftX;

    if (this.model.offsetX >= MAP_TILE_SIZE) {
      this.model.index = this.model.changePosition[PLAYER_MOVE_RIGHT]();
      if (!this.checkTilesOnWay(PLAYER_MOVE_RIGHT)) {
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
    if (this.stats.bombAmount <= 0) { return false; }
    this.stats.bombAmount--;
    setTimeout(() => { this.stats.bombAmount++ }, BOMB_EXPLOSION_TIMER);
    let { row, column } = this.model;
    const power = this.stats.fireTiles;
    if (this.model.offsetX > MAP_TILE_SIZE / 2) {
      column++;
    }
    if (this.model.offsetY > MAP_TILE_SIZE / 2) {
      row++;
    }
    return { row, column, power };
  }
}

class PlayerStats {
  constructor() {
    this.lives = 3;
    // potentially those stats could be display on the status bar - 
    // to do this we need to add setters which will change the statsBar and after the player moves, send to server these stats along with the position 
    this.bombAmount = 1; // the amount of bombs
    this.fireTiles = 1; // the lenght of explosion in tiles
    this.moveSpeed = PLAYER_MOVEMENT_SPEED; // for powerup
    this.vPlayerStatsBar = new VElement({
      tag: "span",
      attrs: { class: "userGameStatus", class: "material-symbols-outlined" },
      content: `${this.lives}favorite`,
    });
  }
  toString() {
    return `
  lives: ${this.lives}
  bombAmount: ${this.bombAmount}
  fireTiles: ${this.fireTiles}
  moveSpeed: ${this.moveSpeed}`
  }
  loseLife() {
    this.lives--
    this.vPlayerStatsBar.content = `${this.lives}favorite`;
  }
  [BOMBPUP] = () => {
    this.bombAmount++;
  }
  [FIREPUP] = () => {
    this.fireTiles++;
  }
  [SPEEDPUP] = () => {
    this.moveSpeed += 1;
  }
}