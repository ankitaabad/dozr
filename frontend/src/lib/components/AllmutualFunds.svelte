<script lang="ts">
	import { allMutualFundsStore } from '$lib/store';
	import { DataHandler, Datatable, Th, ThFilter } from '@vincjo/datatables';
	$: handler = new DataHandler($allMutualFundsStore, { rowsPerPage: 5 });
	$: rows = handler.getRows();
</script>

<div class="w-full card px-4 py-6">
	<Datatable {handler} search={false} rowsPerPage={false} rowCount={true}>
		<table>
			<thead>
				<tr>
					<Th {handler} orderBy="fund_name">Name</Th>
					<Th {handler} orderBy="quantity">Quantity</Th>
					<Th {handler} orderBy="price">Avg. buy Price</Th>
				</tr>
				<tr>
					<ThFilter {handler} filterBy="fund_name" />
					<ThFilter {handler} filterBy="amount" />
					<ThFilter {handler} filterBy="price" />
				</tr>
			</thead>
			<tbody>
				{#each $rows as row}
					<tr>
						<td>
							<div class="flex gap-2 items-center">
								<img
									src={row.image_src}
									class="w-12 h-12 rounded border border-solid border-gray-300"
								/>
								<div>{row.fund_name}</div>
							</div>
						</td>
						<td class="font-medium s-FI5Y16UXR6H0">₹{row.quantity}</td>
						<td class="font-medium s-FI5Y16UXR6H0">₹{row.price}</td>
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
