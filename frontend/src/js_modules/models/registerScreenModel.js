import { createErrorMessageC, createRegisterScreenC } from "../../components/welcomeScreenComponents/registerScreenC.js";
import { mainView } from "../../app.js";

//this object contains components that could be used in other components
export class RegisterScreenModel {
    constructor() {
        this.errorMessageC = createErrorMessageC();
        this.registerScreenC = createRegisterScreenC(this.registerPlayer, this.errorMessageC);
    }

    get vElement() {
        return this.registerScreenC
    }

    showError = (text) => {
        this.errorMessageC.content = text;
        this.errorMessageC.delClass('hide');
    }

    hideError = () => {
        this.errorMessageC.addClass('hide');
    }

    registerPlayer = (playerName) => {
        this.hideError();
        mainView.createCurrentPlayer(playerName);
        mainView.chatModel.launch(playerName);
    }
}