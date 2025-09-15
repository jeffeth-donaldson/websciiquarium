// Utility functions for ASCII art manipulation

export function fillArea(width: number, height: number, char: string = ' '): string {
    // Creates a rectangular area filled with the specified character
    return Array(height).fill(char.repeat(width)).join('\n');
}

