import ChatC from "../../components/chatC.js"
import Socket from "./webSocketModel.js";

export class ChatModel {
    constructor() {
        this.chatC = new ChatC();
    }

    launch(playerName) {
        this.socket = new Socket
        this.socket.launchWebsocket(`/joinGame?name=${playerName}`);

    }
}