import ChatC from "../../components/chatC"
import Socket from "./webSocketModel";

export class ChatModel {
    constructor() {
        this.chatC = new ChatC();
    }

    launch(playerName) {
        this.socket = new Socket
        this.socket.launchWebsocket(`/joinGame?name=${playerName}`);

    }
}