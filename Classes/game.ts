import { Asteroid } from "./asteroid";
import { Player } from "./player";
import { Shoot } from "./shoot";

export class Game {
    /**
     * Public attributes
     */
    gameRunning = true;
    sizeX: number;
    sizeY: number;

    /**
     * Privates attributes
     */
    players: Player[] = [];
    disconnectedPlayers: Player[] = [];
    shoots: Shoot[] = [];
    asteroids: Asteroid[] = [];

    constructor(sizeX, sizeY) {
        this.sizeX = sizeX;
        this.sizeY = sizeY;
    }

    public addPlayer(player: Player) {
        // Check if disconnected
        let disconnected = this.disconnectedPlayers.find((playerDisconnected)=>{
            return player.id === playerDisconnected.id
        })
        if(disconnected != undefined) {
            // Remove disconnected player
            this.disconnectedPlayers = this.players.filter((element)=>{
                return element.id != player.id;
            })
            // Add it to current players
            this.players.push(disconnected);
        } else {
            player.addGame(this);
            this.players.push(player);
        }
    }

    public removePlayer(player: Player) {
        this.players = this.players.filter((element)=>{
            return element.id != player.id;
        })
        this.disconnectedPlayers.push(player);
    }

    public executeStep(deltaTime: number) {
        /**
         * This is the main game loop
         */
        
        /**
         * Give a deltaTime to all players 
         */
         this.players.forEach(player => {
            player.deltaTime = deltaTime;
         })

        /**
         * Players : Just send to all player the updated values
         */
         this.players.forEach(player => {
            let dataToSend = JSON.stringify({
                "type": "player",
                "x": player.x,
                "y": player.y,
                "name": player.name
            })
            this.players.forEach(playerToSend => {
                playerToSend.ws.send(dataToSend);
            });
         });

        /** 
        * Shoots: Compute new position here then collisions then send is to all players
        * If collision: destroy actors 
        */

        /**
         * Asteroid: compute collision with player only
         */

        /**
         * Check if we respawn an asteroid and respawn it
         */

    }

    public playerShoot(player: Player) {
        // TODO, spawn a shoot
    }
}