import { VElement } from "../../../../framework/VElement.js"
import { MAP_TILE_SIZE, PLAYER_START_POSITIONS, PLAYER_Z_INDEX } from "../consts/consts.js"
import { tileTranslator } from "./map/tileModel.js";

function setPlayerStyleAttrs(x, y, z) {
  const style = `left: ${x}px;
                 top: ${y}px;
                 z-index: ${z};
                 width: ${MAP_TILE_SIZE}px;
                 height: ${MAP_TILE_SIZE}px;`
  return style;
}

class PlayerModel {
  constructor(row, column) {
    this.row = row;
    this.column = column;
    this.offsetTop = 0;
    this.offsetLeft = 0;
  }

  toString() {
    if (Object.keys(this).length === 0) return '';
    return `row: ${this.row}
    column: ${this.column} 
    offsetTop: ${this.offsetTop}
    offsetTop: ${this.offsetLeft}
    `;
  }

  // returns array: [{row, columns}]
  getBlocksOnLeft() {
    const blocks = [];
    if (this.offsetTop > 0) {
      blocks.push({ row: this.row }, { row: this.row + 1 })
    } else {
      blocks.push({ row: this.row })
    }

    if (this.offsetLeft > 0) {
      blocks.map(coord => { coord.column = this.column })
    } else {
      blocks.map(coord => { coord.column = this.column - 1 })
    }
    return blocks;
  }
  getBlocksOnRight() {
    const blocks = [];
    if (this.offsetTop > 0) {
      blocks.push({ row: this.row }, { row: this.row + 1 })
    } else {
      blocks.push({ row: this.row })
    }

    blocks.map(coord => { coord.column = this.column })

    return blocks;
  }
  getBlocksOnTop() {
    const blocks = [];
    if (this.offsetLeft > 0) {
      blocks.push({ column: this.column }, { column: this.column + 1 })
    } else {
      blocks.push({ column: this.column })
    }

    if (this.offsetTop > 0) {
      blocks.map(coord => { coord.row = this.row })
    } else {
      blocks.map(coord => { coord.row = this.row - 1 })
    }
    return blocks;
  }
  getBlocksOnBottom() {
    const blocks = [];
    if (this.offsetLeft > 0) {
      blocks.push({ column: this.column }, { column: this.column + 1 })
    } else {
      blocks.push({ column: this.column })
    }

    blocks.map(coord => { coord.row = this.row + 1 })

    return blocks;
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
    this.sprite = "src/assets/images/spritesheets/spritesheet.png";

    this.vElement = new VElement({
      tag: "div",
      attrs: {
        class: 'player',
        style: setPlayerStyleAttrs(this.x, this.y),
      },
      '@keydown': (velem, event) => {
        console.log("jeeeee")
        this.position = [60, 80]
      }
    });
  }
  set position([x, y]) {
    console.log(x, y, this.x, this.y);
    this.x += x
    this.y += y

    this.vElement.setAttr({ style: setPlayerStyleAttrs(this.x, this.y) })
  }
  get position() {
    return [this.x, this.y]
  }

  set number(number) {
    this._number = number;
    const { row, column } = PLAYER_START_POSITIONS[number - 1];
    this.model = new PlayerModel(row, column);
    this.x = this.model.column * MAP_TILE_SIZE; // have x and y randomly allocated
    this.y = this.model.row * MAP_TILE_SIZE;
    this.vElement.setStyle({
      left: `${this.x}px`,
      top: `${this.y}px`
    })
  }
  get number() {
    return this._number;
  }
  renderPlayer(gameBoxM) {
    console.log("render player: ", this)
    gameBoxM.vElement.addChild(this.vElement)
  }

  moveDown(){
    if(mainView.currentViewModel.gameBox?.getTilesOnWay()){}
  }
  moveUp(){}
  moveLeft(){}
  moveRight(){ 

  }
}
