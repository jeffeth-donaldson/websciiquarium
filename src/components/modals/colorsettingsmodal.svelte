<script lang="ts">
    import type { TerminalColorScheme } from '../../types/colors';
    import { currentScheme, colorSchemes, userSchemes } from '../../utils/colors';
    import BaseModal from './basemodal.svelte';
    import Createschememodal from './createschememodal.svelte';

    export let open:boolean = false;

    export let createSchemeVisible:Boolean = false;

    let editScheme: TerminalColorScheme|null = null;

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
<Createschememodal bind:open={createSchemeVisible} bind:editScheme={editScheme} />
<BaseModal bind:showModal={open}>
    {#snippet header()}
        <h2>Color Scheme Settings</h2>
    {/snippet}
    {#each colorSchemes as scheme}
        <div class="color-scheme-option">
            <div>
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
            <span class="spacer"></span>
        </div>
    {/each}
    {#each userColorSchemes as scheme}
        <div class="color-scheme-option">
            <div>
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
                        {#if colorName !== 'name' && colorName !== 'custom'}
                            <span
                                title={colorName}
                                style="background-color: {colorValue};"
                            ></span>
                        {/if}
                    {/each}
                </div>
            </div>
            <button class="delete" on:click={() => {
                userSchemes.update((schemes) => schemes.filter(s => s.name !== scheme.name));
                currentScheme.set(colorSchemes[0]);
            }}>&#10005;</button>
            <button class="edit" on:click={() => {
                editScheme = scheme;
                createSchemeVisible = true;
            }}>Edit</button>
        </div>
    {/each}
    <button class="create" on:click={() => {editScheme=null; createSchemeVisible=true;}}>Create Custom Scheme</button>
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
    .spacer {
        flex-grow: 1;
    }
    input {
        background: var(--bright-red);
        color: var(--bright-black);
        border: none;
    }
    .delete {
        background: var(--red);
        color: var(--bright-white);
        border: none;
        border-radius: 4px;
        padding: 0.2em 0.5em;
        cursor: pointer;
    }
    .delete:hover {
        background: var(--bright-red);
    }
    .edit {
        background: var(--yellow);
        color: var(--bright-black);
        border: none;
        border-radius: 4px;
        padding: 0.2em 0.5em;
        cursor: pointer;
        margin-left: 0.5em;
    }
    .edit:hover {
        background: var(--bright-yellow);
    }
    .create {
        background: var(--green);
        color: var(--bright-black);
        border: none;
        border-radius: 4px;
        padding: 0.4em 0.8em;
        cursor: pointer;
        margin-top: 1em;
    }
    .create:hover {
        background: var(--bright-green);
    }
</style>