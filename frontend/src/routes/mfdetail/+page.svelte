<script lang="ts">
	import Stocks from '$lib/components/Stocks.svelte';
	import {
		customerStockInvestmentValueStore,
		customerMFInvestmentValueStore,
		customerTotalInvestmentValueStore,
		mfDetailStore,
		stockPage
	} from '$lib/store';

	import { RowCount } from '@vincjo/datatables';
	import { DataHandler, Datatable, Th, ThFilter } from '@vincjo/datatables';
	import { DateTime } from 'luxon';
	import { onMount } from 'svelte';
	$: handler = new DataHandler($mfDetailStore, { rowsPerPage: 10 });
	$: rows = handler.getRows();
	onMount(() => {
		$stockPage = true;
		return () => {
			$stockPage = false;
		};
	});
	import Chart from 'svelte-frappe-charts';
	let labels, values;
	mfDetailStore.subscribe((data) => {
		const prices = data.dailyPrices;
		const today_date = DateTime.now().day;
		let requiredPrices = prices.filter((p) => {
			return DateTime.fromSQL(p.date).day === today_date;
		});
		requiredPrices = requiredPrices.reverse();
		console.log({ requiredPrices });
		console.log('length : ', requiredPrices.length);

		labels = requiredPrices.map((d) => DateTime.fromSQL(d.date).toFormat('LLL-yyyy'));
		values = requiredPrices.map((d) => d.price?.toFixed(2));
	});
	// let labels = $mfDetailStore.dailyPrices.map((d) => {
	// 	return d.date;
	// });
	// let values = $mfDetailStore.dailyPrices.map((d) => {
	// 	return d.price;
	// });

	$: data = {
		labels,
		datasets: [
			{
				values
			}
		]
	};
	$: console.log({ data });
</script>

<div class="max-w-7xl w-full mx-auto">
	<div class="heading flex justify-between items-center mt-6">
		<h2 class="font-medium text-lg flex gap-3 items-center">
			<div class="w-16 h-16 rounded border border-solid border-gray-300">
				<img src={$mfDetailStore.details.image_src} alt="" />
			</div>
			<div class="flex flex-col max-w-[256px] leading-snug">
				<div>{$mfDetailStore.details.fund_name}</div>
			</div>
		</h2>
	</div>
</div>
<div class="max-w-7xl w-full mx-auto my-6 flex flex-col gap-6">
	<!-- <div class=""><a href="#" class="font-medium flex gap-2 items-center text-primary-500"><svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-arrow-left" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M5 12l14 0" /><path d="M5 12l6 6" /><path d="M5 12l6 -6" /></svg>Back </a></div> -->
	<div class="w-[100%] flex gap-6">
		<div class="w-[100%]">
			<div class="flex flex-col gap-6">
				<div class="w-full flex gap-6">
					<div class="border border-solid border-gray-200 p-4 w-full rounded-md bg-white">
						<div class="flex justify-between w-full">
							<div class="flex flex-col items-start gap-2">
								<div>Price</div>
								<div class="font-medium">
									₹{$mfDetailStore.details.price?.toLocaleString('en-in')}
								</div>
							</div>
						</div>
					</div>
					<div class="border border-solid border-gray-200 p-4 w-full rounded-md bg-white">
						<div class="flex justify-between">
							<div class="flex flex-col items-start gap-2">
								<div>Daily Change</div>
								<div
									class={$mfDetailStore.details.daily_change > 0
										? 'text-green-500 font-medium'
										: 'text-red-500 font-medium'}
								>
									{$mfDetailStore.details.daily_change?.toLocaleString('en-in')}%
								</div>
							</div>
						</div>
					</div>
					<div class="border border-solid border-gray-200 p-4 w-full rounded-md bg-white">
						<div class=" flex justify-between">
							<div class="flex flex-col items-start gap-2">
								<div>Yearly Change</div>
								<div
									class={$mfDetailStore.details.yearly_change > 0
										? 'text-green-500 font-medium'
										: 'text-red-500 font-medium'}
								>
									{$mfDetailStore.details.yearly_change?.toLocaleString('en-in')}%
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
	<div class="flex gap-6">
		<div class="w-[100%] flex gap-6">
			<div class="w-[100%] bg-white rounded-md p-6 border border-solid border-gray-200">
				<div class="heading mb-6 flex justify-between items-center">
					<h2 class="font-medium text-lg">Mutual Fund Prices</h2>
				</div>
				<Chart {data} type="line" />
			</div>
		</div>
	</div>
</div>
<!-- {JSON.stringify($mfDetailStore.details)} -->
