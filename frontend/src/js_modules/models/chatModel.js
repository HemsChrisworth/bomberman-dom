import { createChatC, createChatMessageArea } from "../../components/chatC.js"
import Socket from "./webSocketModel.js";

export class ChatModel {
    constructor() {
        this.chatC = createChatC();
        this.chatMessageArea = createChatMessageArea();
        this.chatC.addChild(this.chatMessageArea);
    }

    launch(playerName) {
        this.socket = new Socket
        this.socket.launchWebsocket(`joinGame?name=${playerName}`);
    }
}