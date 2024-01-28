import { VElement } from "../../../../framework/VElement.js"
import { mainGameMap } from "../../components/gameScreenComponents/gameBoxC.js"
import { MAP_TILE_SIZE, PLAYER_Z_INDEX } from "../consts/consts.js"

function setPlayerStyleAttrs(x, y, z) {
  const style = `left: ${x}px;
                 top: ${y}px;
                 z-index: ${z};
                 width: ${MAP_TILE_SIZE}px;
                 height: ${MAP_TILE_SIZE}px;`
  return style;
}

export class Player {
  constructor(name, number) {
      this.x = 0; // Initialize x position
      this.y = 0; // Initialize y position
      this.z = PLAYER_Z_INDEX; // Z-index for player
      this.name = name;
      this.number = number;
      this.lives = 3;
      this.sprite = "src/assets/images/spritesheets/spritesheet.png";
      this.vElement = new VElement({
          tag: "div",
          attrs: {
              class: 'player',
              style: setPlayerStyleAttrs(this.x, this.y, this.z),
          },
      });
  }

  set position([x, y]) {
      this.x = x;
      this.y = y;
      this.vElement.setAttr({style: setPlayerStyleAttrs(this.x, this.y, this.z)});
  }

  get position() {
      return [this.x, this.y];
  }

  renderPlayer() {
      mainGameMap.vElement.addChild(this.vElement);
  }
}
