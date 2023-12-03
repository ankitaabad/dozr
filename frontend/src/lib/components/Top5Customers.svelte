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
	<div class="w-full card p-4">
		<Datatable {handler} search={false} rowsPerPage={false} rowCount={false} pagination={false}>
			<table>
				<thead>
					<tr>
						<Th {handler} orderBy="Name">Name</Th>
						<Th {handler} orderBy="total_investment">Investment</Th>
						<Th {handler} orderBy="email">Email</Th>
						<Th {handler} orderBy="phone">Phone</Th>
					</tr>
				</thead>
				<tbody>
					{#each $rows as row}
						<tr>
							<td>
								<div class="flex gap-3 items-center">
									<div
										class="flex items-center justify-center w-10 h-10 rounded-full bg-gray-400 text-white"
									>
										<svg
											xmlns="http://www.w3.org/2000/svg"
											class="icon icon-tabler icon-tabler-user"
											width="24"
											height="24"
											viewBox="0 0 24 24"
											stroke-width="2"
											stroke="currentColor"
											fill="none"
											stroke-linecap="round"
											stroke-linejoin="round"
											><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path
												d="M8 7a4 4 0 1 0 8 0a4 4 0 0 0 -8 0"
											/><path d="M6 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2" /></svg
										>
									</div>
									{row.first_name}
									{row.last_name}
								</div>
							</td>
							<td class="font-medium">₹{row.total_investment.toFixed(2)}</td>
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
