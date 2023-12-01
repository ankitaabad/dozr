<script lang="ts">
	import { topStockGainersStore } from '$lib/store';
	import { dozerRest, server } from '$lib/utils';
	import { DataHandler, Datatable, Th, ThFilter } from '@vincjo/datatables';
	$: handler = new DataHandler($topStockGainersStore, { rowsPerPage: 10 });
	$: rows = handler.getRows();
</script>
<div class="w-2/3">
  <Datatable {handler} search={false} rowsPerPage={false} rowCount={false}  >
    <table >
      <thead>
        <tr>
          <Th  {handler} orderBy="company_name">Stock</Th>
          <Th {handler} orderBy="daily_change">Gain</Th>
          <Th {handler} orderBy="price">Price</Th>
        </tr>
    
      </thead>
      <tbody>
        {#each $rows as row}
          <tr>
            <td>{row.company_name}</td>
            <td>{row.daily_change}</td>
            <td>{row.price}</td>
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
