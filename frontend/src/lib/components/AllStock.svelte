<script lang="ts">
	import { allStocksStore } from '$lib/store';
	import { dozerRest, server } from '$lib/utils';
	import { DataHandler, Datatable, Th, ThFilter } from '@vincjo/datatables';
	import { getModalStore, type ModalSettings } from '@skeletonlabs/skeleton';
	const modalStore = getModalStore();
	function buyStocks(stock_id, company_name) {
    console.log("inside add money")
		const modal: ModalSettings = {
			type: 'component',
			component: 'buyStocksModel',
      meta:{stock_id,company_name}
		};
    console.log({modal})

		modalStore.trigger(modal);
	}

  $: handler = new DataHandler($allStocksStore, { rowsPerPage: 10 });
	$: rows = handler.getRows();
</script>

<div class="w-full card px-4 py-6">
	<Datatable {handler} search={false} rowsPerPage={false} rowCount={false}>
		<table>
			<thead>
				<tr>
					<Th {handler} orderBy="company_name">Stock</Th>
					<Th {handler} orderBy="industry">Industry</Th>
					<Th {handler} orderBy="price">Price</Th>

					<Th {handler} orderBy="">&nbsp;</Th>
				</tr>
        <!-- <tr>
					<ThFilter {handler} orderBy="company_name"/>
					<ThFilter {handler} orderBy="industry"/>
					<ThFilter {handler} orderBy="price"/>

				</tr> -->
			</thead>
			<tbody>
				{#each $rows as row}
					<tr>
						<td>{row.company_name}</td>
						<td>{row.industry}</td>
						<td>{row.price.toFixed(2)}</td>
						<td
							><button
								type="button"
								class=" btn btn-sm rounded-md px-6 bg-primary-500 variant-filled-primary"
								on:click={()=> buyStocks(row.stock_id,row.company_name)}
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
