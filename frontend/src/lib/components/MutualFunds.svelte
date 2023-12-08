<script lang="ts">
	import { TabGroup, Tab } from '@skeletonlabs/skeleton';
	import AllmutualFunds from './AllmutualFunds.svelte';
	import TopYearlyMutualFunds from './TopYearlyMutualFunds.svelte';
	import TopGainerMf from './TopGainerMF.svelte';
	import TopLosersMf from './TopLosersMF.svelte';
	let StocktabSet: number = 0;
</script>

<TabGroup>
	<Tab bind:group={StocktabSet} name="tab2" value={0}>Top 10 Performer Mutual Funds</Tab>
	<Tab bind:group={StocktabSet} name="tab2" value={1}>All Mutual Funds</Tab>
	<Tab bind:group={StocktabSet} name="tab2" value={2}>Daily Gainers</Tab>
	<Tab bind:group={StocktabSet} name="tab3" value={3}>Daily Losers</Tab>
	<svelte:fragment slot="panel">
		{#if StocktabSet === 0}
			<TopYearlyMutualFunds />
		{:else if StocktabSet === 1}
		<AllmutualFunds/>
		{:else if StocktabSet === 2}
			<TopGainerMf />
		{:else if StocktabSet === 3}
			<TopLosersMf />
		{/if}
	</svelte:fragment>
</TabGroup>
