//document.getElementById('chooseName').addEventListener('submit', startWaiting);
// import { waitingScreen10secC, createWaitingScreenC, waitingTimer20secC } from "./src/components/welcomeScreenComponents/waitingScreenC.js"
// import { t10seccountdownC } from "./src/components/welcomeScreenComponents/waitingScreenC.js"


//TODO remove
function startWaiting(event) { // the function brings user to the waiting room screen
    event.preventDefault();
    document.querySelector("#welcome").style.display = "none";
    document.querySelector("#waiting").style.display = "flex";
    countdown20sec();
}

