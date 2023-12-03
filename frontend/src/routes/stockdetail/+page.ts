import { stockDetailStore,currentStockId,isHome} from '$lib/store';
import { browser } from '$app/environment';
import { goto } from '$app/navigation';

export const prerender = true;
/** @type {import('./$types').PageLoad} */
export async function load({ url }) {
  isHome.set(false)
	if (browser) {
		console.log({ pathname: url });
		const stock_id = url.searchParams.get('stock_id');
		if (!stock_id) {
			goto('/');
		}
		currentStockId.set(stock_id);
	}

	await Promise.all([stockDetailStore.fetchData()]);
}
