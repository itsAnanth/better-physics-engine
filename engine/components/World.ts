import Vector from "../utils/Vector";

class World {
    config: {
        gravity: ReturnType<Vector['serialize']>,
        friction: ReturnType<Vector['serialize']>
    }
    map: {

    }

    static idCounter = 0;
}

export default World;