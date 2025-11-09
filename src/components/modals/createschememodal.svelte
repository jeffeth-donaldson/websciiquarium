<script lang="ts">
    import type { TerminalColorScheme } from '../../types/colors';
    import { currentScheme, colorSchemes, userSchemes } from '../../utils/colors';
    import BaseModal from './basemodal.svelte';

    export let open:boolean = false;
    export let editScheme:TerminalColorScheme|null = null;

    let selected = $currentScheme;
    let userColorSchemes = $userSchemes;
    let errorMessage: string = '';
    let justOpened: boolean = false;

    // keys that represent color properties (exclude non-color fields)
    type ColorKey = Exclude<keyof TerminalColorScheme, 'name' | 'custom'>;
    const colorKeys: ColorKey[] = [
        'black','red','green','yellow','blue','magenta','cyan','white',
        'brightBlack','brightRed','brightGreen','brightYellow','brightBlue','brightMagenta','brightCyan','brightWhite'
    ];
    let customScheme: TerminalColorScheme = { ...selected, name: 'Custom Scheme' } as TerminalColorScheme;
    let customSchemeName: string = customScheme.name;
    function resetCustomScheme() {
        if (editScheme !== null) {
            customScheme = { ...editScheme} as TerminalColorScheme
            customSchemeName = customScheme.name;
        }
        else {
            customScheme = { ...selected, name: 'Custom Scheme' } as TerminalColorScheme;
            customSchemeName = customScheme.name;
        }
    }

    // initialize customScheme from selected so it's always defined
    $: if (open != justOpened) {
        justOpened = open;
        if (open) {
            if (editScheme !== null) {
            customScheme = { ...editScheme} as TerminalColorScheme
            }
            else {
                customScheme = { ...selected, name: 'Custom Scheme' } as TerminalColorScheme;
            }
            customSchemeName = customScheme.name;
            resetCustomScheme();
        }
    }

    function saveCustomScheme() {
        
        if (!customSchemeName || customSchemeName.trim() === '') {
            errorMessage = 'Scheme name cannot be empty.';
            return;
        }
        // Check for duplicate names in existing schemes        
        const allSchemes = [...colorSchemes, ...userColorSchemes];
        if (editScheme === null && allSchemes.some(scheme => scheme.name === customSchemeName.trim())) {
            errorMessage = 'A scheme with this name already exists.';
            return;
        }

        if (editScheme !== null) {
            // If editing, remove the old scheme first
            userSchemes.update((schemes) => schemes.filter(s => s.name !== editScheme?.name));
            editScheme = null;
        }
            // Save the custom scheme 
            const newScheme: TerminalColorScheme = { ...customScheme, name: customSchemeName.trim(), custom: true };
            userSchemes.update((schemes) => [...schemes, newScheme]);
                currentScheme.set(newScheme);
                open = false;
                resetCustomScheme();
    }

    // refs to the native color inputs so we can open the color picker programmatically
    const colorInputs: Record<ColorKey, HTMLInputElement | null> = {} as Record<ColorKey, HTMLInputElement | null>;

    function openColorPicker(key: ColorKey) {
        const input = colorInputs[key];
        if (input) {
            input.click();
        }
    }
</script>

<BaseModal bind:showModal={open}>
    {#snippet header()}
        <h2>Create a New Color Scheme</h2>
    {/snippet}
    <div class="error">{errorMessage}</div>
    <label for="name">Scheme Name</label>
    <input 
        id="name" 
        type="text" 
        placeholder="Scheme Name" 
        bind:value={customSchemeName} 
        />

    <div class="color-list">
        {#each colorKeys as key}
            <div class="color-scheme-option">
                <label for={key}>{key}</label>
                <div class="color-row">
                    <!-- visible swatch which opens the color picker when clicked -->
                    <div
                        class="color-swatch"
                        role="button"
                        tabindex="0"
                        on:click={() => openColorPicker(key)}
                        on:keydown={(e) => { if (e.key === 'Enter' || e.key === ' ') { openColorPicker(key); e.preventDefault(); } }}
                        style="background: {customScheme[key as ColorKey] ?? '#000'}"
                        aria-label={`Choose color for ${key}`}
                    ></div>

                    <!-- hidden native input, kept for accessibility and the browser color picker -->
                    <input
                        bind:this={colorInputs[key]}
                        id={key}
                        type="color"
                        value={customScheme[key as ColorKey] ?? '#000000'}
                        on:input={(e) => { customScheme[key as ColorKey] = (e.target as HTMLInputElement).value }}
                        aria-hidden="true"
                        tabindex="-1"
                        class="native-color-input"
                    />

                    <input
                        type="text"
                        class="hex"
                        value={customScheme[key as ColorKey] ?? '#000000'}
                        on:input={(e) => { customScheme[key as ColorKey] = (e.target as HTMLInputElement).value }}
                    />
                </div>
            </div>
        {/each}
    </div>
    <div class="button-row">
        <button class="save" on:click={() => {saveCustomScheme()}}>Save</button>
        <button class="cancel" on:click={() => {open = false; resetCustomScheme();}}>Cancel</button>
        <button class="reset" on:click={() => {resetCustomScheme()}}>Reset Changes</button>
    </div>
</BaseModal>

<style>
    .color-row {
        margin-left: 10px;
        display: flex;
        align-items: center;
        gap: 0.5em;
        margin-top: 0.2em;
    }
    .button-row {
        display: flex;
        justify-content: flex-end;
        gap: 0.5em;
        margin-top: 1em;
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
        color: var(--bright-black);
        border: none;
        font-family: monospace;
    }
    .error {
        color: var(--bright-red);
        margin-bottom: 0.5em;
    }

    /* visually hide native color input but keep it in the DOM for accessibility and picker */
    .native-color-input {
        position: absolute;
        width: 1px;
        height: 1px;
        padding: 0;
        margin: -1px;
        overflow: hidden;
        clip: rect(0 0 0 0);
        white-space: nowrap;
        border: 0;
    }

    .color-swatch {
        display: inline-block;
        width: 1.6em;
        height: 1.6em;
        border-radius: 6px;
        border: 1px solid rgba(0,0,0,0.4);
        margin-right: 0.5em;
        cursor: pointer;
        box-shadow: 0 2px 6px rgba(0,0,0,0.08);
    }
    .color-swatch:focus,
    .color-swatch:hover {
        outline: 2px solid var(--bright-cyan);
        outline-offset: 2px;
    }
    .save {
        background: var(--green);
        color: var(--bright-black);
        border: none;
    }
    .cancel {
        background: var(--red);
        color: var(--bright-black);
        border: none;
    }
    .reset {
        background: var(--yellow);
        color: var(--bright-black);
        border: none;
    }
    .save:hover {
        background: var(--bright-green);
        color: var(--bright-black);
        border: none;
    }
    .cancel:hover {
        background: var(--bright-red);
        color: var(--bright-black);
        border: none;
    }
    .reset:hover {
        background: var(--bright-yellow);
        color: var(--bright-black);
        border: none;
    }
    button:hover {
        cursor: pointer;
    }
</style>