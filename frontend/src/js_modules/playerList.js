import { Player } from "./models/playersModel.js"

export function createPlayerList() {
    return {
        players:  {},
        /**
         * 
         * @param {Player} player 
         */
        addPlayer(player) {
            this.players[player.name] = player
        }, 
        
        delPlayer(playerName) {
           delete this.players[playerName] 
        }
    }
}