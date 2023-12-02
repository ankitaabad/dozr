<script lang="ts">
	import {
		Avatar,
		tableMapperValues,
		type ModalSettings,
		getModalStore
	} from '@skeletonlabs/skeleton';

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
	let tabSet: number = 0;
	let StocktabSet: number = 0;
</script>

<div class="flex flex-col h-screen">
	<Header />
	<div class="max-w-7xl w-full mx-auto my-6">
		<TabGroup>
			<Tab bind:group={tabSet} name="tab1" value={0}><span>Portfolio</span></Tab>
			<Tab bind:group={tabSet} name="tab2" value={1}>Stocks</Tab>
			<Tab bind:group={tabSet} name="tab3" value={2}>Mutual Funds</Tab>
			<Tab bind:group={tabSet} name="tab3" value={3}>Fixed Deposit</Tab>
			<!-- Tab Panels --->
			<svelte:fragment slot="panel">
				{#if tabSet === 0}
					<div class="flex gap-6">
						<YourTrade />
						<AccountBalance />
					</div>

					<div class="flex gap-6 mt-6">
						<div class="w-[75%] flex gap-6">
							<div class="w-[100%] card p-6">
								<div class="heading mb-6 flex justify-between items-center">
									<h2 class="font-medium text-lg">Recent transactions</h2>
									<a href="#" class="text-primary-500 font-medium">View all</a>
								</div>
								<RecentTransactions />
							</div>
						</div>

						<div class="w-[25%] card p-6">
							<div class="heading mb-6 flex justify-between items-center">
								<h2 class="font-medium text-lg">All watchlists</h2>
								<a href="#" class="text-primary-500 font-medium">View all</a>
							</div>
							<WatchList />
						</div>
					</div>
				{:else if tabSet === 1}
					<div class="stock flex gap-6 flex-col">
						<div class="w-[100%] card p-6">
							<div class="heading mb-6 flex justify-between items-center">
								<h2 class="font-medium text-lg">Holding</h2>
								<a href="#" class="text-primary-500 font-medium">View all</a>
							</div>
							<div class="customer-stocks">
								<CustomerStock />
							</div>
						</div>
						<div class="w-[100%] card p-6">
							<div class=" heading mb-6 flex justify-between items-center">
								<h2 class="font-medium text-lg">All Stocks</h2>
								<a href="#" class="text-primary-500 font-medium">View all</a>
							</div>
							<TabGroup>
								<Tab bind:group={StocktabSet} name="tab2" value={0}>All Stocks</Tab>
								<Tab bind:group={StocktabSet} name="tab2" value={1}>Top ganiner</Tab>
								<Tab bind:group={StocktabSet} name="tab3" value={2}>Top losers Funds</Tab>
								<svelte:fragment slot="panel">
									{#if StocktabSet === 0}
										<AllStock />
									{:else if StocktabSet === 1}
										<TopGainer />
									{:else if StocktabSet === 2}
										<TopLosers />
									{/if}
								</svelte:fragment>
							</TabGroup>
						</div>
						<!-- <div class="w-[25%] card p-6">Stocks</div> -->
					</div>
				{:else if tabSet === 2}
					<div class="stock flex gap-6 flex-col">
						<div class="w-[100%] card p-6">
							<div class="heading mb-6 flex justify-between items-center">
								<h2 class="font-medium text-lg">Investments</h2>
								<a href="#" class="text-primary-500 font-medium">View all</a>
							</div>
							<div class="customer-mutualfunds">
								<CustomerMutualFunds />
							</div>
						</div>
						<div class="w-[100%] card p-6">
							<div class="heading mb-6 flex justify-between items-center">
								<h2 class="font-medium text-lg">All Mutual Funds</h2>
								<a href="#" class="text-primary-500 font-medium">View all</a>
							</div>
							<TabGroup>
								<Tab bind:group={StocktabSet} name="tab2" value={0}>All Stocks</Tab>
								<svelte:fragment slot="panel">
									{#if StocktabSet === 0}
										<AllmutualFunds />
									{/if}
								</svelte:fragment>
							</TabGroup>
						</div>
						<!-- <div class="w-[25%] card p-6">Mutual Funds</div> -->
					</div>
				{:else if tabSet === 3}
					Fixed Deposit
				{/if}
			</svelte:fragment>
		</TabGroup>
	</div>
  <PayableLoans/>
  <CustomerInvestmentValue/>
	<div
		class="flex bg-white items-center px-6 justify-between border-t border-gray-200 border-solid py-6"
	>

	</div>
	<Footer />
</div>

