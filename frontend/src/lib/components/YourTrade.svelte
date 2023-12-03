<script>
	import {
		customerStockInvestmentValueStore,
		customerMFInvestmentValueStore,
		customerTotalInvestmentValueStore
	} from '$lib/store';
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

<div class="w-[75%] card p-6">
	<div class="heading mb-6 flex justify-between items-center">
		<h2 class="font-medium text-lg">Your Trades</h2>
	</div>
	<div class="flex gap-6">
		<div class="card grow">
			<h3 class="font-medium mb-4 p-6 pb-0">Stocks</h3>
			<div class="flex justify-between pt-0 p-6 border-b border-gray-100 border-solid">
				<div class="flex justify-between flex-col">
					<div class="flex flex-col">
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
		<div class="card grow">
			<h3 class="font-medium mb-4 p-6 pb-0">Mutual Funds</h3>
			<div class="flex justify-between pt-0 p-6 border-b border-gray-100 border-solid">
				<div class="flex justify-between flex-col">
					<div class="flex flex-col mb-8">
						<span class="text-xs text-gray-400">Current</span>
						<span>₹{$customerMFInvestmentValueStore[0]?.present_value.toFixed(2)}</span>
					</div>
					<div class="flex flex-col">
						<span class="text-xs text-gray-400">Invested</span>
						<span>₹{$customerMFInvestmentValueStore[0]?.investment.toFixed(2)}</span>
					</div>
				</div>
				<div class="flex justify-between flex-col">
					<div class="flex flex-col">
						<span class="text-xs text-gray-400">Total return</span>
						<span class="text-success-500">+₹39,227 (18.59%)</span>
					</div>
				</div>
			</div>
		</div>
		<div class="card grow">
			<h3 class="font-medium mb-4 p-6 pb-0">Total Investment</h3>
			<div class="flex justify-between pt-0 p-6 border-b border-gray-100 border-solid">
				<div class="flex justify-between flex-col">
					<div class="flex flex-col mb-8">
						<span class="text-xs text-gray-400">Current</span>
						<span>{$customerTotalInvestmentValueStore[0]?.total_present_value.toFixed(2)}</span>
					</div>
					<div class="flex flex-col">
						<span class="text-xs text-gray-400">Invested</span>
						<span>{$customerTotalInvestmentValueStore[0]?.total_investment.toFixed(2)}</span>
					</div>
				</div>
				<div class="flex justify-between flex-col">
					<div class="flex flex-col">
						<span class="text-xs text-gray-400">Total return</span>
						<span class="text-success-500">+₹39,227 (18.59%)</span>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>
