import {
	recentTransactionsStore,
	topStockGainersStore,
  topStockLosersStore,
  topMFGainersStore,
  topMFLosersStore,
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
  topYearlyStock,
  topYearlyMF,
  isHome
} from '$lib/store';
import { browser } from '$app/environment';
import {goto} from '$app/navigation'
export const ssr = false;
/** @type {import('./$types').PageLoad} */
export async function load({url}) {
  isHome.set(false)

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
    topYearlyStock.fetchData(),
    topMFGainersStore.fetchData(),
    topMFLosersStore.fetchData(),
    topYearlyMF.fetchData()

	]);
  return {"isLoading":false}
}
