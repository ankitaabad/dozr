<script lang="ts">
	import { customerBalanceStore, taxLiabilityStore } from '$lib/store';
	import { getModalStore, type ModalSettings } from '@skeletonlabs/skeleton';

	const modalStore = getModalStore();
	function showAddMoneyModal() {
		//console.log('inside add money');
		const modal: ModalSettings = {
			type: 'component',
			component: 'addMoneyModel'
		};

		modalStore.trigger(modal);
	}
	let tax_liability = 0;
	taxLiabilityStore.subscribe((value) => {
		if (value.length === 0) {
			return;
		}
		let { ltcg, stcg } = value[0];

		const tax_from_ltcg = (ltcg - 100000) * 0.1;
		const tax_from_stcg = stcg * 0.15;
		const total_tax =  (tax_from_ltcg > 0 ? tax_from_ltcg : 0) + (tax_from_stcg > 0 ? tax_from_stcg : 0);
    tax_liability = total_tax.toLocaleString('en-in')
    console.log({total_tax})
	});
</script>

<div class="w-[25%] bg-white rounded-md p-6 border border-solid border-gray-200">
	<div class="w-[100%] flex flex-col h-full">
		<div>
			<div class="heading mb-6">
				<h2 class="font-medium text-lg">Balance</h2>
			</div>
			<div class="text-2xl font-semibold">
				₹{$customerBalanceStore[0]?.balance.toLocaleString('en-in')}
			</div>
		</div>
		<div>
			<div class="heading my-6">
				<h2 class="font-medium text-lg">Estimated Tax Liability</h2>
			</div>
			<div class="text-2xl font-semibold">₹{tax_liability}</div>
		</div>

		<button
			type="button"
			class="mt-auto btn w-full rounded bg-primary-500 variant-filled-primary"
			on:click={showAddMoneyModal}>Add Money</button
		>
	</div>
</div>
