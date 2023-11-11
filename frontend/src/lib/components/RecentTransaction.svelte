<script lang="ts">
	import { Table, tableMapperValues, type TableSource } from '@skeletonlabs/skeleton';
	import { onMount } from 'svelte';

	export let recentTransactions= [1,2,3];
	let tableSimple = {
			// A list of heading labels.
			head: ['Amount', 'Transaction Date', 'Status'],
			// The data visibly shown in your table body UI.
			body: tableMapperValues(recentTransactions, ['amount', 'transactiondate', 'transactionstatus'])
		};
    console.log({ recentTransactions });

</script>

<Table source={tableSimple} />
