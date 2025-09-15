<script lang="ts">
    import Frame from './frame.svelte';
    import { Fish } from '../elements/fish.js';
    import { allFish } from '../art/fish.js';
    import { onMount } from 'svelte';
    import type { FishEntity } from '../types/aquarium';
    import { AsciiField } from '../elements/ascii_field';

    let width: number = 500;
    let height: number = 1000;

    let container: HTMLDivElement;


    
    // Constants
    const title = "WebsciiQuarium";
    let content = "";
    // Figure out appropriate font size
    const IDEAL_ROW_COUNT = 60;
    const MINIMUM_FONT_SIZE = 8;
    // const COLUMN_OFFSET = 53; // For borders
    // const ROW_OFFSET = 34; // For borders
    const COLUMN_OFFSET = 0; // For borders
    const ROW_OFFSET = 0; // For borders

    let actualRowCount = 0;
    let actualColCount = 0;
    const asciiField = new AsciiField(actualColCount, actualRowCount); 
    let fontSize = MINIMUM_FONT_SIZE;
    function updateSize() {
        if (container) {
            console.log("Container size:", container.clientWidth, container.clientHeight);
            width = container.clientWidth;
            height = container.clientHeight;
            fontSize = Math.max(MINIMUM_FONT_SIZE, Math.floor(height / IDEAL_ROW_COUNT));
            actualRowCount = Math.floor(height / fontSize)-ROW_OFFSET;
            actualColCount = Math.floor(width / (fontSize *0.54))-COLUMN_OFFSET; // Approximate character width
            asciiField.resize(actualColCount, actualRowCount);
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
    let fishTimer = FISH_FREQUENCY;
    const fishes: FishEntity[] = [];
    const clock = setInterval(() => {
        // Start with blank canvas
        asciiField.fillArea();
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
            const colors = ["red", "blue", "green", "orange", "purple", "cyan", "magenta", "yellow", "lime", "pink"];
            const speed = Math.random() * 0.5 + 0.1; // Speed between 0.1 and 0.6
            const direction = 2 % fishIndex ? 'right' : 'left';
            const y = Math.floor(Math.random() * (actualRowCount - myFish.height));
            const x = direction === 'right' ? -myFish.width : actualColCount;
            fishes.push({ art: myFish, x, y, speed, direction, colors });
        }
        content = asciiField.getContent();
        console.log(content);
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