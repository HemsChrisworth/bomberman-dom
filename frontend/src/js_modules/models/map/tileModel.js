import { VElement } from "../../../../../framework/VElement.js";
import { GRASS, MAP_TILE_SIZE, SOLID, DBLOCK, BOMBPUP, FIREPUP, SPEEDPUP } from "../../consts/consts.js";

export class Tile {
  constructor(x, y, spriteOffsetX, spriteOffsetY) {
    this.x = x;
    this.y = y;
    this.sprite = 'src/assets/images/spritesheets/spritesheet.png';
    this.passable = false;
    this.destroyable = false;
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

// if DestroyableBlock is destroyed => appears GrassBlock OR BombPowerUp OR FirePowerUp OR SpeedPowerUp
class DestroyableBlock extends Tile {
  constructor(x, y, spriteOffsetX, spriteOffsetY) {
    super(x, y, spriteOffsetX, spriteOffsetY);
    this.passable = false;
    this.destroyable = true;
  }
}

class SolidBlock extends Tile {
  constructor(x, y, spriteOffsetX, spriteOffsetY) {
    super(x, y, spriteOffsetX, spriteOffsetY);
    this.passable = false;
  }
}

class GrassBlock extends Tile {
  constructor(x, y, spriteOffsetX, spriteOffsetY) {
    super(x, y, spriteOffsetX, spriteOffsetY);
    this.passable = true;
  }
}

class BombPowerUp extends Tile {
  constructor(x, y, spriteOffsetX, spriteOffsetY) {
    super(x, y, spriteOffsetX, spriteOffsetY);
    this.passable = false; //initial data, will change when the block is destoyed
    this.powerup = BOMBPUP;
    // if block is touched by player => mainView.currentPlayer.bombAmount++;
  }
}

class FirePowerUp extends Tile {
  constructor(x, y, spriteOffsetX, spriteOffsetY) {
    super(x, y, spriteOffsetX, spriteOffsetY);
    this.passable = false; //initial data, will change when the block is destoyed
    this.powerup = FIREPUP;
    // if block is touched by player => mainView.currentPlayer.fireTiles++;
  }
}

class SpeedPowerUp extends Tile {
  constructor(x, y, spriteOffsetX, spriteOffsetY) {
    super(x, y, spriteOffsetX, spriteOffsetY);
    this.passable = false; //initial data, will change when the block is destoyed
    this.powerup = SPEEDPUP;
    // if block is touched by player => mainView.currentPlayer.MOVEMENT_SPEED++;
  }
}

export const tileTranslator = {
  [SOLID]: function (x, y, spriteOffsetX, spriteOffsetY) {
    return new SolidBlock(x, y, spriteOffsetX, spriteOffsetY);
  },
  [GRASS]: function (x, y, spriteOffsetX, spriteOffsetY) {
    return new GrassBlock(x, y, spriteOffsetX, spriteOffsetY);
  },
  [DBLOCK]: function (x, y, spriteOffsetX, spriteOffsetY) {
    return new DestroyableBlock(x, y, spriteOffsetX, spriteOffsetY);
  },
  [BOMBPUP]: function (x, y, spriteOffsetX, spriteOffsetY) {
    return new BombPowerUp(x, y, spriteOffsetX, spriteOffsetY);
  },
  [FIREPUP]: function (x, y, spriteOffsetX, spriteOffsetY) {
    return new FirePowerUp(x, y, spriteOffsetX, spriteOffsetY);
  },
  [SPEEDPUP]: function (x, y, spriteOffsetX, spriteOffsetY) {
    return new SpeedPowerUp(x, y, spriteOffsetX, spriteOffsetY);
  },
};