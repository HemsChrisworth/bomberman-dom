import { VElement } from "../../../../framework/VElement.js"

export class Player { // add all player properties here, for example image, movements etc
    constructor(name) {
        this.x = 0 // have x and y randomly allocated
        this.y = 0
        this.name = name
        this.lives = 3
        this.sprite = "src/assets/images/spritesheets/spritesheet.png";
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