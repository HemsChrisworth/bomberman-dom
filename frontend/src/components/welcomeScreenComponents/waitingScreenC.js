import { VElement } from "../../../../framework/VElement.js";
import { reactives } from "../../../../framework/functions.js";
import { playerList } from "../../js_modules/playerList.js";
import { countdown20sec } from "../../../design.js";
import { countdown10sec } from "../../../design.js";

const yes = () => {console.log("yeeee")}


reactives.push(yes)

const waitingListC = new VElement({
  tag: 'span',
  content: `People ready: ${Object.keys(playerList.players).length}`,
});

export const waitingTimer20secC = new VElement({ 
  tag: 'span',
  content: '20 seconds', // Should be automatically replaced if design.js file is attached correctly
  attrs: { id: 'waiting20sec' },
});

const waitingTimerC = new VElement({ 
  tag: 'span',
  content: 'Waiting...',
  children: [
    waitingTimer20secC,
  ],
});

export const t10seccountdownC = new VElement({
  tag: 'span',
  content: '10', // Should be automatically replaced if design.js file is attached correctly
  attrs: { id: 'waiting10sec' },
});

const waitingTimer10secC = new VElement({ 
  tag: 'span',
  content: 'Game starts in...',
  children: [
    t10seccountdownC,
  ],
});

export const waitingScreen10secC = new VElement({
  tag: "div",
  attrs: {id: 'countdowntostart', class: 'welcomescreens'},
  children: [
    waitingTimer10secC,
  ]
});

export const waitingScreenC = new VElement({
  tag: "div",
  attrs: {id: 'waiting', class: 'welcomescreens'},
  children: [
    waitingTimerC,
    waitingListC,
    waitingScreen10secC,
  ]
});

countdown10sec();
countdown20sec();
