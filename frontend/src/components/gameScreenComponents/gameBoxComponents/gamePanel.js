import { VElement } from "../../../../../framework/VElement.js";

const gameData = new VElement({
    tag: 'div',
    attrs: {id: 'gamedata'},
    children: [
        new VElement({
            tag: 'span',
            attrs: {class: 'gameinfo'}
        })
    ]
})

const gameScreen = new VElement({
  tag: "div",
  attrs: { id: "gamescreen" },
  children: [
    new VElement({
      tag: "img",
      attrs: { src: "https://img.y8.com/cloud/y8-thumbs/103/big.gif", style: "width: 576px; height: 384px;" },
    }),
  ],
});


export const gamePanelC = new VElement({
    tag: 'div',
    attrs: {id: 'gamepanel'},
    children: [
        gameData,
        gameScreen
    ]
})