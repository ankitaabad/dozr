<script>
	import { customersStore, getInitials, isManager, customerId } from '$lib/store';
	import logo from '$lib/assets/logo.svg';
	import { goto } from '$app/navigation';

	function logout() {
		goto('/');
		customerId.set(0);
	}
</script>

<div
	class="flex bg-white items-center px-6 justify-between border-b border-gray-200 border-solid py-4"
>
	<div class="logo">
		<img src={logo} alt="Logo" />
	</div>
	<!-- <div class="search min-w-[20%]">
		<form action="">
			<div class="">
				<input type="search" placeholder="What are you looking for today?" class="rounded w-full" />
			</div>
		</form>
	</div> -->
	<div class="flex items-center">
		<div class="flex items-center justify-center gap-2 pr-8 border-r border-gray-200 border-solid">
			<div
				class="flex items-center justify-center w-10 h-10 rounded-full bg-primary-500 text-white"
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					class="icon icon-tabler icon-tabler-user"
					width="24"
					height="24"
					viewBox="0 0 24 24"
					stroke-width="2"
					stroke="currentColor"
					fill="none"
					stroke-linecap="round"
					stroke-linejoin="round"
					><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path
						d="M8 7a4 4 0 1 0 8 0a4 4 0 0 0 -8 0"
					/><path d="M6 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2" /></svg
				>
			</div>
			{#if $isManager}
				<div>Manager</div>
			{:else}
				<div>
					<div class="font-medium">
						{$customersStore[0]?.first_name}
						{$customersStore[0]?.last_name}
					</div>
					<div class="text-xs text-gray-500">ID: {$customerId}</div>
				</div>
			{/if}
		</div>
		<button class="btn flex gap-2 ml-2 hover:bg-gray-300 rounded" on:click={logout}>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				class="icon icon-tabler icon-tabler-logout"
				width="24"
				height="24"
				viewBox="0 0 24 24"
				stroke-width="2"
				stroke="currentColor"
				fill="none"
				stroke-linecap="round"
				stroke-linejoin="round"
				><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path
					d="M14 8v-2a2 2 0 0 0 -2 -2h-7a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h7a2 2 0 0 0 2 -2v-2"
				/><path d="M9 12h12l-3 -3" /><path d="M18 15l3 -3" /></svg
			><span>Logout</span>
		</button>
	</div>
</div>
