<script>
	import { customerId, isManager } from '$lib/store';
	import { onMount } from 'svelte';
	import { get } from 'svelte/store';
	import { goto } from '$app/navigation';
	import { getModalStore } from '@skeletonlabs/skeleton';
	import { enterBind, randomIntFromInterval } from '$lib/utils';

	const modalStore = getModalStore();
	let userId;

	let customerInputField, loginButton;

	onMount(() => {
		enterBind(loginButton, customerInputField);
	});

	async function managerLogin() {
		isManager.set(true);
		console.log(get(isManager));
		goto('/manager');
	}

	function randomUserLogin() {
		const customer_id = randomIntFromInterval(1001, 1100);
		userLogin(customer_id);
	}
	function loginById() {
		if (!userId) {
			return;
		}
		userLogin(userId);
	}
	function userLogin(user_id) {
		console.log('inside user login');
		isManager.set(false);
		goto(`/customer?customer_id=${user_id}`);
	}
</script>



<div class="h-screen flex">
	<div
		class="container h-80 justify-center my-auto gap-y-4 items-center flex flex-col max-w-sm mx-auto"
	>
		<div
			class="bg-white rounded-md p-6 border border-solid border-gray-200 px-8 py-12 flex flex-col w-full gap-4"
		>
			<img src="./logo.svg" alt="" class="w-40 mt-3 mb-10 mx-auto" />
			<button
				class="btn btn-sm bg-primary-500 variant-filled-primary rounded-sm w-full py-3 px-6 font-medium"
				on:click={managerLogin}
			>
				Login as Manager
			</button>
			<button
				class="btn btn-sm bg-primary-500 variant-filled-primary rounded w-full py-3 px-6 font-medium"
				on:click={randomUserLogin}>Login as Random User</button
			>
			<div class="flex">
				<input
					bind:this={customerInputField}
					type="number"
					placeholder="Customer Id"
					class="text-gray-900 text-sm rounded-sm w-2/3"
					bind:value={userId}
				/>
				<button
					bind:this={loginButton}
					class="btn btn-sm variant-filled-primary rounded rounded-s-none w-1/3 py-3 px-6"
					on:click={loginById}>Login</button
				>
			</div>
		</div>
	</div>
</div>
