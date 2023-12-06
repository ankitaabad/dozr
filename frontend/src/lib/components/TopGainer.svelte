<script lang="ts">
	import { topStockGainersStore } from '$lib/store';
	import { dozerRest, server } from '$lib/utils';
	import { DataHandler, Datatable, Th, ThFilter } from '@vincjo/datatables';
	$: handler = new DataHandler($topStockGainersStore, { rowsPerPage: 10 });
	$: rows = handler.getRows();
</script>

<div class="w-full card p-4">
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
						<td class="font-medium text-success-500">{row.daily_change.toFixed(2)}%</td>
						<td class="font-medium">₹{row.price.toFixed(2)}</td>
					</tr>
				{/each}
			</tbody>
		</table>
	</Datatable>
</div>

<style>
	table {
		table-layout: fixed;
	}
	thead {
		background: #fff;
	}
	tbody td {
		border: 1px solid #f5f5f5;
		padding: 4px 20px;
	}
	tbody tr {
		transition: all, 0.2s;
	}
	tbody tr:hover {
		background: #f5f5f5;
	}
</style>
