import { VElement } from "../../../../../framework/VElement";

export class Tile {
    constructor(x, y, sprite, passable) {
        this.x = x;
        this.y = y;
        this.sprite = sprite;
        this.passable = passable;
        this.vElement = new VElement({
            tag: 'div',
            attrs: {left: this.x, top: this.y}
        })
    }
}


class Bomb extends Tile {
    
}

class DestroyableBlock extends Tile {

}