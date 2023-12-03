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
		<div class="w-full">
			<Stocks />
		</div>
	</div>
</div>
