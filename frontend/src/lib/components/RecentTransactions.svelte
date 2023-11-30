<script lang="ts">
	import { recentTransactionsStore } from '$lib/store';
	import { dozerRest, server } from '$lib/utils';
	import { DataHandler, Datatable, Th, ThFilter } from '@vincjo/datatables';
	$: handler = new DataHandler($recentTransactionsStore, { rowsPerPage: 5 });
	$: rows = handler.getRows();
</script>
<div class="w-1/2">
  <Datatable {handler} search={false} rowsPerPage={false} rowCount={false} >
    <table>
      <thead>
        <tr>
          <Th {handler} orderBy="date">Date</Th>
          <Th {handler} orderBy="amount">Amount</Th>
          <Th {handler} orderBy="desc">Description</Th>
        </tr>
        <tr>
          <ThFilter {handler} filterBy="date" />
          <ThFilter {handler} filterBy="amount" />
          <ThFilter {handler} filterBy="desc" />
        </tr>
      </thead>
      <tbody>
        {#each $rows as row}
          <tr>
            <td>{row.date}</td>
            <td>{row.amount}</td>
            <td>{row.desc}</td>
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
