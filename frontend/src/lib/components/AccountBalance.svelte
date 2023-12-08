<script lang="ts">
	import { customerBalanceStore } from '$lib/store';
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
</script>

<div class="w-[25%] bg-white rounded-md p-6 border  border-solid border-gray-200 flex flex-col">
	<div>
		<div class="heading mb-6">
			<h2 class="font-medium text-lg">Balance</h2>
		</div>
		<div class="text-2xl font-semibold">₹{$customerBalanceStore[0]?.balance.toLocaleString('en-in')}</div>
	</div>
	
	<button
		type="button"
		class="mt-auto btn w-full rounded bg-primary-500 variant-filled-primary"
		on:click={showAddMoneyModal}>Add Money</button
	>
</div>
