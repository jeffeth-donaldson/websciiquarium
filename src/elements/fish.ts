import { allFish, allFishColors } from "../art/fish";
import type { Pixel } from "../types/aquarium";

// Fish Class
export class Fish {
    color: string[];
    art: string[];
    width: number;
    height: number;

    constructor(i: number) {        
        this.color = allFishColors[i % allFishColors.length].split('\n');
        this.art = allFish[i % allFish.length].split('\n');
        this.width = this.art[1].length; // Approximate width
        this.height = this.art.length; // Approximate height
        
        let problem = false;
        if (this.color.length !== this.art.length) {
            console.warn(`Fish art and color lines do not match in length for fish index ${i}`);
            // debugger;
            problem = true;
        }
        for (let j = 0; j < this.art.length; j++) {
            if (this.art[j].length > this.width) {
                this.width = this.art.length;
            }
            if (this.art[j].length !== this.color[j].length) {
                console.warn(`Fish art (${this.art[j].length}) and color (${this.color[j].length}) line ${1+j} do not match in length for fish index ${i}`);
                // debugger;
                problem = true;
            }
        }
        if (problem) {
            console.warn("There be problems")
        }
    }

    getDisplayArt(colors: string[]): Pixel[][] {
        // Iterates through the art of a fish and adds styled spans to match the color codes
        // debugger;
        let pixels: Pixel[][] = [];
        for (let i=0; i < this.art.length; i++) {
            pixels[i] = [];
            for (let j=0; j < this.art[i].length; j++) {
                const colorIndex = parseInt(this.color[i][j]) || -1;
                const char = this.art[i][j];
                pixels[i][j] = { char: char, color: (colorIndex >= 0) ? colors[colors.length%colorIndex] : null };
            }
            
        }
        return pixels;
    }

}