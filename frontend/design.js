document.getElementById('chooseName').addEventListener('submit', startWaiting);

function startWaiting(event) { // the function brings user to the waiting room screen
    console.log("herere");
    event.preventDefault();
    document.querySelector("#welcome").style.display = "none";
    document.querySelector("#waiting").style.display = "block";
    countdown20sec();
}

let waiting20sec = 4; // CHANGE to 20!
let waiting10sec = 4; // Change to 10!

function countdown20sec() {
    if (waiting20sec > 0) {
        waiting20sec--;
        document.querySelector("#waiting20sec").innerHTML = waiting20sec;
        if (waiting20sec === 0) { // This function works when go to 10 sec counter, change to => (if (waiting20sec === 0) || (playerCount === 4))
            document.querySelector("#waiting").style.display = "none";
            document.querySelector("#countdowntostart").style.display = "block";
            countdown10sec()
            return;
        }
        setTimeout(countdown20sec, 1000); // Schedule the next iteration after 1 second
    }
}

function countdown10sec() {
    if (waiting10sec > 0) {
        waiting10sec--;
        document.querySelector("#waiting10sec").innerHTML = waiting10sec;
        if (waiting10sec === 0) {
            window.location.href = "game.html";
            return;
        }
        setTimeout(countdown10sec, 1000);
    }
}