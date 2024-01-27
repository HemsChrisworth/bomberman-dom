import { createWelcomeScreenC } from "../../components/welcomeScreenComponents/welcomeScreenC.js";
import { createErrorMessageC, createRegisterScreenC } from "../../components/welcomeScreenComponents/registerScreenC.js";
import { createPlayerC, createWaitingScreenC } from "../../components/welcomeScreenComponents/waitingScreenC.js"
import { createT10seccountdownC, createWaitingListC, createWaitingScreen10secC, createWaitingTimer20secC } from "../../components/welcomeScreenComponents/waitingScreenC.js";
import { ChatModel } from "./chatModel.js";
import { mainView } from "../../app.js";

//this object contains components that could be used in other components
export class WelcomeScreenModel {
    constructor() {
        this.welcomeScreenC = createWelcomeScreenC();
        this.errorMessageC = createErrorMessageC();
        this.registerScreenC = createRegisterScreenC(this.registerplayer, this.errorMessageC);
        this.welcomeScreenC.addChild(this.registerScreenC);
    }

    get vElement() {
        return this.welcomeScreenC
    }

    showError = (text) => {
        this.errorMessageC.content = text;
        this.errorMessageC.delClass('hide');
    }

    hideError = () => {
        this.errorMessageC.addClass('hide');
    }

    registerplayer = (playerName) => {
        this.hideError();
        mainView.createCurrentPlayer(playerName);
        mainView.chatModel.launch(playerName);
    }

    loadWaitingScreen = () => {
        this.showWaitingScreen()
        this.countdown10sec(11);
        this.countdown20sec(21);
    }
    /**
     * 
     * @param {Player} player 
     */
    addPlayers(...players) {
        for (const player of players){
            this.waitingListC.addChild(createPlayerC(player.name, player.number));
        }
    }

    delPlayers(...players) {
        const oldChildren = this.waitingListC.children;
        let newChildren = [];

        const isInPlayersList = function(playerNumber) {
            for (const player of players) {
                if (player.number === playerNumber) {
                    return true;
                }
            } 
            return false;
        }
        for (const child of oldChildren) {
            let number = child.number.attrs.id.substring(2)
            if (!isInPlayersList(number)) {
                newChildren.push(child);
            }
        }
        this.waitingListC.children = newChildren;
    }

    addChatComponent = (chatC) => {
        this.welcomeScreenC.addChild(chatC);
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

    countdown10sec = (waiting10sec) => {
        //let waiting10sec = 11; // Change to 11!
        if (waiting10sec > 0) {
            waiting10sec--;
            this.t10seccountdownC.content = waiting10sec;
            if (waiting10sec === 0) {
            } else {
                setTimeout(this.countdown10sec, 1000, waiting10sec);
            }
        }
    }


    countdown20sec = (waiting20sec) => {
        // let waiting20sec = 21; // CHANGE to 21!
        if (waiting20sec > 0) {
            waiting20sec--;
            this.waitingTimer20secC.content = waiting20sec;
            if (waiting20sec === 0) { // This function works when go to 10 sec counter, change to => (if (waiting20sec === 0) || (playerCount === 4))

                //document.querySelector("#waiting").style.display = "none";
                this.waitingScreen.setAttr({ style: 'display:none' }) // proper way



                //document.querySelector("#countdowntostart").style.display = "flex";
                this.waitingScreen10secC.setAttr({ style: "display:flex" });
                mainView.showGameBox();

                return;
            }
            setTimeout(this.countdown20sec, 1000, waiting20sec); // Schedule the next iteration after 1 second
        }
    }
}