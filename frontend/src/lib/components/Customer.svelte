<script>
	import { onMount } from 'svelte';
	import { browser } from '$app/environment';

	// if (browser) {
	//     const socket = new WebSocket("ws://gotify.68.183.85.136.nip.io/stream?token=Cr7tCz6GvMo3jKG")
	//     socket.addEventListener("open", ()=> {
	//         console.log("Opened")
	//     })
	// }
	let ws;

	// const es = new EventSource("http://mercure.68.183.85.136.nip.io/.well-known/mercure?topic=http://example.com/book",{withCredentials:false})
	// es.onmessage = function (e){
	//   console.log("received data")
	//   console.log(JSON.parse(e.data))
	// }

	onMount(() => {
		try {
			ws = new WebSocket('ws://gotify.68.183.85.136.nip.io/stream?token=Cr7tCz6GvMo3jKG');

			console.log('waiting');
		} catch (err) {
			console.log(JSON.stringify(err));
		}

		ws.onopen = function () {
			//  Web Socket is connected, send data using send()
			//  ws.send("Message to send");

			console.log('socket openend');
		};

		ws.onmessage = function (evt) {
			console.log(evt);
			var received_msg = evt.data;
			console.log({ received_msg });
			return false;
		};

		ws.onclose = function (event) {
			// websocket is closed.
      console.log({data: event})
			alert('Connection is closed...');
		};
	});
</script>

<!-- <script>
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
{/if} -->

<div>Cutomer</div>
