import { recentTransactionsStore, topStockGainersStore } from "$lib/store";
export const prerender = true
/** @type {import('./$types').PageLoad} */
export async function load() {
	await recentTransactionsStore.fetchData()
  await topStockGainersStore.fetchData()
}