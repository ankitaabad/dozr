<script lang="ts">
	import Manager from '$lib/components/Manager.svelte';
	import { isManager } from '$lib/store';
	import Table from '../../components/table.svelte';
	import StocksTable from '../../components/stocksTable.svelte';
	import { Avatar, tableMapperValues, type ModalSettings, getModalStore } from '@skeletonlabs/skeleton';
	import Customer from '$lib/components/Customer.svelte';
	import logo from '../dashboard/images/logo.svg';
	import { TabGroup, Tab, TabAnchor } from '@skeletonlabs/skeleton';
	let tabSet: number = 1;
	let StocktabSet: number = 0;

  const modalStore = getModalStore();
	function addMoney() {
    console.log("inside add money")
		const modal: ModalSettings = {
			type: 'component',
			component: 'addMoneyModel'
		};

		modalStore.trigger(modal);
	}
</script>

<div class="flex flex-col h-screen">
	<div
		class="flex bg-white items-center px-6 justify-between border-b border-gray-200 border-solid"
	>
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
						<div class="w-[75%] card p-6">
							<div class="heading mb-6 flex justify-between items-center">
								<h2 class="font-medium">Your Trades</h2>
							</div>
							<div class="flex gap-6">
								<div class="card grow">
									<h3 class="font-medium mb-4 p-6 pb-0">Stocks</h3>
									<div class="flex justify-between pt-0 p-6 border-b border-gray-100 border-solid">
										<div class="flex justify-between flex-col">
											<div class="flex flex-col mb-8">
												<span class="text-xs text-gray-400">Current</span>
												<span>₹2,50,217</span>
											</div>
											<div class="flex flex-col">
												<span class="text-xs text-gray-400">Invested</span>
												<span>₹2,10,990</span>
											</div>
										</div>
										<div class="flex justify-between flex-col">
											<div class="flex flex-col">
												<span class="text-xs text-gray-400">Total return</span>
												<span class=" text-success-500">+₹39,227 (18.59%)</span>
											</div>
											<div class="flex flex-col">
												<span class="text-xs text-gray-400">1D returns</span>
												<span class="text-error-500">-₹161.41(0.006%)</span>
											</div>
										</div>
									</div>
									<div class="py-4 px-6 text-gray-400">
										XIRR <span class="text-success-500">17.28%</span>
									</div>
								</div>
								<div class="card grow">
									<h3 class="font-medium mb-4 p-6 pb-0">Mutual Funds</h3>
									<div class="flex justify-between pt-0 p-6 border-b border-gray-100 border-solid">
										<div class="flex justify-between flex-col">
											<div class="flex flex-col mb-8">
												<span class="text-xs text-gray-400">Current</span>
												<span>₹2,50,217</span>
											</div>
											<div class="flex flex-col">
												<span class="text-xs text-gray-400">Invested</span>
												<span>₹2,10,990</span>
											</div>
										</div>
										<div class="flex justify-between flex-col">
											<div class="flex flex-col">
												<span class="text-xs text-gray-400">Total return</span>
												<span class="text-success-500">+₹39,227 (18.59%)</span>
											</div>
											<div class="flex flex-col">
												<span class="text-xs text-gray-400">1D returns</span>
												<span class="text-error-500">-₹161.41(0.006%)</span>
											</div>
										</div>
									</div>
									<div class="py-4 px-6 text-gray-400">
										XIRR <span class="text-success-500">17.28%</span>
									</div>
								</div>
								<div class="card grow">
									<h3 class="font-medium mb-4 p-6 pb-0">Fixed Deposit</h3>
									<div class="flex justify-between pt-0 p-6 border-b border-gray-100 border-solid">
										<div class="flex justify-between flex-col">
											<div class="flex flex-col mb-8">
												<span class="text-xs text-gray-400">Current</span>
												<span>₹2,50,217</span>
											</div>
											<div class="flex flex-col">
												<span class="text-xs text-gray-400">Invested</span>
												<span> ₹2,10,990</span>
											</div>
										</div>
										<div class="flex justify-between flex-col">
											<div class="flex flex-col">
												<span class="text-xs text-gray-400">Total return</span>
												<span class="text-success-500">+₹39,227 (18.59%)</span>
											</div>
											<div class="flex flex-col">
												<span class="text-xs text-gray-400">1D returns</span>
												<span class="text-error-500">-₹161.41(0.006%)</span>
											</div>
										</div>
									</div>
									<div class="py-4 px-6 text-gray-400">
										XIRR <span class="text-success-500">17.28%</span>
									</div>
								</div>
							</div>
						</div>
						<div class="w-[25%] card p-6">
							<div class="heading mb-6">
								<h2 class="font-medium">Account balance</h2>
							</div>
							<div class="text-2xl font-semibold">₹1,00,184</div>
							<div class="my-6">
								<div class=" ">
									<a
										href="#"
										class="py-5 border-t border-b border-solid border-gray-100 flex justify-between w-full items-center"
									>
										<div>Withdraw</div>
										<div>
											<svg
												width="16"
												height="16"
												viewBox="0 0 16 16"
												fill="none"
												xmlns="http://www.w3.org/2000/svg"
											>
												<g clip-path="url(#clip0_24_73)">
													<path
														d="M6 12L10 8L6 4"
														stroke="#374151"
														stroke-width="1.5"
														stroke-linecap="round"
														stroke-linejoin="round"
													/>
												</g>
												<defs>
													<clipPath id="clip0_24_73">
														<rect
															width="16"
															height="16"
															fill="white"
															transform="translate(0 16) rotate(-90)"
														/>
													</clipPath>
												</defs>
											</svg>
										</div>
									</a>
								</div>
							</div>
							<div class="">
								<div>
									<a
										href="#"
										class="pb-5 border-b border-solid border-gray-100 flex justify-between w-full items-center"
									>
										<div>All transactions</div>
										<div>
											<svg
												width="16"
												height="16"
												viewBox="0 0 16 16"
												fill="none"
												xmlns="http://www.w3.org/2000/svg"
											>
												<g clip-path="url(#clip0_24_73)">
													<path
														d="M6 12L10 8L6 4"
														stroke="#374151"
														stroke-width="1.5"
														stroke-linecap="round"
														stroke-linejoin="round"
													/>
												</g>
												<defs>
													<clipPath id="clip0_24_73">
														<rect
															width="16"
															height="16"
															fill="white"
															transform="translate(0 16) rotate(-90)"
														/>
													</clipPath>
												</defs>
											</svg>
										</div>
									</a>
								</div>
							</div>
							<button
								type="button"
								class="mt-8 btn w-full rounded-lg bg-primary-500 variant-filled-primary"
                on:click={addMoney}
								>Add Money</button
							>
						</div>
					</div>
					<div class="flex gap-6 mt-6">
						<div class="w-[75%] flex gap-6">
							<div class="w-[66%] card p-6">
								<div class="heading mb-6 flex justify-between items-center">
									<h2 class="font-medium">Recent transactions</h2>
									<a href="#" class="text-primary-500 font-medium">View all</a>
								</div>
								<Table />
							</div>
							<div class="w-[34%] card p-6">
								<div class="heading mb-6 flex justify-between items-center">
									<h2 class="font-medium">Statistics</h2>
									<label class="label">
										<select class="select">
											<option value="2">Week</option>
											<option value="3">Month</option>
											<option value="4" selected>Year</option>
										</select>
									</label>
								</div>
							</div>
						</div>

						<div class="w-[25%] card p-6">
							<div class="heading mb-6 flex justify-between items-center">
								<h2 class="font-medium">All watchlists</h2>
								<a href="#" class="text-primary-500 font-medium">View all</a>
							</div>
							<div class="">
								<div class="pb-4 border-b border-solid border-gray-100 flex justify-between w-full">
									<div>SBI</div>
									<div class="flex flex-col items-end">
										<div>₹563.05</div>
										<div class="text-error-500 text-xs">-21.60(3.69%)</div>
									</div>
								</div>
							</div>
							<div class="">
								<div class="py-4 border-b border-solid border-gray-100 flex justify-between w-full">
									<div>Asian Paints</div>
									<div class="flex flex-col items-end">
										<div>₹3,168.90</div>
										<div class="text-success-500 text-xs">38.60(1.23%)</div>
									</div>
								</div>
							</div>
							<div class="">
								<div class="py-4 border-b border-solid border-gray-100 flex justify-between w-full">
									<div>Siemens</div>
									<div class="flex flex-col items-end">
										<div>₹3,570.75</div>
										<div class="text-success-500 text-xs">45.75(1.30%)</div>
									</div>
								</div>
							</div>
							<div class="">
								<div class="py-4 border-b border-solid border-gray-100 flex justify-between w-full">
									<div>Bank of Baroda</div>
									<div class="flex flex-col items-end">
										<div>₹196.80</div>
										<div class="text-error-500 text-xs">-1.55(0.78%)</div>
									</div>
								</div>
							</div>
							<div class="">
								<div class="py-4 border-b border-solid border-gray-100 flex justify-between w-full">
									<div>Power Grid Cord</div>
									<div class="flex flex-col items-end">
										<div>₹209.50</div>
										<div class="text-success-500 text-xs">2.30(1.11%)</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				{:else if tabSet === 1}
					<div class="stock flex gap-6">
						<div class="w-[75%] card p-6">
							<div class="heading mb-6 flex justify-between items-center">
								<h2 class="font-medium">Index</h2>
								<a href="#" class="text-primary-500 font-medium">All Indices</a>
							</div>
							<div class="flex gap-6 mb-10">
								<div class="card grow">
									<h3 class="font-medium mb-2 p-6 pb-0 uppercase">Nifty 50</h3>
									<div class="flex justify-between pt-0 p-6 border-b border-gray-100 border-solid">
										<div class="flex justify-between flex-col">
											<div class="flex gap-3 font-semibold">
												<span class="">20,50,217</span>
												<span class=" text-error-500">-11.60 (0.08%)</span>
											</div>
										</div>
									</div>
								</div>
								<div class="card grow">
									<h3 class="font-medium mb-2 p-6 pb-0 uppercase">Sensex</h3>
									<div class="flex justify-between pt-0 p-6 border-b border-gray-100 border-solid">
										<div class="flex justify-between flex-col">
											<div class="flex gap-3 font-semibold">
												<span class="">66,50,217</span>
												<span class=" text-error-500">-97.98 (0.14%)</span>
											</div>
										</div>
									</div>
								</div>
								<div class="card grow">
									<h3 class="font-medium mb-2 p-6 pb-0 uppercase">Banknifty</h3>
									<div class="flex justify-between pt-0 p-6 border-b border-gray-100 border-solid">
										<div class="flex justify-between flex-col">
											<div class="flex gap-3 font-semibold">
												<span class="">44,50,217</span>
												<span class=" text-error-500">-211.60 (0.48%)</span>
											</div>
										</div>
									</div>
								</div>
							</div>

							<div
								class="pt-10 heading mb-6 border-t border-solid border-gray-100 flex justify-between items-center"
							>
								<h2 class="font-medium">All Stocks</h2>
								<a href="#" class="text-primary-500 font-medium">View all</a>
							</div>
							<TabGroup>
								<Tab bind:group={StocktabSet} name="tab2" value={0}>All Stocks</Tab>
								<Tab bind:group={StocktabSet} name="tab2" value={1}>Top ganiner</Tab>
								<Tab bind:group={StocktabSet} name="tab3" value={2}>Top losers Funds</Tab>
								<svelte:fragment slot="panel">
									{#if StocktabSet === 0}
										<StocksTable />
									{:else if StocktabSet === 1}
										<Table />
									{:else if StocktabSet === 2}
										<Table />
									{/if}
								</svelte:fragment>
							</TabGroup>
						</div>
						<div class="w-[25%] card p-6">Stocks</div>
					</div>
				{:else if tabSet === 2}
					<div class="stock flex gap-6">
						<div class="w-[75%] card p-6">
							<div class="heading mb-6 flex justify-between items-center">
								<h2 class="font-medium">Index</h2>
								<a href="#" class="text-primary-500 font-medium">All Indices</a>
							</div>
							<div class="flex gap-6 mb-10">
								<div class="card grow">
									<h3 class="font-medium mb-2 p-6 pb-0 uppercase">Nifty 50</h3>
									<div class="flex justify-between pt-0 p-6 border-b border-gray-100 border-solid">
										<div class="flex justify-between flex-col">
											<div class="flex gap-3 font-semibold">
												<span class="">20,50,217</span>
												<span class=" text-error-500">-11.60 (0.08%)</span>
											</div>
										</div>
									</div>
								</div>
								<div class="card grow">
									<h3 class="font-medium mb-2 p-6 pb-0 uppercase">Sensex</h3>
									<div class="flex justify-between pt-0 p-6 border-b border-gray-100 border-solid">
										<div class="flex justify-between flex-col">
											<div class="flex gap-3 font-semibold">
												<span class="">66,50,217</span>
												<span class=" text-error-500">-97.98 (0.14%)</span>
											</div>
										</div>
									</div>
								</div>
								<div class="card grow">
									<h3 class="font-medium mb-2 p-6 pb-0 uppercase">Banknifty</h3>
									<div class="flex justify-between pt-0 p-6 border-b border-gray-100 border-solid">
										<div class="flex justify-between flex-col">
											<div class="flex gap-3 font-semibold">
												<span class="">44,50,217</span>
												<span class=" text-error-500">-211.60 (0.48%)</span>
											</div>
										</div>
									</div>
								</div>
							</div>

							<div
								class="pt-10 heading mb-6 border-t border-solid border-gray-100 flex justify-between items-center"
							>
								<h2 class="font-medium">All Mutual Funds</h2>
								<a href="#" class="text-primary-500 font-medium">View all</a>
							</div>
							<TabGroup>
								<Tab bind:group={StocktabSet} name="tab2" value={0}>All Stocks</Tab>
								<Tab bind:group={StocktabSet} name="tab2" value={1}>Top ganiner</Tab>
								<Tab bind:group={StocktabSet} name="tab3" value={2}>Top losers Funds</Tab>
								<svelte:fragment slot="panel">
									{#if StocktabSet === 0}
										<StocksTable />
									{:else if StocktabSet === 1}
										<Table />
									{:else if StocktabSet === 2}
										<Table />
									{/if}
								</svelte:fragment>
							</TabGroup>
						</div>
						<div class="w-[25%] card p-6">Mutual Funds</div>
					</div>
				{:else if tabSet === 3}
					Fixed Deposit
				{/if}
			</svelte:fragment>
		</TabGroup>
	</div>
</div>
