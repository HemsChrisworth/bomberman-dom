import { draw, update } from "./movement.js";

export function animate() {
    update()
    draw();   // Draw the game state
    requestAnimationFrame(animate)
}
