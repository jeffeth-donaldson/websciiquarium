<script lang="ts">
    import type { Component } from "svelte";
    import type { TerminalColorScheme } from "../types/colors";
    import Aboutmodal from "./modals/aboutmodal.svelte";
    import Colorsettingsmodal from "./modals/colorsettingsmodal.svelte";
    import Installmodal from "./modals/installmodal.svelte";

    

    export let expanded: boolean;
    export let appName: string = 'WebsciiQuarium';
    export let version: string = 'v1.0.0';


    let aboutVisible:Boolean = false;
    let colorSettingsVisible = false;
    let installVisible = false;

    const showAbout = () => {
        aboutVisible = true;
    };

    const showColorSettings = () => {
        colorSettingsVisible = true;
    };

    const showInstall = () => {
        installVisible = true;
    };


    const headerButtons: [string, Function|null|string][] = [
        ['Color Settings', showColorSettings],
        ['Install', showInstall],
        ['About', showAbout],
        ['Github', "https://github.com/jeffeth-donaldson/websciiquarium"],
        ['Blog', "https://joshtech-blog.vercel.app"],
    ];
</script>

<div
    class="header-container {expanded ? 'expanded' : ''}"
    aria-hidden={!expanded}
>
    <div class="header-content">
        <div class="header-main">
            <div class="header-title">{appName}</div>
            <div class="header-buttons">
                {#each Array.from(headerButtons) as [label, link]}
                    {#if typeof link === 'string'}
                        <a href={link}>{label}</a>

                    {:else if typeof link === 'function'}
                        <button on:click={() => link()}>
                            {label}
                        </button>
                    {/if}
                {/each}
            </div>
        </div>
        <div class="header-footer">
            Version {version} by: Joshua McClung
        </div>
    </div>
</div>
<Aboutmodal bind:open={aboutVisible}/>
<Colorsettingsmodal bind:open={colorSettingsVisible}/>
<Installmodal bind:open={installVisible}/>

<style>
    .header-container {
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        z-index: 100;
        transition: transform 0.3s cubic-bezier(.4,0,.2,1), opacity 0.3s;
        transform: translateY(-100%);
        opacity: 0;
        pointer-events: none;
    }
    .header-container.expanded {
        transform: translateY(0);
        opacity: 1;
        pointer-events: auto;
    }
    .header-content {
        display: flex;
        flex-direction: column;
        align-items: stretch;
        padding: 1rem 2rem 0.5rem 2rem;
        background: var(--bright-black);
        color: var(--bright-white);
        border-bottom-left-radius: 1rem;
        border-bottom-right-radius: 1rem;
        box-shadow: 0 4px 16px rgba(0,0,0,0.15);
        min-width: 320px;
        margin-right: 5rem;
        margin-left: 5rem;
    }
    .header-main {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 1rem;
    }
    .header-title {
        font-size: 1.7rem;
        font-weight: 700;
        letter-spacing: 0.05em;
    }
    .header-buttons {
        display: flex;
        gap: 0.5rem;
    }
    .header-buttons button,
    .header-buttons a {
        color: var(--black);
        background: var(--blue);
        border: none;
        border-radius: 0.4rem;
        padding: 0.5rem 1rem;
        font-size: 1rem;
        cursor: pointer;
        transition: background 0.2s;
        text-decoration: none;
        display: inline-block;
    }
    .header-buttons button:hover,
    .header-buttons a:hover {
        background: var(--bright-blue);
    }
    .header-footer {
        margin-top: 0.5rem;
        text-align: right;
        font-size: 0.95rem;
        opacity: 0.7;
    }

</style>
