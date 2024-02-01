import { VElement } from "../../framework/VElement.js";
import { createHeaderC } from "./components/headerC.js";
import { ChatModel } from "./js_modules/models/ws/chatModel.js";
import { gameBoxModel } from "./views/gameBoxView.js";
import { GameMap } from "./js_modules/models/map/mapModel.js";
import { Player } from "./js_modules/models/playersModel.js";
import { RegisterScreenView } from "./views/registerScreenView.js";
import { WaitingScreenView } from "./views/waitingScreenView.js";

//TODO maybe move waitingScreenModel, registerScreenModel, gameBoxModel fom models to views
export class MainView {
    constructor() {
        this.HeaderC = createHeaderC();
        this.chatModel = new ChatModel;
        this.currentViewModel = new RegisterScreenView;
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
        if (this.currentViewModel instanceof RegisterScreenView) {
            return true;
        }
        return false;
    }

    showWaitingScreen = (...players) => {
        for (const player of players) {
            this.PlayerList.players[player.name] = player
            this.PlayerList.length++;
        }
        const WaitingScreenM = new WaitingScreenView(...players);
        this.vElement.replaceChild(this.currentViewChildIndex, WaitingScreenM.vElement);
        //this.vElement.replaceChild(this.currentViewModel.vElement.vId,gameBoxM.vElement);
        this.currentViewModel = WaitingScreenM;
    }

    showGameBox = (gameMapString) => {
        this.gameMap = new GameMap(gameMapString)
        const gameBoxM = new gameBoxModel(this.gameMap, this.PlayerList.players);
        this.vElement.replaceChild(this.currentViewChildIndex, gameBoxM.vElement);
        //this.vElement.replaceChild(this.currentViewModel.vElement.vId,gameBoxM.vElement);
        this.currentViewModel = gameBoxM;
        this.renderPlayers()
    }


    renderPlayers = () => {
        // Object.values(this.PlayerList.players).forEach((player) => {
        //     console.log(player.name);
        //     player.renderPlayer(gameBoxM.gameMap);
        // });
        //TODO next row is for test
        Object.values(this.PlayerList.players).forEach(player => {
            player.renderPlayer(this.gameMap)
        })
        //Object.values(this.PlayerList.players)[0].renderPlayer(this.gameMap);

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
        if (this.currentViewModel instanceof WaitingScreenView) {
            this.currentViewModel.addPlayers(...players);
        }
        //return players
    }
    delPlayers(...players) {
        for (const player of players) {
            delete this.PlayerList.players[player.name]
            this.PlayerList.length--;
        }
        if (this.currentViewModel instanceof WaitingScreenView) {
            this.currentViewModel.delPlayers(...players);
        }
    }

}