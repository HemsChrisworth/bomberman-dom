import { VElement } from "../../../../../framework/VElement.js";

const testGameScreen = new VElement({
  tag: "img",
  attrs: {
    src: "https://img.y8.com/cloud/y8-thumbs/103/big.gif",
    style: "width: 576px; height: 384px;",
  },
});

/*const gameData = new VElement({
    tag: 'div',
    attrs: {id: 'gamedata'},
    children: [
        new VElement({
            tag: 'span',
            attrs: {class: 'gameinfo'}
        })
    ]
})*/

export const mainGameScreen = new VElement({ // here we add all the tiles of the game as VElement children
  tag: "div",
  attrs: { id: "gamescreen" },
  children: [ // tiles
    //testGameScreen
  ],
});


/*export const gamePanelC = new VElement({
    tag: 'div',
    attrs: {id: 'gamepanel'},
    children: [
        gameData,
        mainGameScreen
    ]
})*/