<script lang="ts">
	import { TabGroup, Tab } from '@skeletonlabs/skeleton';

	import RecentTransactions from '$lib/components/RecentTransactions.svelte';
	import CustomerStock from '$lib/components/CustomerStock.svelte';
	import TopGainer from '$lib/components/TopGainer.svelte';
	import TopLosers from '$lib/components/TopLosers.svelte';
	import AllStock from '$lib/components/AllStock.svelte';
	import AllmutualFunds from '$lib/components/AllmutualFunds.svelte';
	import CustomerMutualFunds from '$lib/components/CustomerMutualFunds.svelte';
	import PayableLoans from '$lib/components/PayableLoans.svelte';
	import CustomerInvestmentValue from '$lib/components/CustomerInvestmentValue.svelte';
	import Header from '$lib/components/Header.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import YourTrade from '$lib/components/YourTrade.svelte';
	import AccountBalance from '$lib/components/AccountBalance.svelte';
	import WatchList from '$lib/components/WatchList.svelte';
	import Top5Customers from '$lib/components/Top5Customers.svelte';
	let tabSet: number = 0;
	let StocktabSet: number = 0;
</script>

<div class="max-w-7xl w-full mx-auto my-6">
	<div class="flex gap-6 mt-6">
		<div class="w-[100%] flex gap-6">
			<Top5Customers />
		</div>
	</div>
	<div class="flex gap-6 mt-6">
		<div class="w-[50%] flex gap-6">
			<TopGainer />
		</div>
		<div class="w-[50%] flex gap-6">
			<TopLosers />
		</div>
	</div>
</div>
