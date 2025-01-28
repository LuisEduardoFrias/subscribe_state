export function useChangeColor() {
    const randomColor = [
        '#FFC0CB', // Rosado (fresa)
        '#FFD700', // Amarillo (plátano)
        '#228B22', // Verde (brócoli)
        '#8B4513', // Marrón (chocolate)
        '#008080', // Cian (agua)
        '#FFA500', // Naranja (naranja)
        '#DA70D6', // Violeta (uva)
        '#FFFF00', // Amarillo claro (limón)
        '#FF0000', // Rojo (tomate)
        '#800080', // Púrpura (mora)
    ];
    const randolIndex = Math.floor(Math.random() * randomColor.length);
    return randomColor[randolIndex];
}
