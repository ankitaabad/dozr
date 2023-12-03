
import {
	topStockGainersStore,
  topStockLosersStore,
  topInvestorsStore


} from '$lib/store';
import { browser } from '$app/environment';
import {isHome} from '$lib/store'
export const prerender = true;
/** @type {import('./$types').PageLoad} */
export async function load({url}) {
  isHome.set(false)

  if(browser){
    // console.log({pathname: url})
    // const customer_id = url.searchParams.get("customer_id") 
    // if(!customer_id){
    //   goto("/")
    // }
    // customerId.set(Number(customer_id))
  }

	await Promise.all([
		topStockGainersStore.fetchData(),
    topStockLosersStore.fetchData(),
    topInvestorsStore.fetchData()

		// allStocksStore.fetchData(),
		
    // allMutualFundsStore.fetchData(),
   

	]);
}
