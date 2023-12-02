import {
	recentTransactionsStore,
	topStockGainersStore,
	customersStore,
	allStocksStore,
	customersStocksStore,
  customerBalanceStore,
  customerMutualFundsStore
} from '$lib/store';
export const prerender = true;
/** @type {import('./$types').PageLoad} */
export async function load() {
	await Promise.all([
		recentTransactionsStore.fetchData(),
		topStockGainersStore.fetchData(),
		customersStore.fetchData(),
		allStocksStore.fetchData(),
		customersStocksStore.fetchData(),
    customerBalanceStore.fetchData(),
    customerMutualFundsStore.fetchData()
	]);
}
