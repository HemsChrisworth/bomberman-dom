import { VElement } from "../../../../framework/VElement.js";
import { createGameInfoPanelC } from "./gameBoxComponents/gameInfoPanelC.js";

export function createGameBoxC(gameMapVElement, playerList, timer) {
  return new VElement({
    // the whole div of all game stuff
    tag: "div",
    attrs: { id: "game" },
    children: [
      createGameInfoPanelC(playerList, timer), // the panel of game info
      gameMapVElement, // the game itself
    ],
  });
}
