import { mfDetailStore,currentMFId} from '$lib/store';
import { browser } from '$app/environment';
import { goto } from '$app/navigation';

export const ssr = false
/** @type {import('./$types').PageLoad} */
export async function load({ url }) {
  // isHome.set(false)
	if (browser) {
		console.log({ pathname: url });
		const mf_id = url.searchParams.get('mf_id');
    console.log({mf_id})
		if (!mf_id) {
			goto('/');
		}
		currentMFId.set(mf_id);
    console.log("fetchiing details")
    await Promise.all([mfDetailStore.fetchData()]);

	}

}
