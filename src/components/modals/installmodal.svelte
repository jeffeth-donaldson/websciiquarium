<script lang="ts">
    import BaseModal from './basemodal.svelte';

    export let open:Boolean = false;
</script>

<BaseModal bind:showModal={open}>
    {#snippet header()}
        <h2>How to install WebsciiQuarium</h2>
    {/snippet}
    <p>
        WebsciiQuarium is implemented as a Progressive Web App (PWA), which means you can install it on your device for a more app-like experience.
        The installation process varies depending on your browser and device, and not all browsers support PWA installation.
        Your browser may prompt you to install the app automatically; if so, simply follow the on-screen instructions.
        If you don't see a prompt, you can usually install the app manually:
    </p>
    <ul>
        <li>
            <strong>Google Chrome (Android):</strong>
            Click the three-dot menu in the top-right corner and select "Install WebsciiQuarium" or "Add to Home screen."
        </li>
        <li>
            <strong>Google Chrome (Desktop):</strong>
            Click the plus icon in the address bar or the three-dot menu in the top-right corner and select "Cast, share, and save" &gt; "Install page as app."
        </li>
        <li>
            <strong>Microsoft Edge (Desktop & Android):</strong>
            Click the three-dot menu in the top-right corner and select "Apps" &gt; "Install this site as an app."
        </li>
        <li>
            <strong>Firefox:</strong>
            Firefox does not currently support PWA installation on desktop. On Android, use the browser menu to find the "Add to Home screen" option.
        </li>
        <li>
            <strong>Safari (iOS):</strong>
            Tap the "Share" button at the bottom of the screen (the square with an arrow pointing up), then select "Add to Home Screen."
        </li>
    </ul>
    <p>
        For other browsers or devices, refer to their specific instructions for installing PWAs.
    </p>
</BaseModal>