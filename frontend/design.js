//document.getElementById('chooseName').addEventListener('submit', startWaiting);
import { waitingScreen10secC, waitingScreenC, waitingTimer20secC } from "./src/components/welcomeScreenComponents/waitingScreenC.js"
import { t10seccountdownC } from "./src/components/welcomeScreenComponents/waitingScreenC.js"

export let waiting20sec = 21; // CHANGE to 21!
export let waiting10sec = 11; // Change to 11!

function startWaiting(event) { // the function brings user to the waiting room screen
    event.preventDefault();
    document.querySelector("#welcome").style.display = "none";
    document.querySelector("#waiting").style.display = "flex";
    countdown20sec();
}
export function countdown10sec() {
  if (waiting10sec > 0) {
    waiting10sec--;
    t10seccountdownC.content = waiting10sec;
    if (waiting10sec === 0) {
    } else {
        setTimeout(countdown10sec, 1000);
    }
  }
}


export function countdown20sec() {
    if (waiting20sec > 0) {
        waiting20sec--;
        waitingTimer20secC.content = waiting20sec;
        if (waiting20sec === 0) { // This function works when go to 10 sec counter, change to => (if (waiting20sec === 0) || (playerCount === 4))

            //document.querySelector("#waiting").style.display = "none";
            waitingScreenC.setAttr({style: 'display:none'}) // proper way



            //document.querySelector("#countdowntostart").style.display = "flex";
            waitingScreen10secC.setAttr({ style: "display:flex" });

            return;
        }
        setTimeout(countdown20sec, 1000); // Schedule the next iteration after 1 second
    }
}

