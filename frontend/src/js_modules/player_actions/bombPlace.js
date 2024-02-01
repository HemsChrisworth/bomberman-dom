import { mainView } from "../../app.js";
import { throttle } from "../../utils/throttler.js";
import { BOMB, BOMB_PLACEMENT_DELAY, SPRITE_POS, WS_REQUEST_TYPE_PLAYER_ACTION } from "../consts/consts.js";
import { PLAYER_PLACE_BOMB } from "../consts/playerActionTypes.js";
import { Bomb } from "../models/map/tileModel.js";
import { PlaceBomb } from "./actionModel.js";

const bombPlaceThrottle = throttle(bombPlace, BOMB_PLACEMENT_DELAY) // set a delay for placing the next bomb

export function bombPlace() {
    const playerAction = new PlaceBomb(mainView.currentPlayer.position);
    mainView.chatModel.socket.request(WS_REQUEST_TYPE_PLAYER_ACTION, playerAction)
}


export function bombPlaceHandler(bombCoords) {
    const [xSprite, ySprite] = SPRITE_POS[BOMB];
    const [x, y] = bombCoords
    const bomb = new Bomb(x, y, xSprite, ySprite);
    mainView.gameMap.vElement.addChild(bomb.vElement);
}