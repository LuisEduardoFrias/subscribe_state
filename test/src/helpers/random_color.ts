/** @format */

let previousColor: string = "";

export default function RandomColor(): string {
	const colors: string[] = [
		"#d90000fb",
		"#0000ff",
		"#00ec00",
		"#ffff00",
		"#000000",
		"#ffffff",
		"#f8002b",
		"#f86e00",
		"#800080",
		"#a52a2a"
	];

	let randomIndex: number;
	do {
		randomIndex = Math.floor(Math.random() * colors.length);
	} while (colors[randomIndex] === previousColor);

	previousColor = colors[randomIndex];
	return colors[randomIndex];
}
