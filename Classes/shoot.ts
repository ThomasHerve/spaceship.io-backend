export class Shoot {

    angle: number;
    x: number;
    y: number;
    speed: number;
    sizeX: number;
    sizeY: number;

    constructor(angle, x, y, speed, sizeX, sizeY) {
        this.angle = angle;
        this.x = x;
        this.y = y;
        this.speed = speed;
        this.sizeX = sizeX;
        this.sizeY = sizeY;
    }
}