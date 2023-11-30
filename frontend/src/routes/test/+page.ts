import { recentTransactionsStore, topStockGainersStore } from "$lib/store";

/** @type {import('./$types').PageLoad} */
export async function load() {
	await recentTransactionsStore.fetchData()
  await topStockGainersStore.fetchData()
}