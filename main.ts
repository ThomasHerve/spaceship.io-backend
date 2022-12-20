import { WebSocketServer } from 'ws';
import { Game } from './Classes/game';
import { Player } from './Classes/player';

/**
 * Main server websocket
 */

 const wss = new WebSocketServer({
    port: 8080
})


/**
 * Main object to work on
 */
let ids = [];
const game:Game = new Game(1000,1000);

/**
 * Called when a new user connect
 */
wss.on('connection', (ws)=>{
    
    let connected = false;
    let player = undefined;

    ws.on('close', ()=>{
        /**
         * TODO: Handle disconnection
         */
    })

    ws.on('message', (data)=>{
        if(!connected) {
            if(data.type === "connect" && checkConnection(data)) {
                player = new Player(data.name, data.id, ws)
                game.addPlayer(player);
                connected = true;
            }
        } else {
            if(data.type == "angle" && checkAngle(data)) {
                player.angle = data.value;
            }
            else if(data.type == "shoot" && checkShoot(data)) {
                game.playerShoot(player);
            }
            else if(data.type == "move" && checkMove(data)) {
                player.move(data.angle);
            }
        }
    })
})

/**
 * Initialisation
 */

if(process.argv.length < 3) {
    console.log("Wrong number of argument, aborting...")
    process.exit();
} else {

    /**
     * Handle args
     */
    ids = process.argv.slice(2, undefined);

    /**
     * Main game loop
     */
    let time = Date.now();
    while(game.gameRunning) {
        /**
         * Handle time between two frames
         */
        let newTime = Date.now();
        let deltaTime = newTime - time;
        time = newTime;
        
        /**
         * Call main loop execution
         */
        game.executeStep(deltaTime);

    }

}


/**
 * Defensive functions
 */

function checkConnection(packet): boolean {
    // TODO
    return true
}

function checkAngle(packet): boolean {
    // TODO
    return true;
}

function checkShoot(data): boolean {
    // TODO
    return true;
}

function checkMove(data): boolean {
    // TODO
    return true;
}