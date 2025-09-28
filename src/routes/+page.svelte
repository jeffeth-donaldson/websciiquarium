<script lang="ts">
    import Aquarium from "../components/aquarium.svelte";
    import Header from "../components/header.svelte";
    import { currentScheme, TerminalColorSchemeToCSSVariables } from "../utils/colors";
    const logo = `                                                         
 _ _ _     _           _ _ _____             _           
| | | |___| |_ ___ ___|_|_|     |_ _ ___ ___|_|_ _ _____ 
| | | | -_| . |_ -|  _| | |  |  | | | .'|  _| | | |     |
|_____|___|___|___|___|_|_|__  _|___|__,|_| |_|___|_|_|_|
                             |__|                        `

    let headerExpanded = true;

</script>
<div style={TerminalColorSchemeToCSSVariables($currentScheme)}>
    <button class="toggle-btn" on:click={() => headerExpanded = !headerExpanded} title={headerExpanded ? "Close menu" : "Show menu"}
        >
        {#if headerExpanded}
            <span>&#10005;</span> <!-- X icon -->
        {:else}
            <span>i</span> <!-- info icon -->
        {/if}
    </button>
    
    <div class="page">
        <Header expanded={headerExpanded}/>
        <Aquarium colorScheme={$currentScheme}/>
    </div>
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
        background: var(--brightBlack);
        color: var(--white);
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
