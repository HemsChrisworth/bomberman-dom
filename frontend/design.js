//document.getElementById('chooseName').addEventListener('submit', startWaiting);
import { waitingTimer20secC } from "./src/components/welcomeScreenComponents/waitingScreenC.js"
import { t10seccountdownC } from "./src/components/welcomeScreenComponents/waitingScreenC.js"

function startWaiting(event) { // the function brings user to the waiting room screen
    event.preventDefault();
    document.querySelector("#welcome").style.display = "none";
    document.querySelector("#waiting").style.display = "flex";
    countdown20sec();
}

export let waiting20sec = 21; // CHANGE to 21!
export let waiting10sec = 11; // Change to 11!

export function countdown20sec() {
    if (waiting20sec > 0) {
        waiting20sec--;
        waitingTimer20secC.content = waiting20sec;
        if (waiting20sec === 0) { // This function works when go to 10 sec counter, change to => (if (waiting20sec === 0) || (playerCount === 4))
            document.querySelector("#waiting").style.display = "none";
            document.querySelector("#countdowntostart").style.display = "flex";
            countdown10sec()
            return;
        }
        setTimeout(countdown20sec, 1000); // Schedule the next iteration after 1 second
    }
}

export function countdown10sec() {
    if (waiting10sec > 0) {
        waiting10sec--;
        t10seccountdownC.content = waiting10sec;
        if (waiting10sec === 0) {
            //window.location.href = "game.html"; = NEEDS TO OPEN THE GAME
            return;
        }
        setTimeout(countdown10sec, 1000);
    }
}