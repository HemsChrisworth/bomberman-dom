import { Player } from "../js_modules/models/playersModel.js";
import { playerList } from "../js_modules/playerList.js";

// routes the response from websocket to various functions for components

export const wsResponseRouter = {
  usersInRoom(payload) {
    //TODO show users list
    console.log("handle usersInRoom message with payload:", payload);
    onlineUserTracker.value.renderNewOnlineUser(payload);
  },
  
  registerNewPlayer(payload) {
    playerList.addPlayer(new Player(payload.data));
  },

  sendMessageToChat(payload) {
    //TODO
  },

  playerAction(payload) {
    //TODO
  },
  
  inputChatMessage(payload) {
    //TODO
  },
};
