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

	$: totalChange =
		$customerTotalInvestmentValueStore[0]?.total_present_value -
		$customerTotalInvestmentValueStore[0]?.total_investment;

	$: totalChangePercentage =
		(totalChange / $customerTotalInvestmentValueStore[0]?.total_investment) * 100;
	$: console.log({ totalChange });
	$: totalChangeString = totalChangePercentage && getChangeString('total');

	$: mfChange =
		$customerMFInvestmentValueStore[0]?.present_value -
		$customerMFInvestmentValueStore[0]?.investment;

	$: mfChangePercentage = (mfChange / $customerMFInvestmentValueStore[0]?.investment) * 100;
	$: mfChangeString = mfChangePercentage && getChangeString('mf');

	$: stockChange =
		$customerStockInvestmentValueStore[0]?.present_value -
		$customerStockInvestmentValueStore[0]?.investment;
	$: stockChangePercentage =
		(stockChange / $customerStockInvestmentValueStore[0]?.investment) * 100;
	$: stockChangeString = stockChangePercentage && getChangeString('stock');

	const getChangeString = (type: 'stock' | 'mf' | 'total') => {
		const getStr = (change, per) => {
			let s = '₹ ';
			let sign = '';
			if (change > 0) sign = '+';
			// else if (change < 0) sign = '-';
			// s += sign + '₹';
			s += change.toFixed(2);

			s += ` (${sign}${per.toFixed(2)}%)`;
			return s;
			console.log({ s });
		};
		switch (type) {
			case 'stock':
				return getStr(stockChange, stockChangePercentage);

			case 'mf':
				return getStr(mfChange, mfChangePercentage);
			case 'total':
				return getStr(totalChange, totalChangePercentage);
		}
	};
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

<div class="w-[100%] bg-white rounded-md p-6 border  border-solid border-gray-200">
	<div class="heading mb-6 flex justify-between items-center">
		<h2 class="font-medium text-lg">Summary</h2>
	</div>
	<div class="flex gap-6">
		<div class="bg-white rounded-md p-6 border  border-solid border-gray-200 grow w-[25%] p-6">
			<h3 class="font-medium mb-4">Stocks</h3>
			<div class="flex justify-between flex-col gap-8">
				<div class="flex justify-between">
					<div class="flex flex-col">
						<span class="text-xs text-gray-400">Invested</span>
						<span>₹{$customerStockInvestmentValueStore[0]?.investment.toFixed(2)}</span>
					</div>

					<div class="flex flex-col">
						<span class="text-xs text-gray-400">Current</span>
						<span>₹{$customerStockInvestmentValueStore[0]?.present_value.toFixed(2)}</span>
					</div>
				</div>
				<div class="flex justify-between flex-col">
					<div class="flex flex-col">
						<span class="text-xs text-gray-400">Total return</span>
						<span class={stockChange > 0 ? 'text-green-500' : 'text-red-500'}
							>{stockChangeString}</span
						>
					</div>
				</div>
			</div>
		</div>
		<div class="bg-white rounded-md p-6 border  border-solid border-gray-200 grow w-[25%] p-6">
			<h3 class="font-medium mb-4">Mutual Funds</h3>
			<div class="flex justify-between flex-col gap-8">
				<div class="flex justify-between">
					<div class="flex flex-col">
						<span class="text-xs text-gray-400">Invested</span>
						<span>₹{$customerMFInvestmentValueStore[0]?.investment.toFixed(2)}</span>
					</div>
					<div class="flex flex-col">
						<span class="text-xs text-gray-400">Current</span>
						<span>₹{$customerMFInvestmentValueStore[0]?.present_value.toFixed(2)}</span>
					</div>
				</div>
				<div class="flex justify-between flex-col">
					<div class="flex flex-col">
						<span class="text-xs text-gray-400">Total return</span>
						<span class={mfChange > 0 ? 'text-green-500' : 'text-red-500'}>{mfChangeString}</span>
					</div>
				</div>
			</div>
		</div>
		<div class="bg-white rounded-md p-6 border  border-solid border-gray-200 grow w-[25%] p-6">
			<h3 class="font-medium mb-4">Total Investment</h3>
			<div class="flex justify-between flex-col gap-8">
				<div class="flex justify-between">
					<div class="flex flex-col">
						<span class="text-xs text-gray-400">Invested</span>
						<span>{$customerTotalInvestmentValueStore[0]?.total_investment.toFixed(2)}</span>
					</div>
					<div class="flex flex-col">
						<span class="text-xs text-gray-400">Current</span>
						<span>{$customerTotalInvestmentValueStore[0]?.total_present_value.toFixed(2)}</span>
					</div>
				</div>
				<div class="flex justify-between flex-col">
					<div class="flex flex-col">
						<span class="text-xs text-gray-400">Total return</span>
						<span class={totalChange > 0 ? 'text-green-500' : 'text-red-500'}
							>{totalChangeString}</span
						>
					</div>
				</div>
			</div>
		</div>
		<div class="bg-white rounded-md  border  border-solid border-gray-200 grow flex flex-col w-[25%]">
			<h3 class="font-medium mb-4 p-6 pb-0">Balance</h3>
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
