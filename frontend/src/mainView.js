import { VElement } from "../../framework/VElement.js";
import { createHeaderC } from "./components/headerC.js";
import { ChatModel } from "./js_modules/models/chatModel.js";
import { gameBoxModel } from "./js_modules/models/gameBoxModel.js";
import { renderPlayers } from "./js_modules/models/map/mapModel.js";
import { Player } from "./js_modules/models/playersModel.js";
import { RegisterScreenModel } from "./js_modules/models/registerScreenModel.js";
import { WaitingScreenModel } from "./js_modules/models/waitingScreenModel.js";


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

        this.PlayerList = {length: 0};
    }

    isInRegisterState() {
        if (this.currentViewModel instanceof RegisterScreenModel) {
            return true;
        }
        return false;
    }
 
    showWaitingScreen = (...players) => {
        for (const player of players) {
            this.PlayerList[player.name] = player
            this.PlayerList.length++;
        }
        const WaitingScreenM = new WaitingScreenModel(...players);
        this.vElement.replaceChild(this.currentViewChildIndex, WaitingScreenM.vElement);
        //this.vElement.replaceChild(this.currentViewModel.vElement.vId,gameBoxM.vElement);
        this.currentViewModel = WaitingScreenM;
    }

    showGameBox = () => {
        const gameBoxM = new gameBoxModel(this.chatModel);
        //TODO: make this into const gameBoxM = new gameBoxModel(this.chatModel.socket.request("gameStart",'')); (not sure if 100% correct)
        this.vElement.replaceChild(this.currentViewChildIndex, gameBoxM.vElement);
        //this.vElement.replaceChild(this.currentViewModel.vElement.vId,gameBoxM.vElement);
        this.currentViewModel = gameBoxM;
        renderPlayers()
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
            this.PlayerList[player.name] = player
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
            delete this.PlayerList[player.name]
            this.PlayerList.length--;
        }
        if (this.currentViewModel instanceof WaitingScreenModel) {
            this.currentViewModel.delPlayers(...players);
        }
    }

}