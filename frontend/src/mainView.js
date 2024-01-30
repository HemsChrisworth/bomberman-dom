import { VElement } from "../../framework/VElement.js";
import { createHeaderC } from "./components/headerC.js";
import { ChatModel } from "./js_modules/models/chatModel.js";
import { gameBoxModel } from "./js_modules/models/gameBoxModel.js";
import { Player } from "./js_modules/models/playersModel.js";
import { RegisterScreenModel } from "./js_modules/models/registerScreenModel.js";
import { WaitingScreenModel } from "./js_modules/models/waitingScreenModel.js";

//TODO maybe move waiting, register, gameBox fom models to views
export class MainView {
    constructor() {
        this.HeaderC = createHeaderC();
        this.chatModel = new ChatModel;
        this.currentViewModel = new RegisterScreenModel;
        this.currentViewChildIndex = 1;
        this.vElement = new VElement({
            tag: 'div',
            attrs: { id: "main" },
            children: [
                this.HeaderC, this.currentViewModel.vElement, this.chatModel.chatC
                // HeaderC, gameBoxC
                // can put chatC into this component as well so view changes don't affect the chat element
            ],
        });

        this.PlayerList = { players: {}, length: 0 };
    }

    isInRegisterState() {
        if (this.currentViewModel instanceof RegisterScreenModel) {
            return true;
        }
        return false;
    }

    showWaitingScreen = (...players) => {
        for (const player of players) {
            this.PlayerList.players[player.name] = player
            this.PlayerList.length++;
        }
        const WaitingScreenM = new WaitingScreenModel(...players);
        this.vElement.replaceChild(this.currentViewChildIndex, WaitingScreenM.vElement);
        //this.vElement.replaceChild(this.currentViewModel.vElement.vId,gameBoxM.vElement);
        this.currentViewModel = WaitingScreenM;
    }

    showGameBox = (gameMapString) => {
        const gameBoxM = new gameBoxModel(gameMapString);
        //const gameBoxM = new gameBoxModel(baseMap, this.chatModel);//TODO keep chat as an independend child of mainView
        //TODO: make this into const gameBoxM = new gameBoxModel(this.chatModel.socket.request("startGame",'')); (not sure if 100% correct)
        this.vElement.replaceChild(this.currentViewChildIndex, gameBoxM.vElement);
        //this.vElement.replaceChild(this.currentViewModel.vElement.vId,gameBoxM.vElement);
        this.currentViewModel = gameBoxM;
        this.renderPlayers(gameBoxM)
    }


    renderPlayers = (gameBoxC) => {
        Object.values(this.PlayerList.players).forEach((player) => {
            console.log(player.name);
            player.renderPlayer(gameBoxC);
        });
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
            console.log(player)
            this.PlayerList.players[player.name] = player
            this.PlayerList.length++;
        }
        console.log("main this.addPlayers players", this.PlayerList.length)
        if (this.currentViewModel instanceof WaitingScreenModel) {
            this.currentViewModel.addPlayers(...players);
        }
        //return players
    }
    delPlayers(...players) {
        for (const player of players) {
            delete this.PlayerList.players[player.name]
            this.PlayerList.length--;
        }
        if (this.currentViewModel instanceof WaitingScreenModel) {
            this.currentViewModel.delPlayers(...players);
        }
    }

}