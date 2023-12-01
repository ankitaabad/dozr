<script lang="ts">
	import type { SvelteComponent } from 'svelte';

	// Stores
	import { getModalStore } from '@skeletonlabs/skeleton';
	import { addMondyApi } from '$lib/apis';

	// Props
	/** Exposes parent props to this component. */
	export let parent: SvelteComponent;

	const modalStore = getModalStore();

	// Form Data
	const formData = {
		amount: 0
	};

	// We've created a custom submit function to pass the response and close the modal.
	async function onFormSubmit() {
		await addMondyApi(formData.amount);
		if ($modalStore[0].response) $modalStore[0].response(formData);
		modalStore.close();
	}

	// Base Classes
	const cBase = 'card p-4 w-modal shadow-xl space-y-4 ';
	const cHeader = 'text-2xl font-bold';
	const cForm = 'space-y-4 ';
</script>

<!-- @component This example creates a simple form modal. -->

{#if $modalStore[0]}
	<div class="modal-example-form {cBase}">
		<header class={cHeader}>Add Money</header>
		<!-- Enable for debugging: -->
		<form class="modal-form {cForm}">
			<label class="label">
				<span>Enter Amount</span>
				<input class="input" type="text" bind:value={formData.amount} placeholder="Enter name..." />
			</label>
		</form>
		<!-- prettier-ignore -->
		<footer class="modal-footer border-t border-gray-200 border-solid pt-4 {parent.regionFooter}">
        <button class="btn {parent.buttonNeutral}" on:click={parent.onClose}>{parent.buttonTextCancel}</button>
        <button class="btn bg-primary-500 variant-filled-primary {parent.buttonPositive}" on:click={onFormSubmit}>Add Money</button>
    </footer>
	</div>
{/if}
