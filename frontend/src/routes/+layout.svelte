<script lang="ts">
	import '../app.postcss';
	import { isHome } from '$lib/store';
	// Floating UI for Popups
	import { computePosition, autoUpdate, flip, shift, offset, arrow } from '@floating-ui/dom';
	import {
		storePopup,
		type ModalComponent,
		Modal,
		type ConicStop,
		ConicGradient,

		Toast

	} from '@skeletonlabs/skeleton';
	import { browser } from '$app/environment';
	import { QueryClient, QueryClientProvider } from '@tanstack/svelte-query';
	import { initializeStores } from '@skeletonlabs/skeleton';
	import AddMoneyModel from '$lib/models/AddMoneyModel.svelte';
	import BuyStocksModel from '$lib/models/BuyStocksModel.svelte';
	import SellStocksModel from '$lib/models/SellStocksModel.svelte';
	import Header from '$lib/components/Header.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import SellMfModel from '$lib/models/SellMFModel.svelte';
	import BuyMfModel from '$lib/models/BuyMFModel.svelte';

	initializeStores();

	const modalRegistry: Record<string, ModalComponent> = {
		// Set a unique modal ID, then pass the component reference
		addMoneyModel: { ref: AddMoneyModel },
		buyStocksModel: { ref: BuyStocksModel },
		sellStocksModel: { ref: SellStocksModel },
    buyMFModel: {ref: BuyMfModel},
    sellMFModel: {ref: SellMfModel}

		// ...
	};
	const queryClient = new QueryClient({
		defaultOptions: {
			queries: {
				enabled: browser
			}
		}
	});

	storePopup.set({ computePosition, autoUpdate, flip, shift, offset, arrow });

	const conicStops: ConicStop[] = [
		{ color: 'transparent', start: 0, end: 25 },
		{ color: 'rgb(var(--color-primary-500))', start: 75, end: 100 }
	];
</script>

<Modal components={modalRegistry} />
<Toast position="tr"/>

<QueryClientProvider client={queryClient}>
	<div class="flex flex-col h-screen">
		{#if !$isHome}
			<Header />
		{/if}
		<slot />
		{#if !$isHome}
			<Footer />
		{/if}
	</div>
	<!-- <div class="fixed inset-0 bg-gray-100 h-screen z-50 flex items-center justify-center">
		<ConicGradient stops={conicStops} spin width="w-12" />
	</div> -->
</QueryClientProvider>
