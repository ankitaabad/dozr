<script lang="ts">
	import '../app.postcss';

	// Floating UI for Popups
	import { computePosition, autoUpdate, flip, shift, offset, arrow } from '@floating-ui/dom';
	import { storePopup, type ModalComponent, Modal } from '@skeletonlabs/skeleton';
	import { browser } from '$app/environment';
	import { QueryClient, QueryClientProvider } from '@tanstack/svelte-query';
	import { initializeStores } from '@skeletonlabs/skeleton';
	import AddMoneyModel from '$lib/models/AddMoneyModel.svelte';

	initializeStores();

	const modalRegistry: Record<string, ModalComponent> = {
		// Set a unique modal ID, then pass the component reference
		addMoneyModel: { ref: AddMoneyModel }
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
</script>

<Modal components={modalRegistry} />

<QueryClientProvider client={queryClient}>
	<slot />
</QueryClientProvider>
