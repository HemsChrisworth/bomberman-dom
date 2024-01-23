import { Player } from "../js_modules/models/playersModel";
import { playerList } from "../js_modules/playerList";

// routes the response from websocket to various functions for components

export const wsResponseRouter = {
  usersInRoom(payload) {
    onlineUserTracker.value.renderNewOnlineUser(payload);
  },
  
  registerNewPlayer(payload) {
    playerList.addPlayer(new Player(payload.data));
  }
};