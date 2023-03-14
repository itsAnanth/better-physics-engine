import Engine from "../engine";

const { Ball, Wall } = Engine.objects;
const { AnimationFrame } = Engine.utils;
const canvas = document.getElementById('canvas') as HTMLCanvasElement;
const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let up = false, down = false, right = false, left = false;

let max = 0;

const handleKeys = ev => {
    const state = ev.type === 'keydown';
    switch (ev.key) {
        case 'ArrowUp': case 'w':
            up = state;
            break;
        case 'a': case 'ArrowLeft':
            left = state;
            break;
        case 'd': case 'ArrowRight':
            right = state;
            break;
        case 'ArrowDown': case 's':
            down = state;
            break;
    }
}

window.addEventListener('keydown', handleKeys);
window.addEventListener('keyup', handleKeys)

const player = new Engine.objects.Ball({ x: 100, y: 100, maxVelocity: 8 });
const frame = new Engine.utils.AnimationFrame(60, render);

frame.start();

function render() {

    if (player.vel.magnitude() > max) max = player.vel.magnitude();
    console.log(max);

    player.render(ctx);


    if (up) player.acc.y -= player.acceleration;
    if (down) player.acc.y += player.acceleration;
    if (left) player.acc.x -= player.acceleration;
    if (right) player.acc.x += player.acceleration;

    if (!left && !right) {
        player.acc.x = 0;
    }
    if (!up && !down) {
        player.acc.y = 0;
    }


    player.update();

}

// import { mapData } from "./test/map.test";
// const tileSize = 16;
// let boundingX = canvas.width / 2 - 30, boundingY = canvas.height / 2 - 30;
// const keys = [
//     { id: 0, colour: '#333', solid: 0 },
//     { id: 1, colour: '#888', solid: 0 },
//     { id: 2, colour: '#555', solid: 1, bounce: 0.35 },
//     { id: 3, colour: 'rgba(121, 220, 242, 0.4)', friction: { x: 0.9, y: 0.9 }, gravity: { x: 0, y: 0.1 }, jump: 1, fore: 1 },
//     { id: 4, colour: '#777', jump: 1 },
//     { id: 5, colour: '#E373FA', solid: 1, bounce: 1.1 },
//     { id: 6, colour: '#666', solid: 1, bounce: 0 },
//     { id: 7, colour: '#73C6FA', solid: 0, script: 'change_colour' },
//     { id: 8, colour: '#FADF73', solid: 0, script: 'next_level' },
//     { id: 9, colour: '#C93232', solid: 0, script: 'death' },
//     { id: 10, colour: '#555', solid: 1 },
//     { id: 11, colour: '#0FF', solid: 0, script: 'unlock' }
// ]

// let camx = 200, camy = 200;
// let x = canvas.width / 2, y = 0;
// const ball = new Ball(canvas.width / 2, canvas.height / 2);

// const dx = ball.pos.x - canvas.width / 2;
// const dy = ball.pos.y - canvas.height / 2;
// const rect2 = {
//     x: boundingX,
//     y: boundingY,
//     w: 60,
//     h: 60
// };

// console.log(rect2)
// for (let row = 0; row < mapData.length; row++) {
//     for (let column = 0; column < mapData[row].length; column++) {
//         const current = mapData[row][column];
//         const key = keys[current];

//             const rect1 = { x: -dx + x, y: -dy + y, w: tileSize, h: tileSize };


//         ctx.beginPath();
//         ctx.fillStyle = key.colour;
//         ctx.fillRect(-dx + x, -dy + y, tileSize, tileSize);
//         ctx.closePath();

//         await wait(500)

//         console.log(rect1)

//         x += tileSize;
//     }
//     y += tileSize;
//     x = canvas.width / 2;
// }



// function wait(ms) {
//     return new Promise(res => setTimeout(res, ms));
// }

// // (async function () {
// //     for (let row = 0; row < mapData.length; row++) {
// //         for (let column = 0; column < mapData[row].length; column++) {
// //             const current = mapData[row][column];
// //             const key = keys[current];
// //             const rect1 = { x: -dx + x, y: -dy + y, w: tileSize, h: tileSize };

// //             // await wait(20);

// //             // console.log('running');

// //             ctx.beginPath();
// //             ctx.strokeRect(-dx + x, -dy + y, tileSize, tileSize)
// //             ctx.closePath();


// //             if (checkAABBCollision(rect1, rect2)) {
// //                 // Collision detected!
// //                 // this.color("green");
// //                 console.log('a')
// //             } else {
// //                 // No collision
// //                 // this.color("blue");
// //             }

// //             // ctx.beginPath();
// //             // ctx.fillStyle = key.colour;
// //             // ctx.fillRect(-dx + x, -dy + y, tileSize, tileSize);
// //             // ctx.closePath();

// //             x += tileSize;
// //         }
// //         y += tileSize;
// //         x = canvas.width / 2;
// //     }
// // })();

// ball.render(ctx);

// ctx.beginPath();
// ctx.strokeStyle = 'black';
// ctx.strokeRect(boundingX, boundingY, 30 * 2, 30 * 2);
// ctx.closePath();


// function checkAABBCollision(A, B) {
//     let AisToTheRightOfB = A.x > (B.x + B.w);
//     let AisToTheLeftOfB = (A.x + A.w) < B.x;
//     let AisAboveB = (A.y + A.h) < B.y;
//     let AisBelowB = A.y > (B.y + B.h);
//     return !(AisToTheRightOfB
//         || AisToTheLeftOfB
//         || AisAboveB
//         || AisBelowB);
// }

