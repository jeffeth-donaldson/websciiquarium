import type { Fish } from "../elements/fish";

export interface FishEntity {
    art: Fish
    x: number;
    y: number;
    speed: number;
    direction: 'left' | 'right';
    colors: string[];
}

export interface Pixel {
    char: string;
    color: string|null;
}