<script lang="ts">
    import type { Component } from "svelte";
    import type { TerminalColorScheme } from "../types/colors";
    import Aboutmodal from "./modals/aboutmodal.svelte";

    

    export let expanded: boolean;
    export let colors: TerminalColorScheme;
    export let appName: string = 'WebsciiQuarium';
    export let version: string = 'v1.0.0';


    let aboutVisible:Boolean = false;
    let showSettings = false;
    let showInstall = false;

    const showAbout = () => {
        aboutVisible = true;
    };


    const headerButtons: [string, Function|null|string][] = [
        ['Settings', null],
        ['Install', null],
        ['About', showAbout],
        ['Github', "https://github.com/jeffeth-donaldson/websciiquarium"],
        ['Blog', "https://joshtech-blog.vercel.app"],
    ];
</script>

<div
    class="header-container {expanded ? 'expanded' : ''}"
    style="--header-bg: {colors.brightBlack}"
    aria-hidden={!expanded}
>
    <div class="header-content" style="color: {colors.brightWhite}">
        <div class="header-main">
            <div class="header-title">{appName}</div>
            <div class="header-buttons">
                {#each Array.from(headerButtons) as [label, link]}
                    {#if typeof link === 'string'}
                        <a href={link} style="color: {colors.brightWhite}">{label}</a>

                    {:else if typeof link === 'function'}
                        <button style="color: {colors.brightWhite}" on:click={() => link()}>
                            {label}
                        </button>
                    {/if}
                {/each}
            </div>
        </div>
        <div class="header-footer">
            Version {version}
        </div>
    </div>
</div>
<Aboutmodal bind:open={aboutVisible} colorScheme={colors}/>

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
        background: var(--header-bg);
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
        background: rgba(255,255,255,0.08);
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
        background: rgba(255,255,255,0.18);
    }
    .header-footer {
        margin-top: 0.5rem;
        text-align: right;
        font-size: 0.95rem;
        opacity: 0.7;
    }

</style>
