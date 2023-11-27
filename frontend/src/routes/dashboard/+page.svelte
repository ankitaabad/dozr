<script lang="ts">
	import Manager from '$lib/components/Manager.svelte';
	import { isManager } from '$lib/store';

	import { Avatar, tableMapperValues } from '@skeletonlabs/skeleton';
	import Customer from '$lib/components/Customer.svelte';
	import logo from '../dashboard/images/logo.svg';
	import { TabGroup, Tab, TabAnchor } from '@skeletonlabs/skeleton';
	import { Table } from '@skeletonlabs/skeleton';
	import type { TableSource } from '@skeletonlabs/skeleton';
	let tabSet: number = 0;

	const sourceData = [
		{ position: 1, name: 'Lorem Ipsum', tradeprice: 9.15, qty: '100', amount: '915' },
		{ position: 2, name: 'Lorem Ipsum', tradeprice: 9.15, qty: '100', amount: '915' },
		{ position: 3, name: 'Lorem Ipsum', tradeprice: 9.15, qty: '100', amount: '915' },
		{ position: 4, name: 'Lorem Ipsum', tradeprice: 9.15, qty: '100', amount: '915' },
		{ position: 5, name: 'Lorem Ipsum', tradeprice: 9.15, qty: '100', amount: '915' }
	];

	const tableSimple: TableSource = {
		// A list of heading labels.
		head: ['Name', 'Trade Price', 'Qty', 'Amount'],
		// The data visibly shown in your table body UI.
		body: tableMapperValues(sourceData, ['name', 'tradeprice', 'qty', 'amount']),
		// Optional: The data returned when interactive is enabled and a row is clicked.
		meta: tableMapperValues(sourceData, ['position', 'name', 'tradeprice', 'qty', 'amount']),
		// Optional: A list of footer labels.
		foot: ['Total', '', '<code class="code">5</code>']
	};
</script>

<div class="flex flex-col h-screen">
	<div class="flex bg-white items-center px-6 justify-between">
		<div class="logo">
			<img src={logo} alt="Logo" />
		</div>
		<div class="search min-w-[20%]">
			<form action="">
				<div class="">
					<input
						type="search"
						placeholder="What are you looking for today?"
						class="rounded w-full"
					/>
				</div>
			</form>
		</div>
		<div class="flex items-center gap-2">
			<div>
				<Avatar initials="HK" background="bg-secondary-500" />
			</div>
			{#if $isManager}
				<Manager />
			{:else}
				<Customer />
			{/if}
		</div>
	</div>
	<div class="max-w-7xl w-full mx-auto my-6">
		<TabGroup>
			<Tab bind:group={tabSet} name="tab1" value={0}>
				<!-- <svelte:fragment slot="lead">(icon)</svelte:fragment> -->
				<span>Portfolio</span>
			</Tab>
			<Tab bind:group={tabSet} name="tab2" value={1}>Stocks</Tab>
			<Tab bind:group={tabSet} name="tab3" value={2}>Mutual Funds</Tab>
			<Tab bind:group={tabSet} name="tab3" value={3}>Fixed Deposit</Tab>
			<!-- Tab Panels --->
			<svelte:fragment slot="panel">
				{#if tabSet === 0}
					<div class="flex gap-6">
						<div class="w-[75%] card p-4">
							<div class="">
								<Table source={tableSimple} />
							</div>
						</div>
						<div class="w-[25%] card p-4">
							<div class="">Account balance</div>
						</div>
					</div>
					<div class="flex gap-6 mt-6">
						<div class="w-[50%] card p-4">
							<div class="">
								<Table source={tableSimple} />
							</div>
						</div>
						<div class="w-[25%] card p-4">
							<div class="">Statistics</div>
						</div>
						<div class="w-[25%] card p-4">
							<div class="">All watchlists</div>
						</div>
					</div>
				{:else if tabSet === 1}
					Stocks contents
				{:else if tabSet === 2}
					Mutual Funds
				{:else if tabSet === 3}
					Fixed Deposit
				{/if}
			</svelte:fragment>
		</TabGroup>
	</div>
</div>
