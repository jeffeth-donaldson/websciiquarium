<script lang="ts">
    import type { TerminalColorScheme } from '../../types/colors';
    import { currentScheme, colorSchemes, userSchemes } from '../../utils/colors';
    import BaseModal from './basemodal.svelte';
    import Createschememodal from './createschememodal.svelte';

    export let open:Boolean = false;

    export let createSchemeVisible:Boolean = false;

    // keep a reactive reference so changes to the stores update the UI
    let selected: TerminalColorScheme;
    $: selected = $currentScheme;

    let userColorSchemes: TerminalColorScheme[] = [];
    $: userColorSchemes = $userSchemes;

    function selectScheme(scheme: TerminalColorScheme) {
        currentScheme.set(scheme);
        selected = scheme;
    }
</script>
<Createschememodal bind:open={createSchemeVisible} />
<BaseModal bind:showModal={open}>
    {#snippet header()}
        <h2>Color Scheme Settings</h2>
    {/snippet}
    {#each colorSchemes as scheme}
        <div class="color-scheme-option">
            <div>
                <input
                    type="radio"
                    id={scheme.name}
                    name="colorScheme"
                    value={scheme.name}
                    checked={selected.name === scheme.name}
                    on:change={() => selectScheme(scheme)}
                />
                <label for={scheme.name}>{scheme.name}</label>
            </div>
            <!-- Sample pallet of scheme colors -->
            <div class="color-row">
                {#each Object.entries(scheme) as [colorName, colorValue]}
                    {#if colorName !== 'name'}
                        <span
                            title={colorName}
                            style="background-color: {colorValue};"
                        ></span>
                    {/if}
                {/each}
            </div>
        </div>
    {/each}
    {#each userColorSchemes as scheme}
        <div class="color-scheme-option">
            <div>
                <input
                    type="radio"
                    id={scheme.name}
                    name="colorScheme"
                    value={scheme.name}
                    checked={selected.name === scheme.name}
                    on:change={() => selectScheme(scheme)}
                />
                <label for={scheme.name}>{scheme.name} (Custom)</label>
            </div>
            <!-- Sample pallet of scheme colors -->
            <div class="color-row">
                {#each Object.entries(scheme) as [colorName, colorValue]}
                    {#if colorName !== 'name'}
                        <span
                            title={colorName}
                            style="background-color: {colorValue};"
                        ></span>
                    {/if}
                {/each}
                <button on:click={() => {
                    userSchemes.update((schemes) => schemes.filter(s => s.name !== scheme.name));
                    currentScheme.set(colorSchemes[0]);
                }}>&#10005;</button>
            </div>
        </div>
    {/each}
    <button on:click={() => {createSchemeVisible=true}}>Create Custom Scheme</button>
</BaseModal>

<style>
    .color-row {
        margin-left: 10px;
    }
    .color-row span {
        border-radius: 2px;
        display:inline-block;
        width:1em;
        height:1em;
        margin-right:0.2em;
        border: 1px solid #000;
    }
    .color-scheme-option {
        display:flex;
        align-items: center;
        flex-wrap: nowrap;
        justify-content: space-between;
    }
    .color-scheme-option > * {
        white-space: nowrap;
    }
    input {
        background: var(--bright-red);
        color: var(--bright-black);
        border: none;
    }
</style>