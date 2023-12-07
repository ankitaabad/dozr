<script lang="ts">
	import Top5Customers from '$lib/components/Top5Customers.svelte';
	import Stocks from '$lib/components/Stocks.svelte';
	let tabSet: number = 0;
	let StocktabSet: number = 0;
</script>

<div class="max-w-7xl w-full mx-auto my-6">
	<div class="flex gap-6 mt-6">
		<div class="w-full">
			<Top5Customers />
		</div>
	</div>
	<div class="flex gap-6 mt-6">
		<div class="w-full bg-white rounded-md p-6 border  border-solid border-gray-200 ">
			<div class="heading mb-6 flex justify-between items-center">
				<h2 class="font-medium text-lg">All Stocks</h2>
			</div>
			<Stocks />
		</div>
	</div>
</div>
