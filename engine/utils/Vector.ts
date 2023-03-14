class Vector {

    x: number; // x coordinate
    y: number; // y coordinate

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }
    
    add(v: Vector): Vector {
        this.x += v.x;
        this.y += v.y;
        return this;
    }

    subtract(v: Vector): Vector {
        this.x -= v.x;
        this.y -= v.y;
        return this;
    }

    
    multiply(v: Vector | number) {
        if (v instanceof Vector) {
            this.x *= v.x;
            this.y *= v.y;
        } else {
            this.x *= v;
            this.y *= v;
        }
        return this;
    }

    /**
     * distance between two vector or return its own magnitude
     */

    distance(v?: Vector): number {
        return v ? Math.sqrt((this.x - v.x) ** 2 + (this.y - v.y) ** 2) : this.magnitude();
    }

    magnitude() {
        return Math.sqrt(this.x ** 2 + this.y ** 2);
    }

    /**
     * Alias for unit vector
     */
    normalize(): Vector {
        return this.unit();
    }

    unit() {
        const magnitude = this.magnitude();
        return magnitude === 0 ?
            new Vector(0, 0) :
            new Vector(this.x / magnitude, this.y / magnitude);
    }

    serialize() {
        return { x: this.x, y: this.y };
    }

    static serialize(v: Vector) {
        return { x: v.x, y: v.y };
    }

    static dot(v1: Vector, v2: Vector) {
        return v1.x * v2.x - v1.y * v2.y;
    }

    static cross(v1: Vector, v2: Vector) {
        return v1.x * v2.y - v1.y * v2.x;
    }

    static distance(v1: Vector, v2: Vector) {
        return Math.sqrt((v2.x - v1.x) ** 2 + (v2.y - v1.y) ** 2)
    }


    static subtract(v1: Vector, v2: Vector) {
        return new Vector(v1.x - v2.x, v1.y - v2.y);
    }

    static add(v1: Vector, v2: Vector) {
        return new Vector(v1.x + v2.x, v1.y + v2.y);
    }

    static multiply(v1: Vector, v2: Vector) {
        return new Vector(v1.x * v2.x, v1.y * v2.y);
    }
}

export default Vector;