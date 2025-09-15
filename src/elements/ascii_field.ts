// Utility class for ASCII art manipulation

import type { Pixel } from "../types/aquarium";


export class AsciiField {
    width: number;
    height: number;
    field: Pixel[][];
    
    constructor(width: number, height: number, fillChar: string = ' ') {
        this.width = width;
        this.height = height;
        this.field = [];

        this.fillArea();
    }
    
    fillArea(value: string = ' ', color: string|null = null): void {
        // Creates a rectangular area filled with the specified character
        this.field = Array.from({ length: this.height }, () =>
            Array.from({ length: this.width }, () => ({ char: value, color }))
        );
    }

    setHeight(height: number): void {
        this.height = height;
        this.fillArea();
    }

    setWidth(width: number): void {
        this.width = width;
        this.fillArea();
    }

    resize(width: number, height: number): void {
        this.width = width;
        this.height = height;
        this.fillArea();
    }

    drawArt(art: Pixel[][], x: number, y: number): void {
        // Draws ASCII art onto the field at specified (x, y) coordinates
        // debugger;
        for (let i = 0; i < art.length; i++) {
            if (y + i < 0 || y + i >= this.height) continue; // Skip rows outside the field
            for (let j = 0; j < art[i].length; j++) {
                if (x + j < 0 || x + j >= this.width) continue; // Skip columns outside the field
                const char = art[i][j].char;
                if (char !== ' ') { // Only draw non-space characters
                    if (char === 'x') { // 'x' means overwrite with space
                        this.field[y + i][x + j] = { char: ' ', color: null };
                    } else {
                        this.field[y + i][x + j] = art[i][j];
                    }
                }
            }
        }
    }

    getContent(): string {
        let content = '';
        for (let i = 0; i < this.height; i++) {
            let lastColor: string|null = null;
            for (let j = 0; j < this.width; j++) {
                const char = this.field[i][j].char;
                const color = this.field[i][j].color;
                if (lastColor && (char === ' ' || this.field[i][j].color !== lastColor))  {
                    content += '</span>';
                    lastColor = null;
                }
                if (color && color !== lastColor) {
                    content += `<span style="color: ${color}">`;
                    lastColor = color;
                }
                content += this.field[i][j].char;
            }
            content += '\n';
        }
        return content;
    }

}

