<script lang="ts">
	import { recentTransactionsStore } from '$lib/store';
	import { DataHandler, Datatable, Th, ThFilter } from '@vincjo/datatables';
	import { DateTime } from 'luxon';
	$: handler = new DataHandler($recentTransactionsStore, { rowsPerPage: 5 });
	$: rows = handler.getRows();

	function convertDate(date) {
		return DateTime.fromISO(date).toFormat('MM-dd-yyyy hh:mm');
	}
</script>

<div class="w-full">
	<Datatable {handler} search={false} rowsPerPage={false} rowCount={true}>
		<table>
			<thead>
				<tr>
					<Th {handler} orderBy="date">Date</Th>
					<Th {handler} orderBy="desc">Description</Th>
					<Th {handler} orderBy="amount">Amount</Th>
				</tr>
				<tr>
					<ThFilter {handler} filterBy="date" />
					<ThFilter {handler} filterBy="desc" />
					<ThFilter {handler} filterBy="amount" />
				</tr>
			</thead>
			<tbody>
				{#each $rows as row}
					<tr>
						<td>{convertDate(row.date)} </td>
						<td>{row.desc}</td>
						<td class="font-medium">₹{row?.amount.toLocaleString('en-in')}</td>
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
		border-radius: 6px;
	}
	thead {
		background: #fff;
	}
	thead th input{
		font-style: normal;
	}
	tbody td {
		border: 1px solid #e5e7eb;
		padding: 4px 20px;
	}
	tbody td::first-letter {
		text-transform: capitalize;
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
