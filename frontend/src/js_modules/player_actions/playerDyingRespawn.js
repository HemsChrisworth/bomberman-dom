import { mainView } from "../../app.js";
import { WS_REQUEST_TYPE_PLAYER_ACTION } from "../consts/consts.js";
import { PlayerDie, PlayerMove } from "./actionModel.js";
import { endEvent } from "./eventModel.js";

export function playerDieSender() {
  
  const newLives = mainView.currentPlayer.getLives();
  const playerAction = new PlayerDie(newLives);
  mainView.chatModel.socket.request(WS_REQUEST_TYPE_PLAYER_ACTION, playerAction);
}
export function playerRespawnSender(event) {
  const newPosition = mainView.currentPlayer.position;
  //console.log(`PlayerRespawn:`, event);
  const playerAction = new PlayerMove(newPosition);
  mainView.chatModel.socket.request(WS_REQUEST_TYPE_PLAYER_ACTION, playerAction);
  endEvent(event);
}

// this is for after the websocket response
/**
 * 
 * @param {string} playerName name of the current player
 * @param {number} position new number of player's lives
 * 
*/
export function playerRespawnHandler(playerName, position) {
  mainView.PlayerList.players[playerName].position = position; // in draw, it will render the newly set x and y position into the VElement
}
export function dyingHandler(playerName, lives) {
  mainView.PlayerList.players[playerName].setLives(lives); // in draw, it will render the newly set x and y position into the VElement
}
