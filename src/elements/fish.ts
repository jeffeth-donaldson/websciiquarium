import { allFish, allFishColors } from "../art/fish";

// Fish Class
export class Fish {
    color: string;
    art: string;
    width: number;
    height: number;

    constructor(i: number) {        
        this.color = allFishColors[i % allFishColors.length];
        this.art = allFish[i % allFish.length];
        this.width = this.art.split('\n')[1].length; // Approximate width
        this.height = this.art.split('\n').length; // Approximate height
        let color_lines = this.color.split('\n');
        let art_lines = this.art.split('\n');
        let problem = false;
        if (color_lines.length !== art_lines.length) {
            console.warn(`Fish art and color lines do not match in length for fish index ${i}`);
            // debugger;
            problem = true;
        }
        for (let j = 0; j < art_lines.length; j++) {
            if (art_lines[j].length > this.width) {
                this.width = art_lines.length;
            }
            if (art_lines[j].length !== color_lines[j].length) {
                console.warn(`Fish art (${art_lines[j].length}) and color (${color_lines[j].length}) line ${1+j} do not match in length for fish index ${i}`);
                // debugger;
                problem = true;
            }
        }
        if (problem) {
            console.warn("There be problems")
        } else {
            console.log("Is good :)")
        }
    }

    getDisplayArt(colors: string[]): string {
        // Iterates through the art of a fish and adds styled spans to match the color codes
        // debugger;
        let displayArt = '';
        let lastColor = -1;
        for (let i=0; i < this.art.length; i++) {
            const colorIndex = parseInt(this.color[i]) || -1;
            const char = this.art[i];
            // Handle end of color scenarios
            if (lastColor !== -1 && lastColor !== colorIndex) {
                displayArt += '</span>';
            }
            if (colorIndex !== -1 && colorIndex !== lastColor) {
                displayArt += `<span style="color: ${colors[(colorIndex-1) % colors.length]}">`;
            }
            lastColor = colorIndex;
            displayArt += char;
        }
        return displayArt;
    }

}