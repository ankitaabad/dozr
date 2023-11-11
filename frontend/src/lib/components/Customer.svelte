<script>
	import { createQuery } from '@tanstack/svelte-query';
	import RecentTransaction from './RecentTransaction.svelte';
	import { server } from '$lib/utils';
	import { get } from 'svelte/store';
	import { customerId } from '$lib/store';
	const managerData = createQuery({
		queryKey: ['managerData'],
		queryFn: async () =>
			(await server.get('/dashboard/manager', { params: { customerId: get(customerId) } }))?.data
	});

	const customerData = createQuery({
		queryKey: ['customerData'],
		queryFn: async () => (await server.get(`/dashboard/customer/${get(customerId)}`))?.data
	});
  const getRecentData = (data) => {
    return data.map(r => r.record)
  }
</script>

{#if $customerData.isLoading}
	<span>Loading...</span>
{:else if $customerData.error}
	<span>An error has occurred: {$customerData.error.message}</span>
{:else if $customerData.isSuccess}
	<div>
		<RecentTransaction recentTransactions={getRecentData($customerData.data)} />
	</div>
{/if}
