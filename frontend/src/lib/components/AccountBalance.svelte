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
	let ltcg = 0,
		stcg = 0;
	taxLiabilityStore.subscribe((value) => {
		if (value.length === 0) {
			return;
		}
		ltcg = value[0]?.ltcg || 0;
		stcg = value[0]?.stcg || 0;

		const tax_from_ltcg = (ltcg - 100000) * 0.1;
		const tax_from_stcg = stcg * 0.15;
		const total_tax =
			(tax_from_ltcg > 0 ? tax_from_ltcg : 0) + (tax_from_stcg > 0 ? tax_from_stcg : 0);
		tax_liability = total_tax.toLocaleString('en-in');
		console.log('updating tax liability', tax_liability);
		console.log({ total_tax });
	});
</script>

<div class="flex flex-col gap-6 w-[25%]">
	<div class="w-[100%] bg-white rounded-md p-6 border border-solid border-gray-200">
		<div class="w-[100%] flex flex-col h-full">
			<div>
				<div class="heading mb-6">
					<h2 class="font-medium text-lg">Balance</h2>
				</div>
				<div class="text-2xl font-semibold mb-12">
					₹{$customerBalanceStore[0]?.balance.toLocaleString('en-in')}
				</div>
			</div>

			<button
				type="button"
				class="mt-auto btn w-full rounded bg-primary-500 variant-filled-primary"
				on:click={showAddMoneyModal}>Add Money</button
			>
		</div>
	</div>

	<div class="w-[100%] bg-white rounded-md p-6 border border-solid border-gray-200">
		<div class="w-[100%] flex flex-col h-full">
			<div>
				<div class="heading mb-6">
					<h2 class="font-medium text-lg">Estimated Tax Liability</h2>
				</div>
				<div class="text-2xl font-semibold mb-6">₹{tax_liability}</div>
				<div class="flex justify-between flex-wrap gap-6">
					<div class="flex flex-col">
						<span class="text-xs text-gray-400">STCG</span>
						<span>₹{stcg?.toLocaleString('en-in')}</span>
					</div>
					<div class="flex flex-col">
						<span class="text-xs text-gray-400">LTCG</span>
						<span>₹{ltcg?.toLocaleString('en-in')}</span>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>
