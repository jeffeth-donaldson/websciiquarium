<script lang="ts">
    import Aquarium from "../components/aquarium.svelte";
    import Header from "../components/header.svelte";
    import { Fish } from "../elements/fish";
    import type { TerminalColorScheme } from "../types/colors";
    const logo = `                                                         
 _ _ _     _           _ _ _____             _           
| | | |___| |_ ___ ___|_|_|     |_ _ ___ ___|_|_ _ _____ 
| | | | -_| . |_ -|  _| | |  |  | | | .'|  _| | | |     |
|_____|___|___|___|___|_|_|__  _|___|__,|_| |_|___|_|_|_|
                             |__|                        `

    const colors:TerminalColorScheme =  {
        name: "Default",
        black: "#000000",
        red: "#FF5555",
        green: "#50FA7B",
        yellow: "#F1FA8C",
        blue: "#BD93F9",
        magenta: "#FF79C6",
        cyan: "#8BE9FD",
        white: "#BFBFBF",
        brightBlack: "#4D4D4D",
        brightRed: "#FF6E67",
        brightGreen: "#5AF78E",
        brightYellow: "#F4F99D",
        brightBlue: "#CAA9FA",
        brightMagenta: "#FF92D0",
        brightCyan: "#9AEDFE",
        brightWhite: "#E6E6E6",
    };

    let headerExpanded = true;

</script>

<button class="toggle-btn" on:click={() => headerExpanded = !headerExpanded} title={headerExpanded ? "Close info" : "Show info"}
    style="background: {colors.brightBlack}; color: {colors.white};"
    >
    {#if headerExpanded}
        <span>&#10005;</span> <!-- X icon -->
    {:else}
        <span>i</span> <!-- info icon -->
    {/if}
</button>

<div class="page">
    <Header colors={colors} expanded={headerExpanded}/>
    <Aquarium colorScheme={colors}/>
</div>
<style>
    .page {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        height: 100vh;
        background-color: #e0f7fa;
        font-family: 'Courier New', Courier, monospace;
        padding: 0px;
    }

    button {
        font-family: 'Courier New', Courier, monospace;
    }

    .toggle-btn {
        position: fixed;
        top: 16px;
        right: 16px;
        z-index: 1000;
        border: none;
        border-radius: 50%;
        width: 36px;
        height: 36px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 1.5rem;
        cursor: pointer;
        opacity: 0.2;
        transition: opacity 0.2s, background 0.2s;
        box-shadow: 0 2px 8px rgba(0,0,0,0.08);
    }
    .toggle-btn:hover {
        opacity: 1;
    }
</style>
