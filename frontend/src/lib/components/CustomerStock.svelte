<script lang="ts">
	import { customersStocksStore } from '$lib/store';
	import { dozerRest, server } from '$lib/utils';
	import { DataHandler, Datatable, Th, ThFilter } from '@vincjo/datatables';
	import { getModalStore, type ModalSettings } from '@skeletonlabs/skeleton';
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

	$: handler = new DataHandler($customersStocksStore, { rowsPerPage: 10 });
	$: rows = handler.getRows();
</script>

<div class="w-full">
	<Datatable {handler} search={false} rowsPerPage={false} rowCount={true}>
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
							>{row.company_name} <br /><span class="text-sm text-gray-500"
								>Buy Price: {row.avg_price.toFixed(2)}</span
							></td
						>
						<td>{row.quantity}</td>
						<td class="font-medium s-FI5Y16UXR6H0">₹{row.market_capital.toFixed(2)} (Cr)</td>
						<td class="font-medium s-FI5Y16UXR6H0">₹{row.price.toFixed(2)}</td>
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
	table{
		border: 1px solid #e5e7eb;
		border-collapse: collapse;
	}
	thead {
		background: #fff;
	}
	tbody td {
		border: 1px solid #e5e7eb;
		padding: 4px 20px;
	}
	tbody tr {
		transition: all, 0.2s;
	}
	tbody tr:hover {
		background: #f9f9f9;
	}
	footer{
		border-top: 0;
	}
</style>
