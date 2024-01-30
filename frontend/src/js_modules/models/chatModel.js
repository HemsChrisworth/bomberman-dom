import { createChatC, createChatMessageArea } from "../../components/chatC.js"
import Socket from "./webSocketModel.js";

export class ChatModel {
    constructor() {
        this.chatC = createChatC();
        this.chatMessageArea = createChatMessageArea();
        this.chatC.addChild(this.chatMessageArea);
    }
    get vElement() { return this.chatC; }

    launch(playerName) {
        this.socket = new Socket(`joinGame?name=${playerName}`);
    }

    stop(){
        this.socket.closeWebsocket();
    }

    requestServer(type, payload){
        this.socket. request(type, payload);
    }

    sendChatMessage(text){
        this.socket.request("sendMessageToChat", {content: text, dateCreate: new Date()})
    }
}