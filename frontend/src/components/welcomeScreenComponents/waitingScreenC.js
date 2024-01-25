import { VElement } from "../../../../framework/VElement.js";
import { reactives } from "../../../../framework/functions.js";
import { playerList } from "../../js_modules/playerList.js";

const yes = () => { console.log("yeeee") }


reactives.push(yes)

export function createWaitingListC() {
  return new VElement({
    tag: 'span',
    content: `People ready: ${Object.keys(playerList.players).length}`,
  });
}

export function createWaitingTimer20secC() {
  return new VElement({
    tag: 'span',
    content: '20 seconds', // Should be automatically replaced if design.js file is attached correctly
    attrs: { id: 'waiting20sec' },
  });
}

function createWaitingTimerC(waitingTimer20secC) {
  return new VElement({
    tag: 'span',
    content: 'Waiting...',
    children: [
      waitingTimer20secC,
    ],
  });
}

export function createT10seccountdownC() {
  return new VElement({
    tag: 'span',
    content: '10', // Should be automatically replaced if design.js file is attached correctly
    attrs: { id: 'waiting10sec' },
  });
}

function createWaitingTimer10secC(t10seccountdownC) {
  return new VElement({
    tag: 'span',
    content: 'Game starts in...',
    children: [
      t10seccountdownC,
    ],
  });
}

export function createWaitingScreen10secC(t10seccountdownC) {
  return new VElement({
    tag: "div",
    attrs: { id: 'countdowntostart', class: 'welcomescreens' },
    children: [
      createWaitingTimer10secC(t10seccountdownC),
    ]
  });
}

export function createWaitingScreenC(WaitingListC, waitingTimer20secC, t10seccountdownC) {
  return new VElement({
    tag: "div",
    attrs: { id: 'waiting', class: 'welcomescreens' },
    children: [
      WaitingListC,
      createWaitingTimerC(waitingTimer20secC),
      createWaitingScreen10secC(t10seccountdownC),
    ]
  });
}


