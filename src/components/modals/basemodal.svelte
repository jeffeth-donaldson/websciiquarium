<script lang="ts">
	let { showModal = $bindable(), header, children } = $props();

	let dialog:HTMLDialogElement|undefined = $state(); // HTMLDialogElement

	$effect(() => {
		if (showModal && dialog) dialog.showModal();
	});
</script>

<!-- svelte-ignore a11y_click_events_have_key_events, a11y_no_noninteractive_element_interactions -->
<dialog
bind:this={dialog}
onclose={() => (showModal = false)}
onclick={(e) => { if (e.target === dialog) dialog.close(); }}
>
    <button aria-label="Close Dialog" autofocus onclick={() => {if (dialog) dialog.close()}}>&#10005;</button>
	<div>
		{@render header?.()}
		{@render children?.()}
		<!-- svelte-ignore a11y_autofocus -->
	</div>
</dialog>

<style>
	dialog {
		max-width: 90vw;
		border-radius: 0.2em;
		border: none;
		padding: 0;
		background: var(--bright-black);
		color: var(--bright-white);
		--link-color: var(--bright-cyan);
		--visited-link-color: var(--magenta);
	}
	dialog::backdrop {
		background: rgba(0, 0, 0, 0.3);
	}
	dialog > div {
		padding: 1em;
	}
	dialog[open] {
		animation: zoom 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
	}
	@keyframes zoom {
		from {
			transform: scale(0.95);
		}
		to {
			transform: scale(1);
		}
	}
	dialog[open]::backdrop {
		animation: fade 0.2s ease-out;
	}
	@keyframes fade {
		from {
			opacity: 0;
		}
		to {
			opacity: 1;
		}
	}
	button {
		display: block;
        margin-left: auto;
		background: var(--red);
		color: var(--bright-white);
		border: none;
	}
	button:hover {
		background: var(--bright-red);
		cursor: pointer;
	}
</style>
