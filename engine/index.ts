import GameMap from "./components/GameMap";
import World from "./components/World";
import Ball from "./objects/Ball";
import Wall from "./objects/Wall";
import Angle from "./utils/Angle";
import AnimationFrame from "./utils/AnimationFrame";
import Vector from "./utils/Vector";


export class Engine {
    static World = World;
    static GameMap = GameMap;
    static objects = {
        Ball,
        Wall
    }
    static utils = {
        Vector,
        Angle,
        AnimationFrame
    }
}

export default Engine;