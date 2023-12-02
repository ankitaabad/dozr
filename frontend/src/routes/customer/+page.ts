import {
	recentTransactionsStore,
	topStockGainersStore,
	customersStore,
	allStocksStore,
	customersStocksStore,
  customerBalanceStore,
  customerMutualFundsStore,
  customerId
} from '$lib/store';
import { browser } from '$app/environment';

export const prerender = true;
/** @type {import('./$types').PageLoad} */
export async function load({url}) {
  if(browser){
    const customer_id = url.searchParams.get("customer_id") 
    if(!customer_id){
      goto("/")
    }
    customerId.set(Number(customer_id))
  }

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
