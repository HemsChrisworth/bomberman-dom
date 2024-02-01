import { VElement } from "../../../../../framework/VElement.js";
import { mainView } from "../../../app.js";
import { GRASS, MAP_TILE_SIZE, SOLID, DBLOCK , BOMBPUP, FIREPUP , SPEEDPUP, BOMB_EXPLOSION_TIMER, BOMB_Z_INDEX } from "../../consts/consts.js";

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

export class Bomb extends Tile {
  constructor(x, y, spriteOffsetX, spriteOffsetY) { // x and y is player's current x, y
    super(x, y, spriteOffsetX, spriteOffsetY);
    this.z = BOMB_Z_INDEX
    this.hasExploded = false; // if true, remove bomb (set to true after exploding)
    this.passable = true;
    setTimeout(this.explode, BOMB_EXPLOSION_TIMER, this.vElement.vId); // set timer for bomb to explose after placing
  }

  explode(bombvID) { //need to run more funcs here
    this.hasExploded = true;
    mainView.vElement.delChild(bombvID) // removes bomb element

    // add explosion elements
    // handle player lives and block destroying within radius
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