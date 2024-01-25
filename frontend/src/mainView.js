import { VElement } from "../../framework/VElement.js";
import { createGameBoxC } from "./components/gameScreenComponents/gameBoxC.js";
import { createHeaderC } from "./components/headerC.js";
import { ChatModel } from "./js_modules/models/chatModel.js";
import { gameBoxModel } from "./js_modules/models/gameBoxModel.js";
import { Player } from "./js_modules/models/playersModel.js";
import { WelcomeScreenModel } from "./js_modules/models/welcomeScreenModel.js";
import { createPlayerList } from "./js_modules/playerList.js";


export class MainView {
    constructor() {
        this.HeaderC = createHeaderC();
        this.currentViewModel = new WelcomeScreenModel;
        this.vElement = new VElement({
            tag: 'div',
            attrs: { id: "main" },
            children: [
                this.HeaderC, this.currentViewModel.welcomeScreenC
                // HeaderC, gameBoxC
                // can put chatC into this component as well so view changes don't affect the chat element
            ]
        });

        this.PlayerList = createPlayerList();
        this.chatModel = new ChatModel;
    }

    getWelcomeScreenModel() {
        if (this.currentViewModel instanceof WelcomeScreenModel) {
            return this.currentViewModel
        } else {
            throw new Error("WelcomeScreen is not available");
        }
    }

    showError = (text) => {
        this.currentViewModel.showError(text);
    }

    hideError = () => {
        this.currentViewModel.hideError();
    }

    createCurrentPlayer = (playerName) => {
        this.currentPlayer = new Player(playerName);
    }

    delCurrentPlayer = () => {
        this.currentPlayer = undefined;
    }
    addPlayer(player) {
        this.PlayerList.addPlayer(player);
        if (this.currentViewModel instanceof WelcomeScreenModel) {
            this.currentViewModel.addPlayer(player);
        }
        return player
    }
    showGameBox = () => {
        const gameBoxM = new gameBoxModel(this.currentViewModel.chatModel);
        this.vElement.delChild(this.currentViewModel.vElement.vId);
        this.vElement.addChild(gameBoxM.vElement);
        this.currentViewModel = gameBoxM;
    }
    //gameScreen
}