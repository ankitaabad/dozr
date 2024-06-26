<script lang="ts">
	import type { SvelteComponent } from 'svelte';
	import { onMount } from 'svelte';

	import { ConicGradient, getToastStore } from '@skeletonlabs/skeleton';
	import type { ConicStop, ToastSettings } from '@skeletonlabs/skeleton';
	// Stores
	import { getModalStore } from '@skeletonlabs/skeleton';
	import { addMoneyApi } from '$lib/apis';
	import { enterBind } from '$lib/utils';
	const toastStore = getToastStore();

	// Props
	/** Exposes parent props to this component. */
	export let parent: SvelteComponent;

	let addMoneyInput, addMoneyButton;

	onMount(() => {
		enterBind(addMoneyButton, addMoneyInput);
	});
	const modalStore = getModalStore();

	// Form Data
	const formData = {
		amount: ''
	};

	// We've created a custom submit function to pass the response and close the modal.
	let loading;
	async function onFormSubmit() {
		console.log('this is triggered');
		if (!formData.amount) {
			modalStore.close();

			return;
		}
		loading = true;
		await addMoneyApi(formData.amount);
		if ($modalStore[0].response) $modalStore[0].response(formData);
		modalStore.close();
		const t: ToastSettings = {
			message: `${formData.amount} credited to account`,
			timeout: 2000,
			background: 'variant-filled-success'
		};
		toastStore.trigger(t);
	}

	// Base Classes
	const cBase = 'card p-4 w-modal shadow-xl space-y-4 ';
	const cHeader = 'text-2xl font-bold';
	const cForm = 'space-y-4 rounded-container-token';
	const conicStops: ConicStop[] = [
		{ color: 'transparent', start: 0, end: 25 },
		{ color: 'rgb(var(--on-primary))', start: 75, end: 100 }
	];
</script>

<!-- @component This example creates a simple form modal. -->

{#if $modalStore[0]}
	<div class="modal-example-form w-96 {cBase}">
		<header class={cHeader}>Add Money</header>

		<!-- Enable for debugging: -->
		<div class="modal-form {cForm}">
			<label class="label">
				<span>Enter Amount</span>
				<input
					bind:this={addMoneyInput}
					class="input"
					type="number"
					bind:value={formData.amount}
					placeholder=""
				/>
			</label>
		</div>
		<!-- prettier-ignore -->
		<footer class="modal-footer border-t border-gray-200 border-solid pt-4  {parent.regionFooter}">
        <button class="btn rounded {parent.buttonNeutral}" on:click={parent.onClose}>{parent.buttonTextCancel}</button>
        <button bind:this ={addMoneyButton} class="btn rounded bg-primary-500 variant-filled-primary min-w-[124px] {parent.buttonPositive}" on:click={onFormSubmit}>
			{#if loading}
			<ConicGradient width="w-4"  stops={conicStops} spin />
			{:else}
			Add Money
			{/if}
			
		</button>
		
    </footer>
	</div>
{/if}
