import { VElement } from "../../framework/VElement.js";
import { createGameBoxC } from "./components/gameScreenComponents/gameBoxC.js";
import { createHeaderC } from "./components/headerC.js";
import { ChatModel } from "./js_modules/models/chatModel.js";
import { gameBoxModel } from "./js_modules/models/gameBoxModel.js";
import { Player } from "./js_modules/models/playersModel.js";
import { WelcomeScreenModel } from "./js_modules/models/welcomeScreenModel.js";


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

        this.PlayerList = {};
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
    addPlayers(...players) {
        for (const player of players) {
            this.PlayerList[player.name] = player
        }
        if (this.currentViewModel instanceof WelcomeScreenModel) { // TODO maybe has to work with other view models
            this.currentViewModel.addPlayers(...players);
        }
        //return players
    }
    delPlayers(...players) {
        for (const player of players) {
            delete this.PlayerList[player.Name]
        }
        if (this.currentViewModel instanceof WelcomeScreenModel) {
            this.currentViewModel.delPlayers(...players);
        }
    }

    showGameBox = () => {
        const gameBoxM = new gameBoxModel(this.chatModel);
        this.vElement.delChild(this.currentViewModel.vElement.vId);
        this.vElement.addChild(gameBoxM.vElement);
        this.currentViewModel = gameBoxM;
    }
    //gameScreen
}