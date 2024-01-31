import { VElement } from "../../../../../framework/VElement.js";
import { GRASS, MAP_TILE_SIZE, SOLID, DBLOCK , BOMBPUP, FIREPUP , SPEEDPUP } from "../../consts/consts.js";
import { Player } from "../playersModel.js";

export class Tile {
    constructor(x, y, spriteOffsetX, spriteOffsetY) {
        this.x = x;
        this.y = y;
        this.sprite = 'src/assets/images/spritesheets/spritesheet.png';
        this.passable = false;
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
  constructor(x, y, spriteOffsetX, spriteOffsetY) {
    super(x, y, spriteOffsetX, spriteOffsetY);
    this.z = BOMB_Z_INDEX
    this.timer = timer; // how long the bomb ticks for before exploding
    this.hasExploded = false; // if true, remove bomb (set to true after exploding)
    this.passable = true;
  }

  explode() { //need to run more funcs here
    this.hasExploded = true;
  }
}

// if DestroyableBlock is destroyed => appears GrassBlock OR BombPowerUp OR FirePowerUp OR SpeedPowerUp
class DestroyableBlock extends Tile { 
  constructor(x, y, spriteOffsetX, spriteOffsetY) {
    super(x, y, spriteOffsetX, spriteOffsetY);
    this.passable = false;
  }
}

/*class DestroyableBlockWithBomb extends Tile {
  constructor(x, y, spriteOffsetX, spriteOffsetY) {
    super(x, y, spriteOffsetX, spriteOffsetY);
    this.passable = false;
  }
}

class DestroyableBlockWithSpeed extends Tile {
  constructor(x, y, spriteOffsetX, spriteOffsetY) {
    super(x, y, spriteOffsetX, spriteOffsetY);
    this.passable = false;
  }
}

class DestroyableBlockWithFire extends Tile {
  constructor(x, y, spriteOffsetX, spriteOffsetY) {
    super(x, y, spriteOffsetX, spriteOffsetY);
    this.passable = false;
  }
}*/

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
    this.passable = true;
    // if block is touched by player => this.Player.bombAmount++;
  }
}

class FirePowerUp extends Tile {
  constructor(x, y, spriteOffsetX, spriteOffsetY) {
    super(x, y, spriteOffsetX, spriteOffsetY);
    this.passable = true;
    // if block is touched by player => this.Player.fireTiles++;
  }
}

class SpeedPowerUp extends Tile {
  constructor(x, y, spriteOffsetX, spriteOffsetY) {
    super(x, y, spriteOffsetX, spriteOffsetY);
    this.passable = true;
    // if block is touched by player => this.Player.MOVEMENT_SPEED++;
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