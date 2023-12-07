<script lang="ts">
	import { topYearlyStock } from '$lib/store';
	import { dozerRest, server } from '$lib/utils';
	import { DataHandler, Datatable, Th, ThFilter } from '@vincjo/datatables';
	import { getModalStore, type ModalSettings } from '@skeletonlabs/skeleton';

	$: handler = new DataHandler($topYearlyStock, { rowsPerPage: 10 });
	$: rows = handler.getRows();
</script>

<div class="w-full ">
	<Datatable {handler} search={false} rowsPerPage={false} rowCount={true} pagination={false}>
		<table>
			<thead>
				<tr>
					<Th {handler} orderBy="company_name">Name</Th>
					<Th {handler} orderBy="industry">Industry</Th>
					<Th {handler} orderBy="yearly_change">Yearly Change</Th>
					<Th {handler} orderBy="market_capital">Market Capital</Th>
					<Th {handler} orderBy="price">Price</Th>
				</tr>
			</thead>
			<tbody>
				{#each $rows as row}
					<tr>
						<td>{row?.company_name}</td>
						<td>{row?.industry}</td>
						<td class="font-medium">{row?.yearly_change.toFixed(2)}%</td>
						<td class="font-medium">₹{row?.market_capital.toFixed(2)} (Cr)</td>
						<td class="font-medium">₹{row?.price.toFixed(2)}</td>
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
