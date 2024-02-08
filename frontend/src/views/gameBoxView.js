import { animate } from "../animation/animate.js";
import { mainView } from "../app.js";
import { createGameBoxC } from "../components/gameScreenComponents/gameBoxC.js";
import { createGameTimer } from "../components/gameScreenComponents/gameBoxComponents/gameInfoPanelC.js";
import { GAME_OVER_VIEW, GAME_TIME } from "../js_modules/consts/consts.js";
import { currentEvent, endEvent } from "../js_modules/player_actions/eventModel.js";
import { listenPlayerActions } from "../js_modules/player_actions/keypresses.js";

//this object contains components that could be used in other components
export class gameBoxModel {
    constructor(gameMap, playerList) {

        if (mainView.solo) {
            this.timerC = createGameTimer();
        }
        this.gameBoxC = createGameBoxC(gameMap.vElement, playerList, this.timerC); 

        requestAnimationFrame(animate);
        listenPlayerActions();
        if (mainView.solo) {
            this.startTimer(GAME_TIME);
        }
    }

    get vElement() {
        return this.gameBoxC;
    }

    startTimer = (timer) => {
        if (timer > 0) {
            timer--;
            this.timerC.content = timer;
            if (timer === 0) {
                mainView.showScreen[GAME_OVER_VIEW]();
                endEvent(currentEvent);
            } else {
                this.timeoutID = setTimeout(this.startTimer, 1000, timer);
            }
        }
    }

    stopCountdowns() {
        clearTimeout(this.timeoutID)
    }
}