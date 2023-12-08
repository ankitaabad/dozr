<script lang="ts">
	import { customerMutualFundsStore } from '$lib/store';
	import { DataHandler, Datatable, Th, ThFilter } from '@vincjo/datatables';
	import { getModalStore, type ModalSettings } from '@skeletonlabs/skeleton';
	const modalStore = getModalStore();
	function sellMF(row) {
		console.log('inside sell MF');
		const modal: ModalSettings = {
			type: 'component',
			component: 'sellMFModel',
			meta: row
		};
		console.log({ modal });

		modalStore.trigger(modal);
	}

	const handler = new DataHandler($customerMutualFundsStore, { rowsPerPage: 5 });
	const rows = handler.getRows();

  customerMutualFundsStore.subscribe((data) => {
		handler?.setRows(data);
	});
</script>

<div class="w-full ">
	<Datatable {handler} search={false} rowsPerPage={false} rowCount={true}>
		<table>
			<thead>
				<tr>
					<Th {handler} orderBy="fund_name">Name</Th>
					<Th {handler} orderBy="amount">Quantity</Th>
					<Th {handler} orderBy="desc">Current Price</Th>
					<Th {handler} orderBy="">&nbsp;</Th>
				</tr>
			</thead>
			<tbody>
				{#each $rows as row}
					<tr>
						<td>
							<div class="flex gap-3 items-center">
								<img
									src={row.image_src}
									class="w-12 h-12 rounded border border-solid border-gray-300"
								/>
								<div>{row.fund_name}
									<span class="text-sm text-gray-500 ">Avg. buy Price: ₹{row.avg_price.toLocaleString('en-in')}</span></div>
							</div>
						</td>
						<td>{row.quantity}</td>
						<td class="font-medium s-FI5Y16UXR6H0">₹{row.price.toLocaleString('en-in')}</td>
						<td
							><button
								type="button"
								class=" btn btn-sm rounded-md px-6 bg-primary-500 variant-filled-primary"
								on:click={() => sellMF(row)}>Sell</button
							></td
						>
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
