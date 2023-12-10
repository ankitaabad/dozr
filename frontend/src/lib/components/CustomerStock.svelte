<script lang="ts">
	import { customersStocksStore } from '$lib/store';
	import { dozerRest, server } from '$lib/utils';
	import { DataHandler, Datatable, Th, ThFilter } from '@vincjo/datatables';
	import { getModalStore, type ModalSettings } from '@skeletonlabs/skeleton';
	import { goto } from '$app/navigation';
	const modalStore = getModalStore();
	function sellStocks(row) {
		console.log('inside add money');
		const modal: ModalSettings = {
			type: 'component',
			component: 'sellStocksModel',
			meta: row
		};
		console.log({ modal });

		modalStore.trigger(modal);
	}

	const handler = new DataHandler($customersStocksStore, { rowsPerPage: 5 });
	const rows = handler.getRows();
	customersStocksStore.subscribe((data) => {
		handler?.setRows(data);
		handler.sort('company_name');
	});
</script>

<div class="w-full">
	<Datatable {handler} search={false} rowsPerPage={false} rowCount={true} pagination={true}>
		<table>
			<thead>
				<tr>
					<Th {handler} orderBy="company_name">Name</Th>
					<Th {handler} orderBy="quantity">Quantity</Th>
					<Th {handler} orderBy="market_capital">Market Capital</Th>
					<Th {handler} orderBy="avg_price">Current Price</Th>
					<Th {handler} orderBy="">&nbsp;</Th>
				</tr>
			</thead>
			<tbody>
				{#each $rows as row}
					<tr>
						<td
							><a href={`/stockdetail?stock_id=${row.stock_id}`} class="flex gap-2 items-center"
								>{row.company_name}
								<svg
									xmlns="http://www.w3.org/2000/svg"
									class="icon icon-tabler icon-tabler-external-link"
									width="20"
									height="20"
									viewBox="0 0 24 24"
									stroke-width="1.5"
									stroke="#6366f1"
									fill="none"
									stroke-linecap="round"
									stroke-linejoin="round"
									><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path
										d="M12 6h-6a2 2 0 0 0 -2 2v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-6"
									/><path d="M11 13l9 -9" /><path d="M15 4h5v5" /></svg
								></a
							>
							<span class="text-sm text-gray-500"
								>Buy Price: {row.avg_price.toLocaleString('en-in')}</span
							></td
						>
						<td>{row.quantity}</td>
						<td class="">₹{row.market_capital.toLocaleString('en-in')} (Cr)</td>
						<td class="font-medium">₹{row.price.toLocaleString('en-in')}</td>
						<td
							><button
								type="button"
								class=" btn btn-sm rounded-md px-6 bg-primary-500 variant-filled-primary"
								on:click={() => sellStocks(row)}>Sell</button
							></td
						>
					</tr>
				{/each}
			</tbody>
		</table>
	</Datatable>
</div>

<style>
	table {
		border: 1px solid #e5e7eb;
		border-collapse: collapse;
	}
	thead {
		background: #fff;
	}
	tbody td {
		border: 1px solid #e5e7eb;
		padding: 4px 20px;
		position: relative;
	}
	tbody tr {
		transition: all, 0.2s;
	}
	tbody tr:hover {
		background: #f9f9f9;
	}
	footer {
		border-top: 0;
	}
</style>
