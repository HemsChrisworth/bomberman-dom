import { Player } from "./models/playersModel.js"

export const playerList = {
    players: {},
    /**
     * 
     * @param {Player} player 
     */
    addPlayer(player) {
        this.players[player.name] = player
    }
}