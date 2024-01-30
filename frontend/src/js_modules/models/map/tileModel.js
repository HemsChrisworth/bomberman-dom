import { VElement } from "../../../../../framework/VElement.js";
import { DBLOCK, GRASS, MAP_TILE_SIZE, POWER_BOMB, POWER_FLAME, POWER_SPEED, SOLID } from "../../consts/consts.js";

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

class PowerupBomb extends Tile {
  constructor(x, y, spriteOffsetX, spriteOffsetY) {
    super(x, y, spriteOffsetX, spriteOffsetY);
    this.passable = false; //initial data, will change when the block is destoyed
    this.powerup = POWER_BOMB;
  }
}
class PowerupFlame extends Tile {
  constructor(x, y, spriteOffsetX, spriteOffsetY) {
    super(x, y, spriteOffsetX, spriteOffsetY);
    this.passable = false; //initial data, will change when the block is destoyed
    this.powerup = POWER_FLAME;
  }
}
class PowerupSpeed extends Tile {
  constructor(x, y, spriteOffsetX, spriteOffsetY) {
    super(x, y, spriteOffsetX, spriteOffsetY);
    this.passable = false; //initial data, will change when the block is destoyed
    this.powerup = POWER_SPEED;
  }
}


export const tileTranslator = {
  ["SOLID"]: function (x, y, spriteOffsetX, spriteOffsetY) {
    return new SolidBlock(x, y, spriteOffsetX, spriteOffsetY);
  },
  ["GRASS"]: function (x, y, spriteOffsetX, spriteOffsetY) {
    return new GrassBlock(x, y, spriteOffsetX, spriteOffsetY);
  },
  ["DBLOCK"]: function (x, y, spriteOffsetX, spriteOffsetY) {
    return new DestroyableBlock(x, y, spriteOffsetX, spriteOffsetY);
  },
  ["POWER_BOMB"]: function (x, y, spriteOffsetX, spriteOffsetY) {
    return new PowerupBomb(x, y, spriteOffsetX, spriteOffsetY);
  },
  ["POWER_FLAME"]: function (x, y, spriteOffsetX, spriteOffsetY) {
    return new PowerupFlame(x, y, spriteOffsetX, spriteOffsetY);
  },
  ["POWER_SPEED"]: function (x, y, spriteOffsetX, spriteOffsetY) {
    return new PowerupSpeed(x, y, spriteOffsetX, spriteOffsetY);
  },
};