import { VElement } from "../../../../framework/VElement.js"
import { MAP_TILE_SIZE, PLAYER_Z_INDEX } from "../consts/consts.js"

function setPlayerStyleAttrs(x, y) {
  const style = `transform: translate(${x}px, ${y}px);
                 z-index: ${PLAYER_Z_INDEX};
                 width: ${MAP_TILE_SIZE}px;
                 height: ${MAP_TILE_SIZE}px;`;
  return style;
}

class PlayerModel {
  constructor(row, column) {
    this.row = row;
    this.column = column;
    offsetTop = 0;
    offsetLeft = 0;
  }

  toString() {
    if (Object.keys(this).length === 0) return '';
    return `row: ${this.row}
    column: ${this.column} 
    offsetTop: ${this.offsetTop}
    offsetTop: ${this.offsetLeft}
    `;
  }

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
    this.x = 32 // have x and y randomly allocated
    this.y = 32
    this.name = name,
      this.number = number,
      this.lives = 3
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
  setVPosition() {
    this.vElement.setAttr({ style: setPlayerStyleAttrs(this.x, this.y)})
  }
  renderPlayer(gameBoxM) {
    gameBoxM.vElement.addChild(this.vElement)
  }
}