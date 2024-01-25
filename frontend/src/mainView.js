import { VElement } from "../../framework/VElement.js";
import { createGameBoxC } from "./components/gameScreenComponents/gameBoxC.js";
import { createHeaderC } from "./components/headerC.js";
import { ChatModel } from "./js_modules/models/chatModel.js";
import { gameBoxModel } from "./js_modules/models/gameBoxModel.js";
import { WelcomeScreenModel } from "./js_modules/models/welcomeScreenModel.js";


export class MainView {
    constructor() {
        this.HeaderC = createHeaderC();
        this.currentViewModel = new WelcomeScreenModel
        this.vElement = new VElement({
            tag: 'div',
            attrs: { id: "main" },
            children: [
                this.HeaderC, this.currentViewModel.welcomeScreenC
                // HeaderC, gameBoxC
                // can put chatC into this component as well so view changes don't affect the chat element
            ]
        });
    }

    addChatView = () => {
        const chatModel = new ChatModel;
        this.currentViewModel.vElement.addChild(chatModel.vElement);
        return chatModel;
    }

    showGameBox = () => {
        const gameBoxModel = new gameBoxModel(this.chatModel.vElement);
        this.vElement.delChild(this.currentViewModel.vElement.vId);
        this.vElement.addChild(gameBoxModel.vElement);
        this.currentViewModel = gameBoxModel;
    }
    //gameScreen
}