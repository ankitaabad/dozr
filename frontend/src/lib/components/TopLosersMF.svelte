<script lang="ts">
	import { topMFLosersStore } from '$lib/store';
	import { dozerRest, server } from '$lib/utils';
	import { DataHandler, Datatable, Th, ThFilter } from '@vincjo/datatables';
	import { getModalStore, type ModalSettings } from '@skeletonlabs/skeleton';
	const modalStore = getModalStore();
  function buyMF(row) {
		console.log('inside buy MF');
		const modal: ModalSettings = {
			type: 'component',
			component: 'buyMFModel',
			meta: row
		};
		console.log({ modal });

		modalStore.trigger(modal);
	}
	const handler = new DataHandler($topMFLosersStore, { rowsPerPage: 10 });
	const rows = handler.getRows();
  topMFLosersStore.subscribe(data => {
    handler.setRows(data)
  })
</script>

<div class="w-full">
	<Datatable {handler} search={false} rowsPerPage={false} rowCount={true}>
		<table>
			<thead>
				<tr>
					<Th {handler} orderBy="fund_name">Name</Th>
					<Th {handler} orderBy="daily_change">Gain</Th>
					<Th {handler} orderBy="price">Price</Th>
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
								<div>{row.fund_name}</div>
							</div>
						</td>
						<td class="text-error-500">{row.daily_change.toFixed(2)}</td>
						<td class="font-medium s-FI5Y16UXR6H0">₹{row.price.toFixed(2)}</td>
						<td
							><button
								type="button"
								class=" btn btn-sm rounded-md px-6 bg-primary-500 variant-filled-primary"
								on:click={() => buyMF(row)}>Buy</button
							></td
						>
					</tr>
				{/each}
			</tbody>
		</table>
	</Datatable>
</div>

<style>
	table {
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
	footer {
		border-top: 0;
	}
</style>
