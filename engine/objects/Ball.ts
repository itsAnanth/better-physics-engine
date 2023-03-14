import World from "../components/World";
import Angle from "../utils/Angle";
import Logger from "../utils/Logger";
import Vector from "../utils/Vector";

class Ball {

    id: number;
    pos: Vector;
    vel: Vector;
    acc: Vector;
    radius: number;
    acceleration: number;
    elasticity: number;
    mass: number;
    maxVelocity: null | number;

    private _hasUpdateWarned: boolean;
    private _hasRenderWarned: boolean;


    static config = {
        radius: 10,
        elasticity: 1,
        mass: 25,
        acceleration: 1
    }

    constructor(
        {
            x,
            y,
            mass = Ball.config.radius,
            radius = Ball.config.radius,
            elasticity = Ball.config.elasticity,
            acceleration = Ball.config.acceleration,
            maxVelocity = null
        }: {
            x: number,
            y: number,
            mass?: number,
            radius?: number,
            elasticity?: number,
            acceleration?: number,
            maxVelocity?: number | null
        }) {
        this.pos = new Vector(x, y);
        this.vel = new Vector(0, 0);
        this.acc = new Vector(0, 0);
        this.radius = radius;
        this.mass = mass;
        this.elasticity = elasticity;
        this.acceleration = acceleration;
        this._hasUpdateWarned = false;
        this._hasRenderWarned = false;
        this.id = World.idCounter++;
        this.maxVelocity = maxVelocity;

    }

    render(ctx: CanvasRenderingContext2D) {
        if (!this._hasRenderWarned) {
            Logger.logc('yellow', 'ENGINE_OBJECT', 'render method for ball not set, using default render');
            this._hasRenderWarned = true;

        }

        ctx.beginPath();
        ctx.arc(this.pos.x, this.pos.y, this.radius, 0, Angle.toRadians(360));
        ctx.strokeStyle = "black";
        ctx.stroke();
        ctx.fillStyle = "red";
        ctx.fill();
        ctx.closePath();
    }

    update() {

        if (!this._hasUpdateWarned) {
            Logger.logc('yellow', 'ENGINE_OBJECT', `Ball object with ID ${this.id} using default update method`);
            this._hasUpdateWarned = true;

        }

        this.acc = this.acc.unit().multiply(this.acceleration);

        if (this.maxVelocity !== null) {
            if (Vector.add(this.vel, this.acc).magnitude() <= this.maxVelocity) this.vel = Vector.add(this.vel, this.acc);
        } else
            this.vel.add(this.acc);

        this.vel.multiply(1 - 0.05);

        this.pos.add(this.vel);

    }

    static collision(b1, b2) {
        return (b1.r + b2.r >= b2.pos.subtract(b1.pos).magnitude());
    }

    static penetration_resolution(b1, b2) {
        let dist = Vector.subtract(b1.pos, b2.pos);
        let pen_depth = b1.r + b2.r - dist.magnitude();
        let pen_res = dist.unit().multiply(pen_depth / (b1.inverse_mass + b2.inverse_mass));
        b1.pos = Vector.add(b1.pos, pen_res.multiply(b1.inverse_mass));
        b2.pos = Vector.add(b2.pos, pen_res.multiply(-b2.inverse_mass));
    }

    /**
     * principle -> law of conservation of momentum & kinetic energy
     * total moment before = total momentum after
     * m(a)v(a) + m(b)v(b) = m(a)v(a)' + m(b)v(b)'
     * 
     * total kinetic energey before = total kinetic energy after
     * KE = m(v^2) / 2
     * 
     * if sum of ke remains same after collision its called elastic collision
     * @param {Ball} b1
     * @param {Ball} b2
     */
    static collision_resoluion(b1, b2) {
        //collision normal vector
        let normal = b1.pos.subtract(b2.pos).unit();
        //relative velocity vector
        let relVel = b1.vel.subtract(b2.vel);
        //separating velocity - relVel projected onto the collision normal vector
        let sepVel = Vector.dot(relVel, normal);
        //the projection value after the collision (multiplied by -1)
        let new_sepVel = -sepVel * Ball.config.elasticity;

        let sepVelDiff = new_sepVel - sepVel;
        let impulse = sepVelDiff / (b1.inverse_mass + b2.inverse_mass);
        let impulseVec = normal.multiply(impulse);
        // //collision normal vector with the magnitude of the new_sepVel
        // let sepVelVec = normal.multiply(new_sepVel);

        //adding the impulse vector to the original vel. vector
        b1.vel = b1.vel.add(impulseVec.multiply(b1.inverse_mass));
        //adding its opposite to the other balls original vel. vector
        b2.vel = b2.vel.add(impulseVec.multiply(-b2.inverse_mass));
    }

}

export default Ball;
