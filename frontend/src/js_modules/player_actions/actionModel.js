import { throttle } from "../../utils/throttler.js"
import { BOMB_PLACEMENT_DELAY } from "../consts/consts.js"
import { PLAYER_MOVE, PLAYER_PLACE_BOMB } from "../consts/playerActionTypes.js"
import { bombPlace, bombPlaceHandler } from "./bombPlace.js"
import { getNewPlayerPosition, movementHandler } from "./playerMovement.js"

class PlayerAction {
    constructor(type) {
        this.type = type
    }
}

export class PlayerMove extends PlayerAction {
    constructor(coords) {
        super(PLAYER_MOVE)
        this.coords = coords
    }
}

export class PlaceBomb extends PlayerAction {
    constructor(coords) {
        super(PLAYER_PLACE_BOMB);
        this.coords = coords;
    }
}

export const playerActioner = {
    [PLAYER_MOVE]: {
        send: (currentAction) => throttle(getNewPlayerPosition, 20)(currentAction),
        handle: (data) => movementHandler(data.playerName, data.action.coords)
    },
    [PLAYER_PLACE_BOMB]: {
        send: () => throttle(bombPlace, BOMB_PLACEMENT_DELAY)(),
        handle: (data) => bombPlaceHandler(data.action.coords)
    },
}