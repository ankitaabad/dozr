import {
	recentTransactionsStore,
	topStockGainersStore,
  topStockLosersStore,
	customersStore,
	allStocksStore,
	customersStocksStore,
  customerBalanceStore,
  customerMutualFundsStore,
  customerId,
  loansStore,
  allMutualFundsStore,
  customerStockInvestmentValueStore,
  customerMFInvestmentValueStore,
  customerTotalInvestmentValueStore,
  topYearlyStock
} from '$lib/store';
import { browser } from '$app/environment';

export const prerender = true;
/** @type {import('./$types').PageLoad} */
export async function load({url}) {
  if(browser){
    console.log({pathname: url})
    const customer_id = url.searchParams.get("customer_id") 
    if(!customer_id){
      goto("/")
    }
    customerId.set(Number(customer_id))
  }

	await Promise.all([
		recentTransactionsStore.fetchData(),
		topStockGainersStore.fetchData(),
    topStockLosersStore.fetchData(),
		customersStore.fetchData(),
		allStocksStore.fetchData(),
		customersStocksStore.fetchData(),
    customerBalanceStore.fetchData(),
    customerMutualFundsStore.fetchData(),
    loansStore.fetchData(),
    allMutualFundsStore.fetchData(),
    customerStockInvestmentValueStore.fetchData(),
    customerMFInvestmentValueStore.fetchData(),
    customerTotalInvestmentValueStore.fetchData(),
    topYearlyStock.fetchData()

	]);
}
