import { VElement } from "../../../../framework/VElement.js"
import { mainGameMap } from "../../components/gameScreenComponents/gameBoxC.js"
import { MAP_TILE_SIZE } from "../consts/consts.js"

function setPlayerStyleAttrs(x, y) { // need this if we want to have animations with spritesheets
  const style = `left: ${x}px;
              top: ${y}px;
              width: ${MAP_TILE_SIZE}px;
              height: ${MAP_TILE_SIZE}px;`
  return style
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
          '@keydown': (velem, event) => {
            console.log("jeeeee")
            this.position = [60, 80]
          }
        });
    }
    set position([x, y]) {
      this.x = x
      this.y = y
      this.vElement.setAttr({style: setPlayerStyleAttrs(this.x, this.y)})
    }
    get position() {
      return [this.x, this.y]
    }
    renderPlayer() {
      mainGameMap.vElement.addChild(this.vElement)
    }
}