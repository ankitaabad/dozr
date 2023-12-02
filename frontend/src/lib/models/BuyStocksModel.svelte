<script lang="ts">
	import type { SvelteComponent } from 'svelte';
	import { ConicGradient } from '@skeletonlabs/skeleton';
	import type { ConicStop } from '@skeletonlabs/skeleton';
	// Stores
	import { getModalStore } from '@skeletonlabs/skeleton';
	import { buyStocksApi } from '$lib/apis';

	// Props
	/** Exposes parent props to this component. */
	export let parent: SvelteComponent;

	const modalStore = getModalStore();

	// Form Data
	const formData = {
		quantity: ''
	};

	// We've created a custom submit function to pass the response and close the modal.
	let loading;
	async function onFormSubmit() {
		loading = true;
		console.log({ 'inside modal store': $modalStore });
		const { stock_id, company_name } = $modalStore[0].meta;
		await buyStocksApi(stock_id, formData.quantity, company_name);
		if ($modalStore[0].response) $modalStore[0].response(formData);
		modalStore.close();
	}

	// Base Classes
	const cBase = 'card p-4 w-modal shadow-xl space-y-4 ';
	const cHeader = 'text-2xl font-bold';
	const cForm = 'space-y-4 ';
	const conicStops: ConicStop[] = [
		{ color: 'transparent', start: 0, end: 25 },
		{ color: 'rgb(var(--on-primary))', start: 75, end: 100 }
	];
</script>

<!-- @component This example creates a simple form modal. -->

{#if $modalStore[0]}
	<div class="modal-example-form {cBase}">
		<header class={cHeader}>Quantity</header>

		<!-- Enable for debugging: -->
		<form class="modal-form {cForm}">
			<label class="label">
				<span>Enter Quantity</span>
				<input class="input" type="number" bind:value={formData.quantity} placeholder="" />
			</label>
		</form>
		<footer class="modal-footer border-t border-gray-200 border-solid pt-4 {parent.regionFooter}">
			<button class="btn rounded {parent.buttonNeutral}" on:click={parent.onClose}
				>{parent.buttonTextCancel}</button
			>
			<button
				class="btn rounded bg-primary-500 variant-filled-primary min-w-[124px] {parent.buttonPositive}"
				on:click={onFormSubmit}
			>
				{#if loading}
					<ConicGradient width="w-4" stops={conicStops} spin />
				{:else}
					Buy
				{/if}
			</button>
		</footer>
		<!-- prettier-ignore -->
	</div>
{/if}
