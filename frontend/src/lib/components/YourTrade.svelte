<script lang="ts">
	import {
		customerStockInvestmentValueStore,
		customerMFInvestmentValueStore,
		customerTotalInvestmentValueStore
	} from '$lib/store';

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

<!-- <fieldset>
	<legend> stock investment</legend>
	<div>₹{$customerStockInvestmentValueStore[0]?.investment.toFixed(2)}</div>
	<div>₹{$customerStockInvestmentValueStore[0]?.present_value.toFixed(2)}</div>
</fieldset>

<fieldset>
	<legend> mf investment</legend>
	<div>₹{$customerMFInvestmentValueStore[0]?.investment.toFixed(2)}</div>
	<div>₹{$customerMFInvestmentValueStore[0]?.present_value.toFixed(2)}</div>
</fieldset>

<fieldset>
	<legend> total investment</legend>
	<div>₹{$customerTotalInvestmentValueStore[0]?.total_investment.toFixed(2)}</div>
	<div>₹{$customerTotalInvestmentValueStore[0]?.total_present_value.toFixed(2)}</div>
</fieldset> -->

<div class="w-[100%] card p-6">
	<div class="heading mb-6 flex justify-between items-center">
		<h2 class="font-medium text-lg">Summary</h2>
	</div>
	<div class="flex gap-6">
		<div class="card grow w-[25%]">
			<h3 class="font-medium mb-4 p-6 pb-0">Stocks</h3>
			<div class="flex justify-between pt-0 p-6 border-b border-gray-100 border-solid">
				<div class="flex justify-between flex-col">
					<div class="flex flex-col mb-8">
						<span class="text-xs text-gray-400">Invested</span>
						<span>₹{$customerStockInvestmentValueStore[0]?.investment.toFixed(2)}</span>
					</div>

					<div class="flex flex-col">
						<span class="text-xs text-gray-400">Total return</span>
						<span class=" text-success-500">+₹39,227 (18.59%)</span>
					</div>
				</div>
				<div class="flex justify-between flex-col">
					<div class="flex flex-col">
						<span class="text-xs text-gray-400">Current</span>
						<span>₹{$customerStockInvestmentValueStore[0]?.present_value.toFixed(2)}</span>
					</div>
				</div>
			</div>
		</div>
		<div class="card grow w-[25%]">
			<h3 class="font-medium mb-4 p-6 pb-0">Mutual Funds</h3>
			<div class="flex justify-between pt-0 p-6 border-b border-gray-100 border-solid">
				<div class="flex justify-between flex-col">
					<div class="flex flex-col mb-8">
						<span class="text-xs text-gray-400">Invested</span>
						<span>₹{$customerMFInvestmentValueStore[0]?.investment.toFixed(2)}</span>
					</div>
					<div class="flex flex-col">
						<span class="text-xs text-gray-400">Total return</span>
						<span class="text-success-500">+₹39,227 (18.59%)</span>
					</div>
				</div>
				<div class="flex justify-between flex-col">
					<div class="flex flex-col">
						<span class="text-xs text-gray-400">Current</span>
						<span>₹{$customerMFInvestmentValueStore[0]?.present_value.toFixed(2)}</span>
					</div>
				</div>
			</div>
		</div>
		<div class="card grow w-[25%]">
			<h3 class="font-medium mb-4 p-6 pb-0">Total Investment</h3>
			<div class="flex justify-between pt-0 p-6 border-b border-gray-100 border-solid">
				<div class="flex justify-between flex-col">
					<div class="flex flex-col mb-8">
						<span class="text-xs text-gray-400">Invested</span>
						<span>{$customerTotalInvestmentValueStore[0]?.total_investment.toFixed(2)}</span>
					</div>
					<div class="flex flex-col">
						<span class="text-xs text-gray-400">Total return</span>
						<span class="text-success-500">+₹39,227 (18.59%)</span>
					</div>
				</div>
				<div class="flex justify-between flex-col">
					<div class="flex flex-col">
						<span class="text-xs text-gray-400">Current</span>
						<span>{$customerTotalInvestmentValueStore[0]?.total_present_value.toFixed(2)}</span>
					</div>
				</div>
			</div>
		</div>
		<div class="card grow flex flex-col w-[25%]">
			<h3 class="font-medium mb-4 p-6 pb-0">Account balance</h3>
			<div>
				<div class="text-2xl font-semibold px-6">₹{$customerBalanceStore[0]?.balance}</div>
			</div>
			<div class="flex justify-between p-6 flex-col pt-0 mt-auto">
				<button
					type="button"
					class="mt-auto btn w-full rounded bg-primary-500 variant-filled-primary"
					on:click={showAddMoneyModal}>Add Money</button
				>
			</div>
		</div>
	</div>
</div>
