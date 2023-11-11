<script>
	import Manager from '$lib/components/Manager.svelte';
	import { isManager } from '$lib/store';

	import { Avatar } from '@skeletonlabs/skeleton';
	import Customer from '$lib/components/Customer.svelte';
</script>

<div class="flex flex-col border h-screen">
	<div class="flex bg-primary-700">
		<div class="flex-grow" />
		<div class="mr-2">
			<Avatar initials="JD" background="bg-secondary-500" />
		</div>
		{#if $isManager}
			<Manager />
		{:else}
			<Customer />
		{/if}
	</div>
</div>
