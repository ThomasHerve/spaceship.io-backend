import { Game } from "./game";

export class Player {
    name: string;
    id: string;
    points: number;
    x: number;
    y: number;
    radius: number;
    speed: number;
    angle: number; // between 0 and 360
    ws: WebSocket;

    lastShoot = 0
    shootCooldown = 2;

    // Game reference
    game: Game;

    // Current deltaTime
    /**
     * The idea is to have the "deltaTime" of the current frame of execution, consumming it if a movement input is executed
     */
    deltaTime: number = 0;

    constructor(name: string, id: string, ws: WebSocket) {
        this.name = name;
        this.id = id;
        this.points = 0;
        this.radius = 5;
        this.speed = 100;

        this.ws = ws;
    }

    addGame(game: Game) {
        this.game = game;
    }

    canShoot(): boolean {
        let time = Date.now();
        if(time - this.lastShoot > this.shootCooldown) {
            this.lastShoot = time;
            return true;
        }
        return false;
    }

    move(angle: number) {
        /**
         * VIVE LA TRIGO LA TROISIEME TOUS CA
         */

        // Don't bother to calculate if deltaTime = 0
        if(this.deltaTime === 0) {
            return;
        }

        // Distance value depend of the deltatime and speed
        let distance = this.speed * this.deltaTime;
        // We consume the deltaTime, if the scheduler call this function before the next iteration the input is ignored
        this.deltaTime = 0;

        // x value to add to current x value
        let x = Math.cos(angle) * distance;
        // y value to add to current y value
        let y = Math.sqrt(Math.pow(distance, 2) - Math.pow(x, 2));

        // Pass them to their absolute value
        x = Math.abs(x);
        y = Math.abs(y);

        // Calculate if w and y values need to be negated
        if(angle > 90 && angle < 270) {
            x *= -1;
        }
        if(angle > 180){
            y *= -1;
        }

        // Assign it
        this.x += x;
        this.y += y;

        // Check limits of the map
        this.x = Math.min(this.game.sizeX, this.x);
        this.x = Math.max(0, this.x);
        this.y = Math.min(this.game.sizeY, this.y);
        this.y = Math.max(0, this.y);

    }


}