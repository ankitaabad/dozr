<script lang="ts">
	import { topStockLosersStore } from '$lib/store';
	import { dozerRest, server } from '$lib/utils';
	import { DataHandler, Datatable, Th, ThFilter } from '@vincjo/datatables';
	$: handler = new DataHandler($topStockLosersStore, { rowsPerPage: 10 });
	$: rows = handler.getRows();
</script>

<div class="w-full ">
	<Datatable {handler} search={false} rowsPerPage={false} rowCount={true}>
		<table>
			<thead>
				<tr>
					<Th {handler} orderBy="company_name">Name</Th>
					<Th {handler} orderBy="daily_change">Gain</Th>
					<Th {handler} orderBy="price">Price</Th>
				</tr>
			</thead>
			<tbody>
				{#each $rows as row}
					<tr>
						<td>{row.company_name}</td>
						<td class="font-medium text-error-500">{row.daily_change.toFixed(2)}%</td>
						<td class="font-medium">₹{row.price.toFixed(2)}</td>
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
		table-layout: fixed;
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
