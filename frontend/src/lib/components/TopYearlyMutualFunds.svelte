<script lang="ts">
	import { topYearlyMF } from '$lib/store';
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
	$: handler = new DataHandler($topYearlyMF, { rowsPerPage: 10 });
	$: rows = handler.getRows();
</script>

<div class="w-full">
	<Datatable {handler} search={false} rowsPerPage={false} rowCount={true}>
		<table>
			<thead>
				<tr>
					<Th {handler} orderBy="fund_name">Name</Th>
					<Th {handler} orderBy="fund_size">Quantity</Th>
					<Th {handler} orderBy="price">Price</Th>
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
								<div>
									<a
										href="/stockdetail?stock_id=001r7tOv0gSeoQ0S7nLA3szpLT2qCXfH"
										class="flex gap-2 items-center"
										>{row.fund_name}
										<svg
											xmlns="http://www.w3.org/2000/svg"
											class="icon icon-tabler icon-tabler-external-link"
											width="20"
											height="20"
											viewBox="0 0 24 24"
											stroke-width="1.5"
											stroke="#6366f1"
											fill="none"
											stroke-linecap="round"
											stroke-linejoin="round"
											><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path
												d="M12 6h-6a2 2 0 0 0 -2 2v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-6"
											/><path d="M11 13l9 -9" /><path d="M15 4h5v5" /></svg
										></a
									>
								</div>
							</div>
						</td>
						<td>{row.fund_size}</td>
						<td class="font-medium s-FI5Y16UXR6H0">₹{row.price.toLocaleString('en-in')}</td>
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
