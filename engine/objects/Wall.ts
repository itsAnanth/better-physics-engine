import World from "../components/World";
import Logger from "../utils/Logger";
import Vector from "../utils/Vector";
import Ball from "./Ball";

class Wall {

    id: number;
    start: Vector;
    end: Vector;

    constructor(x1: number, x2: number, y1: number, y2: number) {
        this.start = new Vector(x1, x2);
        this.end = new Vector(y1, y2);

        this.id = World.idCounter++;
    }

    render(ctx: CanvasRenderingContext2D) {
        Logger.logc('yellow', 'ENGINE_OBJECT', 'render method for wall not set, using default render');

        ctx.beginPath();
        ctx.moveTo(this.start.x, this.start.y);
        ctx.lineTo(this.end.x, this.end.y);
        ctx.strokeStyle = 'black';
        ctx.stroke();
        ctx.closePath();
    }

    private unit() {
        return this.end.subtract(this.start).unit();
    }

    static closestPoint(entity: Ball, wall: Wall) {
        let start = wall.start.subtract(entity.pos);


        if (Vector.dot(wall.unit(), start) > 0)
            return wall.start;

        let end = entity.pos.subtract(wall.end);
        if (Vector.dot(wall.unit(), end) > 0)
            return wall.end;

        let distance = Vector.dot(wall.unit(), start);
        let vector = wall.unit().multiply(distance);
        return wall.start.subtract(vector);
    }

    static collision(entity: Ball, wall: Wall) {
        let closestPoint = Wall.closestPoint(entity, wall).subtract(entity.pos);
        let magnitude = closestPoint.magnitude();

        let colliding = false;

        if (entity instanceof Ball) {
            colliding = magnitude <= entity.radius;
        }

        return colliding;

    }

    static penetration_resolution(b: Ball, w: Wall) {
        let penetrationVec = b.pos.subtract(Wall.closestPoint(b, w));
        b.pos = b.pos.add(penetrationVec.unit().multiply(b.radius - penetrationVec.magnitude()))
    }

    static collision_resolution(b: Ball, w: Wall) {
        let normal = b.pos.subtract(this.closestPoint(b, w)).unit();
        let seperatingVel = Vector.dot(b.vel, normal);
        let new_seperatingVel = -seperatingVel * b.elasticity;
        let diff = seperatingVel - new_seperatingVel;
        b.vel = b.vel.add(normal.multiply(-diff));
    }
}

export default Wall;