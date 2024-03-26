/** @format */

let oldColor: [number, number, number];

export default function RandomColor(): string {
    let color: [number, number, number] = [0, 0, 0];

    for (let i: number = 0; i < 3; i++) {
        color[i] = Math.floor(Math.random() * 225);
    }

    oldColor = color;

    return `rgb(${color[0]}, ${color[1]}, ${color[2]})`;
}
