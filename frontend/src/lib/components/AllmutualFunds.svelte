<script lang="ts">
	import { recentTransactionsStore } from '$lib/store';
	import { DataHandler, Datatable, Th, ThFilter } from '@vincjo/datatables';
	$: handler = new DataHandler($recentTransactionsStore, { rowsPerPage: 5 });
	$: rows = handler.getRows();
</script>

<div class="w-full card px-4 py-6">
	<Datatable {handler} search={false} rowsPerPage={false} rowCount={false}>
		<table>
			<thead>
				<tr>
					<Th {handler} orderBy="date">Name</Th>
					<Th {handler} orderBy="amount">1Y</Th>
					<Th {handler} orderBy="desc">3Y</Th>
					<Th {handler} orderBy="desc1">5Y</Th>
					<Th {handler} orderBy="">&nbsp;</Th>
				</tr>
				<tr>
					<ThFilter {handler} filterBy="date" />
					<ThFilter {handler} filterBy="amount" />
					<ThFilter {handler} filterBy="desc" />
					<ThFilter {handler} filterBy="desc1" />
					<ThFilter {handler} filterBy="" />
				</tr>
			</thead>
			<tbody>
				{#each $rows as row}
					<tr>
						<td>
							<div class="flex gap-2 items-center">
								<div class="w-12 h-12 rounded backdrop-brightness-50" />
								<div>HSBC Small Cap Fund Direct Growth</div>
							</div>
						</td>
						<td>27.46%</td>
						<td>27.46%</td>
						<td>27.46%</td>

						<td
							><button
								type="button"
								class=" btn btn-sm rounded-md px-6 bg-primary-500 variant-filled-primary"
								>Buy</button
							></td
						>
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
