<script lang="ts">
	import { topInvestorsStore } from '$lib/store';
	import { DataHandler, Datatable, Th, ThFilter } from '@vincjo/datatables';
	$: handler = new DataHandler($topInvestorsStore, { rowsPerPage: 5 });
	$: rows = handler.getRows();
</script>

<div class="w-[100%] card p-6">
	<div class="heading mb-6 flex justify-between items-center">
		<h2 class="font-medium text-lg">Top Customers</h2>
	</div>
	<div class="w-full card px-4 py-6">
		<Datatable {handler} search={false} rowsPerPage={false} rowCount={true}>
			<table>
				<thead>
					<tr>
						<Th {handler} orderBy="Name">Name</Th>
						<Th {handler} orderBy="balance">Balance</Th>
						<Th {handler} orderBy="email">Email</Th>
						<Th {handler} orderBy="phone">Phone</Th>
					</tr>
					<tr>
						<ThFilter {handler} filterBy="Name" />
						<ThFilter {handler} filterBy="balance" />
						<ThFilter {handler} filterBy="email" />
						<ThFilter {handler} filterBy="phone" />
					</tr>
				</thead>
				<tbody>
					{#each $rows as row}
						<tr>
							<td>{row.first_name} {row.last_name}</td>
							<td class="font-medium">₹{row.balance}</td>
							<td>{row.email}</td>
							<td>{row.phone}</td>
						</tr>
					{/each}
				</tbody>
			</table>
		</Datatable>
	</div>
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
