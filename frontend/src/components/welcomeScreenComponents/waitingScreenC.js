import { VElement } from "../../../../framework/VElement.js";
import { reactives } from "../../../../framework/functions.js";

const yes = () => { console.log("yeeee") }


reactives.push(yes)

export function createPlayerC(playerName, playerNumber){
  return new VElement({
    tag: 'p',
    attrs: {id: `pl${playerNumber}`},
    content: `${playerNumber} -- ${playerName}`,
  }); 
}
export function createWaitingListC() {
  return new VElement({
    tag: 'span',
    content: `People ready: `,
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

export function createWaitingScreenC(waitingListC, waitingTimer20secC, t10seccountdownC) {
  return new VElement({
    tag: "div",
    attrs: { id: 'waiting', class: 'welcomescreens' },
    children: [
      waitingListC,
      createWaitingTimerC(waitingTimer20secC),
      createWaitingScreen10secC(t10seccountdownC),
    ]
  });
}


