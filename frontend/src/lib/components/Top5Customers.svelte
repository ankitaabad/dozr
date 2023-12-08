<script lang="ts">
	import { topInvestorsStore } from '$lib/store';
	import { DataHandler, Datatable, Th, ThFilter } from '@vincjo/datatables';
	$: handler = new DataHandler($topInvestorsStore, { rowsPerPage: 5 });
	$: rows = handler.getRows();
</script>

<div class="w-[100%] bg-white rounded-md p-6 border  border-solid border-gray-200 ">
	<div class="heading mb-6 flex justify-between items-center">
		<h2 class="font-medium text-lg">Top Customers</h2>
	</div>
	<div class="w-full ">
		<Datatable {handler} search={false} rowsPerPage={false} rowCount={false} pagination={false}>
			<table>
				<thead>
					<tr>
						<Th {handler} orderBy="Name">Name</Th>
						<Th {handler} orderBy="email">Email</Th>
						<Th {handler} orderBy="phone">Phone</Th>
						<Th {handler} orderBy="total_investment">Investment</Th>
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
									<div>
										<div>{row.first_name}
											{row.last_name}</div>
										
										<span class="text-sm text-gray-500 ">Customer Id: {row.customer_id}</span>
									</div>
								</div>
							</td>
							<td>{row.email}</td>
							<td>{row.phone}</td>
							<td class="font-medium">₹{row.total_investment.toLocaleString('en-in')}</td>
						</tr>
					{/each}
				</tbody>
			</table>
		</Datatable>
	</div>
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
