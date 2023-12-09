<script lang="ts">
	import {
		Avatar,
		tableMapperValues,
		type ModalSettings,
		getModalStore,
		ConicGradient
	} from '@skeletonlabs/skeleton';
	// export let data = { isLoading: true };
	import { TabGroup, Tab } from '@skeletonlabs/skeleton';

	import RecentTransactions from '$lib/components/RecentTransactions.svelte';
	import CustomerStock from '$lib/components/CustomerStock.svelte';
	import AllmutualFunds from '$lib/components/AllmutualFunds.svelte';
	import CustomerMutualFunds from '$lib/components/CustomerMutualFunds.svelte';
	import PayableLoans from '$lib/components/PayableLoans.svelte';
	import YourTrade from '$lib/components/YourTrade.svelte';
	import Stocks from '$lib/components/Stocks.svelte';
	import MutualFunds from '$lib/components/MutualFunds.svelte';
	import AccountBalance from '$lib/components/AccountBalance.svelte';
	let tabSet: number = 0;
	const conicStops: ConicStop[] = [
		{ color: 'transparent', start: 0, end: 25 },
		{ color: 'rgb(var(--color-primary-500))', start: 75, end: 100 }
	];
</script>

<div class="max-w-7xl w-full mx-auto my-6">
	<TabGroup>
		<Tab bind:group={tabSet} name="tab1" value={0}><span>Portfolio</span></Tab>
		<Tab bind:group={tabSet} name="tab2" value={1}>Stocks</Tab>
		<Tab bind:group={tabSet} name="tab3" value={2}>Mutual Funds</Tab>
		<!-- <Tab bind:group={tabSet} name="tab3" value={3}>Fixed Deposit</Tab> -->
		<!-- Tab Panels --->
		<svelte:fragment slot="panel">
			{#if tabSet === 0}
				<div class="flex gap-6">
					<YourTrade />
					
						<AccountBalance/>
					
					<!-- <AccountBalance /> -->
				</div>

				<div class="flex gap-6 mt-6">
					<div class="w-[75%] flex gap-6">
						<div class="w-[100%] bg-white rounded-md p-6 border  border-solid border-gray-200 ">
							<div class="heading mb-6 flex justify-between items-center">
								<h2 class="font-medium text-lg">Recent transactions</h2>
								<!-- <a href="#" class="text-primary-500 font-medium">View all</a> -->
							</div>
							<RecentTransactions />
						</div>
					</div>

					<div class="w-[25%] bg-white rounded-md p-6 border  border-solid border-gray-200 ">
						<div class="heading mb-6 flex justify-between items-center">
							<h2 class="font-medium text-lg">Your Loans</h2>
						</div>
						<PayableLoans />
					</div>
				</div>
			{:else if tabSet === 1}
				<div class="stock flex gap-6 flex-col">
					<div class="w-[100%] bg-white rounded-md p-6 border  border-solid border-gray-200 ">
						<div class="heading mb-6 flex justify-between items-center">
							<h2 class="font-medium text-lg">Holding</h2>
							<!-- <a href="#" class="text-primary-500 font-medium">View all</a> -->
						</div>
						<div class="customer-stocks">
							<CustomerStock />
						</div>
					</div>
					<div class="w-[100%] bg-white rounded-md p-6 border  border-solid border-gray-200 ">
						<div class=" heading mb-6 flex justify-between items-center">
							<h2 class="font-medium text-lg">All Stocks</h2>
							<!-- <a href="#" class="text-primary-500 font-medium">View all</a> -->
						</div>
						<Stocks />
					</div>
					<!-- <div class="w-[25%] bg-white rounded-md p-6 border  border-solid border-gray-200 ">Stocks</div> -->
				</div>
			{:else if tabSet === 2}
				<div class="stock flex gap-6 flex-col">
					<div class="w-[100%] bg-white rounded-md p-6 border  border-solid border-gray-200 ">
						<div class="heading mb-6 flex justify-between items-center">
							<h2 class="font-medium text-lg">Investments</h2>
							<!-- <a href="#" class="text-primary-500 font-medium">View all</a> -->
						</div>
						<div class="customer-mutualfunds">
							<CustomerMutualFunds />
						</div>
					</div>
					<div class="w-[100%] bg-white rounded-md p-6 border  border-solid border-gray-200 ">
						<div class="heading mb-6 flex justify-between items-center">
							<h2 class="font-medium text-lg">All Mutual Funds</h2>
							<!-- <a href="#" class="text-primary-500 font-medium">View all</a> -->
						</div>
						<MutualFunds/>	
					</div>
				</div>
					{/if}
					
				</svelte:fragment>
			
	
	</TabGroup>
</div>
