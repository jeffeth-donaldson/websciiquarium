<script lang="ts">
    import { Fish } from '../elements/fish.js';
    import { allFish } from '../art/fish.js';
    import { onMount } from 'svelte';
    import type { FishEntity } from '../types/aquarium';
    import { AsciiField } from '../elements/ascii_field';
    import { createKelpInstance, getCastle, getSpriteDimensions, type KelpInstance } from '../elements/tank_decor.js';
    import type { TerminalColorScheme } from '../types/colors.js';
    import { choose } from '../utils/utils.js';

    let width: number = 500;
    let height: number = 1000;

    let container: HTMLDivElement;


    
    // Constants
    const title = "WebsciiQuarium";
    let content = "";
    export let colorScheme:TerminalColorScheme;
    const castle = getCastle(colorScheme);
    const castleDimensions = getSpriteDimensions(castle);
    // Figure out appropriate font size
    const IDEAL_ROW_COUNT = 60;
    const MINIMUM_FONT_SIZE = 8;
    // const COLUMN_OFFSET = 53; // For borders
    // const ROW_OFFSET = 34; // For borders
    const COLUMN_OFFSET = 0; // For borders
    const ROW_OFFSET = 0; // For borders

    let actualRowCount = 0;
    let actualColCount = 0;
    // Position for castle
    let castleX = -1;
    let castleY = -1;
    // Kelps
    let background_kelps:KelpInstance[] = [];
    let foreground_kelps:KelpInstance[] = [];
    const asciiField = new AsciiField(actualColCount, actualRowCount); 
    let fontSize = MINIMUM_FONT_SIZE;
    function fishColorSchemeToList(scheme:TerminalColorScheme):string[] {
        return [
            scheme.red, scheme.green, scheme.yellow,
            scheme.blue, scheme.magenta, scheme.cyan,
            scheme.brightRed, scheme.brightGreen, scheme.brightYellow,
            scheme.brightBlue, scheme.brightMagenta, scheme.brightCyan,
        ];
    }
    function generateKelps(max_width:number, max_height:number):KelpInstance[] {
        let kelps = [];
        for (let x = 0; x < max_width; x++) {
            if (Math.random() < 0.05) { // 5% chance to place a kelp
                const kelpHeight = Math.floor(Math.random() * max_height);
                kelps.push(createKelpInstance(x, kelpHeight, colorScheme, Math.random() > 0.5));
                // x += KELP_WIDTH // Skip width of kelp to avoid overlap
            }
        } 
        return kelps;
    }
    function updateSize() {
        if (container) {
            console.log("Container size:", container.clientWidth, container.clientHeight);
            width = container.clientWidth;
            height = container.clientHeight;
            fontSize = Math.max(MINIMUM_FONT_SIZE, Math.floor(height / IDEAL_ROW_COUNT));
            actualRowCount = Math.floor(height / fontSize)-ROW_OFFSET;
            actualColCount = Math.floor(width / (fontSize *0.54))-COLUMN_OFFSET; // Approximate character width
            asciiField.resize(actualColCount, actualRowCount);
            // Position castle somewhere near bottom center
            castleX = Math.floor(Math.max(castleDimensions.width, Math.random() * (actualColCount - castleDimensions.width)));
            castleY = actualRowCount - castleDimensions.height;
            // Generate kelps
            let kelps = generateKelps(actualColCount, actualRowCount);
            background_kelps = kelps.filter(k => k.isBackground === true);
            foreground_kelps = kelps.filter(k => k.isBackground === false);
        }
    }
    onMount(() => {
        updateSize();
        window.addEventListener('resize', updateSize);
        return () => window.removeEventListener('resize', updateSize);
    });
    
    
    // Test to make sure calculations are correct
    // $: {
    //     content = "";
    //     for (let i = 0; i < actualRowCount; i++) {
    //         if (i === 0 || i === actualRowCount - 1) {
    //             content +="@".repeat(actualColCount)+ "\n";
    //             continue;
    //         }
    //         content +="@" + "X".repeat(actualColCount-2) + "@" + "\n";
    //     }
    // }
    const FRAME_LEN = 16; // milliseconds (~60fps)
    const ONE_SECOND = 60; // 60fps
    const FISH_FREQUENCY = 5*ONE_SECOND; // Frames
    const KELP_FREQUENCY = 2*ONE_SECOND; // Frames
    let fishTimer = FISH_FREQUENCY;
    let kelpTimer = KELP_FREQUENCY;
    const fishes: FishEntity[] = [];
    const clock = setInterval(() => {
        // Start with blank canvas
        asciiField.fillArea();
        // Draw Tank Decorations
        // -- Draw Background Kelps
        let shouldKelpAnimate = false;
        kelpTimer--;
        if (kelpTimer <= 0) {
            kelpTimer = KELP_FREQUENCY;
            shouldKelpAnimate = true;
        }
        background_kelps.forEach(kelpInstance => {
            if (shouldKelpAnimate) {
                kelpInstance.currentFrame = (kelpInstance.currentFrame + 1) % kelpInstance.frames.length;
            }
            asciiField.drawArt(kelpInstance.frames[kelpInstance.currentFrame], kelpInstance.x, actualRowCount - kelpInstance.height - 1);
        });
        // -- Draw Castle
        asciiField.drawArt(castle, castleX, castleY);
        // Update Fish
        fishes.forEach(fish => {
            if (fish.direction === 'right') {
                fish.x += fish.speed;
                if (fish.x > actualColCount) {
                    // Remove fish
                    const index = fishes.indexOf(fish);
                    if (index > -1) {
                        fishes.splice(index, 1);
                    }
                }
            } else {
                fish.x -= fish.speed;
                if (fish.x + fish.art.width < 0) {
                    // Remove fish
                    const index = fishes.indexOf(fish);
                    if (index > -1) {
                        fishes.splice(index, 1);
                    }
                }
            }
            asciiField.drawArt(fish.art.getDisplayArt(fish.colors), Math.round(fish.x), Math.round(fish.y));
        });
        if (fishTimer-- <= 0) {
            fishTimer = FISH_FREQUENCY;
            // Add a new fish
            const fishIndex = Math.floor(Math.random() * allFish.length);
            const myFish = new Fish(fishIndex);
            // Random color scheme from main scheme
            const colors = choose(fishColorSchemeToList(colorScheme),7);
            const speed = Math.random() * 0.5 + 0.1; // Speed between 0.1 and 0.6
            const direction = fishIndex % 2 === 0 ? 'right' : 'left';
            const y = Math.floor(Math.random() * (actualRowCount - myFish.height));
            const x = direction === 'right' ? -myFish.width : actualColCount;
            fishes.push({ art: myFish, x, y, speed, direction, colors });
        }
        // -- Draw Foreground Kelps
        foreground_kelps.forEach(kelpInstance => {
            // debugger;
            if (shouldKelpAnimate) {
                kelpInstance.currentFrame = (kelpInstance.currentFrame + 1) % kelpInstance.frames.length;
            }
            asciiField.drawArt(kelpInstance.frames[kelpInstance.currentFrame], kelpInstance.x, actualRowCount - kelpInstance.height - 1);
        });
        content = asciiField.getContent();
        // debugger;
    }, FRAME_LEN);
</script>

<div bind:this={container} class="frame" style="font-size:{fontSize}px;" title={title}>
    <pre>{@html content}</pre>
</div>

<style>
    .frame {
        background-color: #000000;
        box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.1);
        /* border-radius: 8px; */
        width:100%;
        height:100%;
        border: 2px solid #000; 
        display: flex; 
        align-items: center; 
        justify-content: center; 
        overflow: hidden;
        font-family: monospace;
    }

</style>