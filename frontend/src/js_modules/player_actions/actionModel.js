import { throttle } from "../../utils/throttler.js"
import { BOMB_PLACEMENT_DELAY } from "../consts/consts.js"
import { PLAYER_DIE, PLAYER_MOVE, PLAYER_PLACE_BOMB, PLAYER_RESPAWN } from "../consts/playerActionTypes.js"
import { bombPlace, bombPlaceHandler } from "./bombPlace.js"
import { dyingHandler, playerDie, playerRespawn } from "./playerDyingRespawn.js"
import { movePlayer, movementHandler } from "./playerMovement.js"

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

export class PlayerDie extends PlayerAction {
    constructor(lives) {
        super(PLAYER_DIE);
        this.lives = lives;
    }
}
// export class PlayerRespawn extends PlayerAction {
//     constructor(coords) {
//         super(PLAYER_RESPAWN);
//         this.coords = coords;
//     }
// } use PlayerMove instead

export const playerActioner = {
    [PLAYER_MOVE]: {
        send: throttle(movePlayer, 20),
        handle: (data) => movementHandler(data.playerName, data.action.coords)
    },
    [PLAYER_PLACE_BOMB]: {
        send: throttle(bombPlace, 150),
        handle: (data) => bombPlaceHandler(data.action.coords)
    },
    [PLAYER_DIE]: {
        send: playerDie,
        handle: (data) => dyingHandler(data.playerName, data.action.lives)
    },
    [PLAYER_RESPAWN]: {
        send: playerRespawn,
        handle: (data) => movementHandler(data.playerName, data.action.coords)
    }
}