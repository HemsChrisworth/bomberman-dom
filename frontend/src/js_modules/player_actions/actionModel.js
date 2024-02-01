import { PLAYER_MOVE, PLAYER_PLACE_BOMB } from "../consts/playerActionTypes.js"
import { bombPlaceHandler } from "./bombPlace.js"
import { movementHandler } from "./playerMovement.js"

class PlayerAction {
    constructor(type) {
        this.type = type
    }
}

export class PlayerMove extends PlayerAction {
    constructor(type, coords) {
        super(type)
        this.coords = coords
    }
}

export class PlaceBomb extends PlayerAction {
    constructor(type, coords) {
        super(type);
        this.coords = coords;
    }
}

export const playerActionHandler = {
    [PLAYER_MOVE]:(data) => movementHandler(data.playerName, data.action.coords),
    [PLAYER_PLACE_BOMB]:(data) => bombPlaceHandler(data.action.coords)
}