<script lang="ts">
	import { customerMutualFundsStore } from '$lib/store';
	import { DataHandler, Datatable, Th, ThFilter } from '@vincjo/datatables';
	$: handler = new DataHandler($customerMutualFundsStore, { rowsPerPage: 5 });
	$: rows = handler.getRows();
</script>

<div class="w-full card p-4">
	<Datatable {handler} search={false} rowsPerPage={false} rowCount={true}>
		<table>
			<thead>
				<tr>
					<Th {handler} orderBy="fund_name">Name</Th>
					<Th {handler} orderBy="amount">Quantity</Th>
					<Th {handler} orderBy="desc">Avg. buy Price</Th>
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
						<td>{row.quantity}</td>
						<td class="font-medium s-FI5Y16UXR6H0">₹{row.avg_price.toFixed(2)}</td>
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
