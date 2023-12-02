<script lang="ts">
	import { loansStore } from '$lib/store';
	import { DataHandler, Datatable, Th, ThFilter } from '@vincjo/datatables';
	$: handler = new DataHandler($loansStore, { rowsPerPage: 5 });
	$: rows = handler.getRows();
</script>

<div class="w-full card px-4 py-6">
	<Datatable {handler} search={false} rowsPerPage={false} rowCount={false}>
		<table>
			<thead>
				<tr>
					<Th {handler} orderBy="loan_type">Loan Type</Th>
					<Th {handler} orderBy="EMI">EMI</Th>
					<Th {handler} orderBy="repayment_schedule">repayment_schedule</Th>
					<Th {handler} orderBy="">&nbsp;</Th>
				</tr>
				<tr>
					<ThFilter {handler} filterBy="loan_type" />
					<ThFilter {handler} filterBy="EMI" />
					<ThFilter {handler} filterBy="repayment_schedule" />
					<ThFilter {handler} filterBy="" />
				</tr>
			</thead>
			<tbody>
				{#each $rows as row}
					<tr>
						<td>{row.loan_type}</td>
						<td>{row.EMI}</td>
						<td>{row.repayment_schedule}</td>
						<td
							><button
								type="button"
								class=" btn btn-sm rounded-md px-6 bg-primary-500 variant-filled-primary"
								>Sell</button
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
