<script lang="ts">
    import BaseModal from './basemodal.svelte';

    export let open:Boolean = false;
</script>

<BaseModal bind:showModal={open}>
    {#snippet header()}
        <h2>About WebsciiQuarium</h2>
    {/snippet}
    <p>
        WebsciiQuarium is an open-source web application that simulates an aquarium using ASCII art. 
        It is inspired by "<a href="https://github.com/cmatsuoka/asciiquarium">asciiquarium</a>" program created by Kirk Baucom, which was written in Perl.
        I created this project in order to share this gem of the CLI with those who may be unfamiliar or uncomfortable with a terminal. Whilst also adding my own spin on it.
    </p>
</BaseModal>

<style>
    a {
        color: var(--link-color);
    }
    a:visited {
        color: var(--visited-link-color); /* Use a custom variable or fallback color */
    }
</style>