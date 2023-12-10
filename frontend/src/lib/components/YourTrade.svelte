<script lang="ts">
	import {
		customerStockInvestmentValueStore,
		customerMFInvestmentValueStore,
		customerTotalInvestmentValueStore
	} from '$lib/store';

	import { customerBalanceStore } from '$lib/store';
	import { getModalStore, type ModalSettings } from '@skeletonlabs/skeleton';
	import Chart from 'svelte-frappe-charts';
	import AccountBalance from './AccountBalance.svelte';

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
			s += change.toLocaleString('en-in');

			s += ` (${sign}${per.toLocaleString('en-in')}%)`;
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

	$: data = {
		labels: ['Stocks', 'Mutual Funds', 'Total Investment'],

		datasets: [
			{
				name: 'Investment',
				chartType: 'bar',
				values: [
					$customerStockInvestmentValueStore[0]?.investment,
					$customerMFInvestmentValueStore[0]?.investment,
					$customerTotalInvestmentValueStore[0]?.total_investment
				].map((x) => {
					return (x / 100000).toFixed(2);
				})
			},
			{
				name: 'Present Values',
				chartType: 'bar',
				values: [
					$customerStockInvestmentValueStore[0]?.present_value,
					$customerMFInvestmentValueStore[0]?.present_value,
					$customerTotalInvestmentValueStore[0]?.total_present_value
				].map((x) => {
					return (x / 100000).toFixed(2);
				})
			}
		]
	};

	// title: "My Awesome Chart",
	// type: 'axis-mixed', // or 'bar', 'line', 'pie', 'percentage'
	// height: 300,
	// colors: ['purple', '#ffa3ef', 'light-blue'],

	// tooltipOptions: {
	// 	formatTooltipX: d => (d + '').toUpperCase(),
	// 	formatTooltipY: d => d + ' pts',
	// }
	import { TabGroup, Tab } from '@skeletonlabs/skeleton';
	let summarytabSet: number = 0;
</script>

<div class="w-[75%] bg-white rounded-md p-6 border border-solid border-gray-200">
	<!-- <div class="heading mb-6 flex justify-between items-center">
		<h2 class="font-medium text-lg">Summary</h2>
	</div> -->
	<TabGroup>
		<Tab bind:group={summarytabSet} name="tab2" value={0}>Visual View</Tab>
		<Tab bind:group={summarytabSet} name="tab1" value={1}><span>Detail View</span></Tab>
		<!-- Tab Panels --->
		<svelte:fragment slot="panel">
			{#if summarytabSet === 0}
				<Chart {data} type="bar" title="Investment (in Lacs)" />
			{:else if summarytabSet === 1}
				<div class="flex gap-6">
					<div class="bg-white rounded-md border border-solid border-gray-200 grow w-[25%] p-6">
						<h3 class="font-medium mb-4">Stocks</h3>
						<div class="flex justify-between flex-col gap-8">
							<div class="flex justify-between flex-col">
								<div class="flex flex-col mb-6">
									<span class="text-xs text-gray-400">Current</span>
									<div class="text-2xl font-semibold">
										₹{$customerStockInvestmentValueStore[0]?.present_value.toLocaleString('en-in')}
									</div>
								</div>
								<div class="flex flex-col mb-6">
									<span class="text-xs text-gray-400">Invested</span>
									<span
										>₹{$customerStockInvestmentValueStore[0]?.investment.toLocaleString(
											'en-in'
										)}</span
									>
								</div>
								<div class="flex flex-col">
									<span class="text-xs text-gray-400">Total return</span>
									<span class={stockChange > 0 ? 'text-green-500' : 'text-red-500'}
										>{stockChangeString}</span
									>
								</div>
							</div>
						</div>
					</div>
					<div class="bg-white rounded-md border border-solid border-gray-200 grow w-[25%] p-6">
						<h3 class="font-medium mb-4">Mutual Funds</h3>
						<div class="flex justify-between flex-col gap-8">
							<div class="flex justify-between flex-col">
								<div class="flex flex-col mb-6">
									<span class="text-xs text-gray-400">Current</span>
									<div class="text-2xl font-semibold">
										₹{$customerMFInvestmentValueStore[0]?.present_value.toLocaleString('en-in')}
									</div>
								</div>
								<div class="flex flex-col mb-6">
									<span class="text-xs text-gray-400">Invested</span>
									<span
										>₹{$customerMFInvestmentValueStore[0]?.investment.toLocaleString('en-in')}</span
									>
								</div>
								<div class="flex flex-col">
									<span class="text-xs text-gray-400">Total return</span>
									<span class={mfChange > 0 ? 'text-green-500' : 'text-red-500'}
										>{mfChangeString}</span
									>
								</div>
							</div>
						</div>
					</div>
					<div class="bg-white rounded-md border border-solid border-gray-200 grow w-[25%] p-6">
						<h3 class="font-medium mb-4">Total Investment</h3>
						<div class="flex justify-between flex-col gap-8">
							<div class="flex justify-between flex-col">
								<div class="flex flex-col mb-6">
									<span class="text-xs text-gray-400">Current</span>
									<div class="text-2xl font-semibold">
										{$customerTotalInvestmentValueStore[0]?.total_present_value.toLocaleString(
											'en-in'
										)}
									</div>
								</div>
								<div class="flex flex-col mb-6">
									<span class="text-xs text-gray-400">Invested</span>
									<span
										>{$customerTotalInvestmentValueStore[0]?.total_investment.toLocaleString(
											'en-in'
										)}</span
									>
								</div>
								<div class="flex flex-col">
									<span class="text-xs text-gray-400">Total return</span>
									<span class={totalChange > 0 ? 'text-green-500' : 'text-red-500'}
										>{totalChangeString}</span
									>
								</div>
							</div>
						</div>
					</div>
				</div>
			{/if}
		</svelte:fragment>
	</TabGroup>
</div>
