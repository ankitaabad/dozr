<script lang="ts">
	import { recentTransactionsStore } from '$lib/store';
	import { DataHandler, Datatable, Th, ThFilter } from '@vincjo/datatables';
	import { DateTime } from 'luxon';
	$: handler = new DataHandler($recentTransactionsStore, { rowsPerPage: 5 });
	$: rows = handler.getRows();

  function convertDate(date) {
    return DateTime.fromISO(date).toFormat("MM-dd-yyyy hh:mm")
  }
</script>

<div class="w-full card p-4">
	<Datatable {handler} search={false} rowsPerPage={false} rowCount={true}>
		<table>
			<thead>
				<tr>
					<Th {handler} orderBy="date"> Date</Th>
					<Th {handler} orderBy="amount">Amount</Th>
					<Th {handler} orderBy="desc">Description</Th>
				</tr>
				<tr>
					<ThFilter {handler} filterBy="date" />
					<ThFilter {handler} filterBy="amount" />
					<ThFilter {handler} filterBy="desc" />
				</tr>
			</thead>
			<tbody>
				{#each $rows as row}
					<tr>
						<td>{convertDate(row.date)} </td>
						<td>₹{row.amount}</td>
						<td>{row.desc}</td>
					</tr>
				{/each}
			</tbody>
		</table>
	</Datatable>
</div>

<style>
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
