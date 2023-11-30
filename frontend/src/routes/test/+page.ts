import { recentTransactionsStore, topStockGainersStore,customersStore } from "$lib/store";
export const prerender = true
/** @type {import('./$types').PageLoad} */
export async function load() {
  await Promise.all([
    recentTransactionsStore.fetchData(),
    topStockGainersStore.fetchData(),
    customersStore.fetchData()

  ])
	
}