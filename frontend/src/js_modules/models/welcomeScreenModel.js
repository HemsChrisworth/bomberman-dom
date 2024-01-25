import { createWelcomeScreenC } from "../../components/welcomeScreenComponents/welcomeScreenC.js";
import { createRegisterScreenC } from "../../components/welcomeScreenComponents/registerScreenC.js";
import { createWaitingScreenC } from "../../components/welcomeScreenComponents/waitingScreenC.js"
import { createT10seccountdownC, createWaitingListC, createWaitingScreen10secC, createWaitingTimer20secC } from "../../components/welcomeScreenComponents/waitingScreenC.js";

//this object contains components that could be used in other components
export class WelcomeScreenModel {
    constructor() {
        this.welcomeScreenC = createWelcomeScreenC();
        this.registerScreenC = createRegisterScreenC();
        this.welcomeScreenC.addChild(this.registerScreenC);
    }

    get vElement() {
        return this.welcomeScreenC
    }

    showWaitingScreen = () => {
        this.waitingListC = createWaitingListC();
        this.waitingTimer20secC = createWaitingTimer20secC();
        this.t10seccountdownC = createT10seccountdownC();
        this.waitingScreen10secC = createWaitingScreen10secC();
        this.waitingScreen = createWaitingScreenC(this.waitingListC, this.waitingTimer20secC, this.t10seccountdownC);
        this.welcomeScreenC.delChild(this.registerScreenC.vId);
        this.welcomeScreenC.addChild(this.waitingScreen);
    }

    countdown10sec = () => {
        let waiting10sec = 11; // Change to 11!
        if (waiting10sec > 0) {
            waiting10sec--;
           this.t10seccountdownC.content = waiting10sec;
            if (waiting10sec === 0) {
            } else {
                setTimeout(this.countdown10sec, 1000);
            }
        }
    }


    countdown20sec = () => {
        let waiting20sec = 21; // CHANGE to 21!
        if (waiting20sec > 0) {
            waiting20sec--;
            this.waitingTimer20secC.content = waiting20sec;
            if (waiting20sec === 0) { // This function works when go to 10 sec counter, change to => (if (waiting20sec === 0) || (playerCount === 4))

                //document.querySelector("#waiting").style.display = "none";
                this.waitingScreen.setAttr({ style: 'display:none' }) // proper way



                //document.querySelector("#countdowntostart").style.display = "flex";
                this.waitingScreen10secC.setAttr({ style: "display:flex" });

                return;
            }
            setTimeout(this.countdown20sec, 1000); // Schedule the next iteration after 1 second
        }
    }
}