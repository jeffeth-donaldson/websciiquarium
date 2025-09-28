<script lang="ts">
    import type { TerminalColorScheme } from '../../types/colors';
    import { currentScheme } from '../../utils/colors';
    import { colorSchemes } from '../../utils/colors';
    import BaseModal from './basemodal.svelte';

    export let open:Boolean = false;

    let selected = $currentScheme;

    function selectScheme(scheme: TerminalColorScheme) {
        currentScheme.set(scheme);
        selected = scheme;
    }
</script>

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