import { VElement } from "../../../../framework/VElement.js";
import { reactives } from "../../../../framework/functions.js";
import { playerList } from "../../js_modules/playerList.js";

const yes = () => {console.log("yeeee")}


reactives.push(yes)


const waitingListC = new VElement({
  tag: "span",
  content: `People waiting: ${Object.keys(playerList.players).length}`,
});


export const waitingScreenC = new VElement({
  tag: "div",
  atts: {id: 'waiting', class: 'welcomescreens'},
  children: [
    waitingListC
  ]
});

