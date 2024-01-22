import { gameBoxC } from "../components/gameScreenComponents/gameBoxC.js";


export const gameScreen = new VElement({
  tag: "div",
  attrs: { class: "body" },
  children: [gameBoxC],
});
