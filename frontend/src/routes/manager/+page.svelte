<script lang="ts">
	import Top5Customers from '$lib/components/Top5Customers.svelte';
	import Stocks from '$lib/components/Stocks.svelte';
	import { TabGroup, Tab } from '@skeletonlabs/skeleton';
	import MutualFunds from '$lib/components/MutualFunds.svelte';
	let managertabSet: number = 0;
</script>

<div class="max-w-7xl w-full mx-auto my-6">
	<div class="flex gap-6 mt-6">
		<div class="w-full">
			<Top5Customers />
		</div>
	</div>
	<div class="flex gap-6 mt-6">
		<!-- <div class="heading mb-6 flex justify-between items-center">
				<h2 class="font-medium text-lg">All Stocks</h2>
			</div> -->
		<TabGroup class="w-full">
			<Tab bind:group={managertabSet} name="tab2" value={0}>Stocks</Tab>
			<Tab bind:group={managertabSet} name="tab1" value={1}><span>Mutual Funds</span></Tab>
			<!-- Tab Panels --->

			<svelte:fragment slot="panel">
				<div class="w-full bg-white rounded-md p-6 border border-solid border-gray-200">
					{#if managertabSet === 0}
						<Stocks />
					{:else if managertabSet === 1}
						<MutualFunds />
					{/if}
				</div>
			</svelte:fragment>
		</TabGroup>
	</div>
</div>
