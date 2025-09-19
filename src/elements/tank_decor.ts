import { castle, castleColor, kelp, KELP_MIN_HEIGHT, KELP_SEGMENT_HEIGHT } from "../art/tank_decor";
import type { Pixel } from "../types/aquarium";
import type { TerminalColorScheme } from "../types/colors";

function mapColorCodeToColor(code: string, colorScheme: TerminalColorScheme): string | null {
    switch(code) {
        case 'k': return colorScheme.black;
        case 'r': return colorScheme.red;
        case 'g': return colorScheme.green;
        case 'y': return colorScheme.yellow;
        case 'b': return colorScheme.blue;
        case 'm': return colorScheme.magenta;
        case 'c': return colorScheme.cyan;
        case 'w': return colorScheme.white;
        case 'K': return colorScheme.brightBlack;
        case 'R': return colorScheme.brightRed;
        case 'G': return colorScheme.brightGreen;
        case 'Y': return colorScheme.brightYellow;
        case 'B': return colorScheme.brightBlue;
        case 'M': return colorScheme.brightMagenta;
        case 'C': return colorScheme.brightCyan;
        case 'W': return colorScheme.brightWhite;
        case ' ': return null; // Transparent
        case 'x': return null; // Erase (treat as transparent)
        default: return colorScheme.white; // Default to white if unknown
    }
}

export function getSpriteDimensions(pixels:Pixel[][]): { width: number; height: number } {
    let width = 0;
    let height = pixels.length;
    for (let i = 0; i < pixels.length; i++) {
        if (pixels[i].length > width) {
            width = pixels[i].length;
        }
    }
    return { width, height };
}

// Castle

export function getCastle(colorScheme:TerminalColorScheme): Pixel[][] {
    let pixels: Pixel[][] = [];
    const art = castle.split('\n');
    const colors = castleColor.split('\n');
    if (art.length !== colors.length) {
        console.warn(`Castle art and color lines do not match in length`);
        debugger;
    }
    for (let i=0; i < art.length; i++) {
        pixels[i] = [];
        for (let j=0; j < art[i].length; j++) {
            const char = art[i][j];
            const color = mapColorCodeToColor(colors[i][j], colorScheme);
            pixels[i][j] = { char: char, color: color };
        }
    }
    return pixels;
}

// Kelp
export interface KelpInstance {
    frames: Pixel[][][];
    x: number;
    height: number;
    currentFrame: number;
    isBackground: boolean;
}

export function createKelpInstance(x: number, height: number, colorScheme: TerminalColorScheme, isBackground: boolean): KelpInstance {
    // Create a kelp instance at position x with given height (in characters)
    const art = kelp;
    // Height must be at least KELP_MIN_HEIGHT and a multiple of KELP_SEGMENT_HEIGHT
    if (height < KELP_MIN_HEIGHT) height = KELP_MIN_HEIGHT;
    if (height % KELP_SEGMENT_HEIGHT !== 0) {
        height += KELP_SEGMENT_HEIGHT - (height % KELP_SEGMENT_HEIGHT);
    }
    const segmentCount = height / KELP_SEGMENT_HEIGHT;

    // Generate frames for swaying animation
    const frames: Pixel[][][] = [];
    // For each frame
    // debugger;
    for (let frameIndex = 0; frameIndex < art.length; frameIndex++) {
        frames[frameIndex] = [];
        // For each segment
        for (let segmentIndex = 0; segmentIndex < segmentCount; segmentIndex++) {
            let artIndex;
            if (segmentIndex === 0) {
                artIndex = segmentIndex;
            } else if (segmentIndex === segmentCount - 1) {
                artIndex = art[0].length - 1;
            } else {
                artIndex = 1;
            }
            const artLines = art[frameIndex][artIndex].split('\n');
            for (let lineIndex = 0; lineIndex < artLines.length; lineIndex++) {
                const line: Pixel[] = [];
                for (let charIndex = 0; charIndex < artLines[lineIndex].length; charIndex++) {
                    line.push({
                        char: artLines[lineIndex][charIndex],
                        color: isBackground ? mapColorCodeToColor('g', colorScheme) : mapColorCodeToColor('G', colorScheme) // Kelp is always green
                    });
                }
                frames[frameIndex].push(line);
            }
        }
    }

    return { frames, x, height, currentFrame: Math.random() > 0.5 ? 1 : 0, isBackground };
}
