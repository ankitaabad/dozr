<script lang="ts">
	import type { ConicStop } from '@skeletonlabs/skeleton';
	import { ConicGradient } from '@skeletonlabs/skeleton';
	import type { SvelteComponent } from 'svelte';
// Stores
	import { sellMFApi } from '$lib/apis';
	import { getModalStore } from '@skeletonlabs/skeleton';

	// Props
	/** Exposes parent props to this component. */
	export let parent: SvelteComponent;

	const modalStore = getModalStore();
	let quantity = 0;

	$: required = quantity * $modalStore[0]?.meta.price || 0;
	// $: orderMsg = quantity ? `${required.toLocaleString('en-in')} will be deducted from your a/c` : ''
	
	const price = $modalStore[0]?.meta?.price?.toLocaleString('en-in');
	const availableMFs = $modalStore[0]?.meta.quantity;
	console.log('inside meta vale', $modalStore[0]?.meta);
	$: enoughMFs = availableMFs >= quantity;

	// We've created a custom submit function to pass the response and close the modal.
	let loading;
	async function onFormSubmit() {
		loading = true;
		console.log({ 'inside modal store': $modalStore });
		const {  mf_id,  fund_name } = $modalStore[0].meta;
		await sellMFApi(mf_id, quantity, fund_name);
		if ($modalStore[0].response) $modalStore[0].response(quantity);
		modalStore.close();
	}

	// Base Classes
	const cBase = 'card p-4 w-modal shadow-xl   ';
	const cHeader = 'text-2xl font-bold mb-4';
	const cForm = 'space-y-4 ';
	const conicStops: ConicStop[] = [
		{ color: 'transparent', start: 0, end: 25 },
		{ color: 'rgb(var(--on-primary))', start: 75, end: 100 }
	];
</script>

<!-- @component This example creates a simple form modal. -->

{#if $modalStore[0]}
	<div class="modal-example-form w-96 {cBase}">
		<header class={cHeader}>Sell Mutual Funds</header>
		<div class="font-semibold mb-3 mt-2">{$modalStore[0]?.meta.fund_name}</div>
		<!-- Enable for debugging: -->
		<form class="modal-form {cForm}">
			<label class="label">
				<span>Enter Quantity</span>
				<input class="input" type="number" bind:value={quantity} placeholder="" />
			</label>
			<label class="label">
				<span>Price</span>
				<input class="input" type="number" value={price} disabled placeholder="" />
			</label>
		</form>
		<div class="mt-24">
			{#if !enoughMFs}
				<div class="bg-orange-100 text-orange-950 p-1 text-sm rounded-sm mb-3 text-center">
					Not enough units of MF to sell.
				</div>
			{/if}
			<!-- <div class="text-sm text-center text-gray-500 mb-3">
				Order will be executed at ₹2,325.00 or lower price
			</div> -->
		</div>
		<div
			class="mb-2 pt-3 flex justify-between items-center text-gray-500 text-sm border-t border-gray-200 border-solid"
		>
			<div>MF units to Sell: <span>{quantity || 0}</span></div>
			<div>Available MF units: <span>{availableMFs}</span></div>
		</div>
		<footer class="modal-footer {parent.regionFooter}">
			<button class="btn rounded w-[50%] {parent.buttonNeutral}" on:click={parent.onClose}
				>{parent.buttonTextCancel}</button
			>
			<button
				class="btn rounded w-[50%] bg-primary-500 variant-filled-primary min-w-[124px] {parent.buttonPositive}"
				on:click={onFormSubmit}
				disabled={!enoughMFs || !quantity}
			>
				{#if loading}
					<ConicGradient width="w-4" stops={conicStops} spin />
				{:else}
					Sell
				{/if}
			</button>
		</footer>
		<!-- prettier-ignore -->
	</div>
{/if}
