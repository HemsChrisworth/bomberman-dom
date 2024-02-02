import { VElement } from "../../../../../framework/VElement.js";
import { mainView } from "../../../app.js";
import { getSpriteSheetXYbyIndex, spriteSheetXYtoStyleString } from "../../../utils/spriteSheetCalc.js";
import { GRASS, MAP_TILE_SIZE, SOLID, DBLOCK, BOMBPUP, FIREPUP, SPEEDPUP, SPRITE_SHEET_URL } from "../../consts/consts.js";

function setTileStyle(x, y, spriteOffsetX, spriteOffsetY) {
  const spriteSheetPosition = spriteSheetXYtoStyleString(spriteOffsetX,spriteOffsetY);
  return {
    left: `${x}px`,
    top: `${y}px`,
    ["background-image"]: `url(${SPRITE_SHEET_URL})`,
    ["background-position"]: `${spriteSheetPosition}`,
    width: `${MAP_TILE_SIZE}px`,
    height: `${MAP_TILE_SIZE}px`,
    position: "absolute"
  };
}


export class Tile {
  constructor(x, y, spriteOffsetX, spriteOffsetY) {
    this.x = x;
    this.y = y;
    this.sprite = 'src/assets/images/spritesheets/spritesheet.png';
    this.passable = false;
    this.destroyable = false;
    this.vElement = new VElement({
      tag: "div",
      style: setTileStyle(x, y, spriteOffsetX, spriteOffsetY),
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
  destroy() {
    console.log("destroy: ", this);
    this.destroyable = false;
    this.passable = true;
    const [spriteOffsetX, spriteOffsetY] = getSpriteSheetXYbyIndex(GRASS)
    const spriteSheetPosition = spriteSheetXYtoStyleString(spriteOffsetX, spriteOffsetY)
    this.vElement.setStyle(`background-position: ${spriteSheetPosition}`) // TODO - new coords for bkg-pos or animate
    //mainView.gameMap.vElement.delChild(this.vElement._vId)
  }
}

class SolidBlock extends Tile {
  constructor(x, y, spriteOffsetX, spriteOffsetY) {
    super(x, y, spriteOffsetX, spriteOffsetY);
    this.passable = false;
    this.destroyable = false;
  }
}

class GrassBlock extends Tile {
  constructor(x, y, spriteOffsetX, spriteOffsetY) {
    super(x, y, spriteOffsetX, spriteOffsetY);
    this.passable = true;
  }
}


class BombPowerUp extends DestroyableBlock {
  constructor(x, y, spriteOffsetX, spriteOffsetY) {
    super(x, y, spriteOffsetX, spriteOffsetY);
    this.powerup = BOMBPUP;
    // if block is touched by player => mainView.currentPlayer.bombAmount++;
  }

  destroy() {
    super.destroy();
    const [spriteOffsetX, spriteOffsetY] = getSpriteSheetXYbyIndex(
      this.powerup
    );
    const spriteSheetPosition = `${spriteOffsetX}px ${spriteOffsetY}px`;
    this.vElement.setStyle(`background-position: ${spriteSheetPosition}`); // TODO - new coords for bkg-pos or animate
  }
  activatePowerUp() {
    mainView.currentPlayer.bombAmount++;
  }
}

class FirePowerUp extends DestroyableBlock {
  constructor(x, y, spriteOffsetX, spriteOffsetY) {
    super(x, y, spriteOffsetX, spriteOffsetY);
    this.powerup = FIREPUP;
    // if block is touched by player => mainView.currentPlayer.fireTiles++;
  }

  destroy() {
    super.destroy();
    const [spriteOffsetX, spriteOffsetY] = getSpriteSheetXYbyIndex(
      this.powerup
    );
    const spriteSheetPosition = `${spriteOffsetX}px ${spriteOffsetY}px`;
    this.vElement.setStyle(`background-position: ${spriteSheetPosition}`); // TODO - new coords for bkg-pos or animate
    // TODO this.vElement.setStyle({background-position: getSpriteSheetXYbyIndex(index)}) - picture of the powerUp
  }
  activatePowerUp() {
    mainView.currentPlayer.fireTiles++;
  }
}

class SpeedPowerUp extends DestroyableBlock {
  constructor(x, y, spriteOffsetX, spriteOffsetY) {
    super(x, y, spriteOffsetX, spriteOffsetY);
    this.powerup = SPEEDPUP;
    // if block is touched by player => mainView.currentPlayer.MOVEMENT_SPEED++;
  }

  destroy() {
    super.destroy();
    const [spriteOffsetX, spriteOffsetY] = getSpriteSheetXYbyIndex(
      this.powerup
    );
    const spriteSheetPosition = `${spriteOffsetX}px ${spriteOffsetY}px`;
    this.vElement.setStyle(`background-position: ${spriteSheetPosition}`); // TODO - new coords for bkg-pos or animate
    // TODO this.vElement.setStyle({background-position: getSpriteSheetXYbyIndex(index)}) - picture of the powerUp
  }
  activatePowerUp() {
    mainView.currentPlayer.moveSpeed++
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