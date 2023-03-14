import Vector from "../utils/Vector";

class GameMap {
    tileSize: number;
    data: number[][];
    keys: { 
        id: number, 
        color: string
        gravity?: ReturnType<Vector['serialize']>,
        friction?: ReturnType<Vector['serialize']>
    }
    width: number | null;
    height: number | null;
    

    constructor() {
        
    }
}



export default GameMap;