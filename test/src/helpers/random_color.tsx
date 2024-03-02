let previousColor: string = "";

export default function RandomColor(): string {
  const colors: string[] = [
    "red",
    "blue",
    "green",
    "yellow",
    "black",
    "white",
    "pink",
    "orange",
    "purple",
    "brown"
  ];

  let randomIndex: number;
  do {
    randomIndex = Math.floor(Math.random() * colors.length);
  } while (colors[randomIndex] === previousColor);

  previousColor = colors[randomIndex];
  return colors[randomIndex];
}