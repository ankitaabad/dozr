<script lang="ts">
	import RecentTransactions from '$lib/components/RecentTransactions.svelte';
	import Test from '$lib/components/RecentTransactions.svelte';
	import TopGainer from '$lib/components/TopGainer.svelte';
	import { getModalStore, type ModalSettings } from '@skeletonlabs/skeleton';
	const modalStore = getModalStore();
	function addMoney() {
    console.log("inside add money")
		const modal: ModalSettings = {
			type: 'component',
			component: 'addMoneyModel'
		};

		modalStore.trigger(modal);
	}
</script>

<RecentTransactions />
<TopGainer />

<button on:click={addMoney} class= 'btn btn-sm rounded bg-primary-600'>Model </button>
