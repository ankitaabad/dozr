<script lang="ts">
	import { TabGroup, Tab } from '@skeletonlabs/skeleton';
	import TopYearlyStock from './TopYearlyStock.svelte';
	import AllStock from './AllStock.svelte';
	import TopGainer from './TopGainer.svelte';
	import TopLosers from './TopLosers.svelte';
	let StocktabSet: number = 0;
</script>

<TabGroup>
	<Tab bind:group={StocktabSet} name="tab2" value={0}>Top 10 Performer Stocks</Tab>
	<Tab bind:group={StocktabSet} name="tab2" value={1}>All Stocks</Tab>
	<Tab bind:group={StocktabSet} name="tab2" value={2}>Top ganiner</Tab>
	<Tab bind:group={StocktabSet} name="tab3" value={3}>Top losers Funds</Tab>
	<svelte:fragment slot="panel">
		{#if StocktabSet === 0}
			<TopYearlyStock />
		{:else if StocktabSet === 1}
			<AllStock />
		{:else if StocktabSet === 2}
			<TopGainer />
		{:else if StocktabSet === 3}
			<TopLosers />
		{/if}
	</svelte:fragment>
</TabGroup>
