<script lang="ts">
	import { recentTransactionsStore } from '$lib/store';
	import { getModalStore, type ModalSettings } from '@skeletonlabs/skeleton';
	import { DataHandler, Datatable, Th, ThFilter } from '@vincjo/datatables';
	$: handler = new DataHandler($recentTransactionsStore, { rowsPerPage: 5 });
	$: rows = handler.getRows();
  const modalStore = getModalStore();
	function sellStocks(stock_id, company_name) {
    console.log("inside sdll stocks")
		const modal: ModalSettings = {
			type: 'component',
			component: 'sellStocksModel',
      meta:{stock_id,company_name}
		};
    console.log({modal})

		modalStore.trigger(modal);
	}
</script>

<div class="w-full card px-4 py-6">
	<Datatable {handler} search={false} rowsPerPage={false} rowCount={false}>
		<table>
			<thead>
				<tr>
					<Th {handler} orderBy="date">Date</Th>
					<Th {handler} orderBy="amount">Amount</Th>
					<Th {handler} orderBy="desc">Description</Th>
					<Th {handler} orderBy="">&nbsp;</Th>
				</tr>
				<tr>
					<ThFilter {handler} filterBy="date" />
					<ThFilter {handler} filterBy="amount" />
					<ThFilter {handler} filterBy="desc" />
					<ThFilter {handler} filterBy="" />
				</tr>
			</thead>
			<tbody>
				{#each $rows as row}
					<tr>
						<td>{row.date}</td>
						<td>{row.amount}</td>
						<td>{row.desc}</td>
						<td
							><button
								type="button"
								class=" btn btn-sm rounded-md px-6 bg-primary-500 variant-filled-primary"
                on:click={()=> sellStocks(row.stock_id,row.company_name)}

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
