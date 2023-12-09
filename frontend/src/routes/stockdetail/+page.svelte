<script lang="ts">
	import Stocks from "$lib/components/Stocks.svelte";
import { stockDetailStore } from "$lib/store";
	import { RowCount } from "@vincjo/datatables";
  import { DataHandler, Datatable, Th, ThFilter } from '@vincjo/datatables';
  $: handler = new DataHandler($stockDetailStore, { rowsPerPage: 10 });
	$: rows = handler.getRows();

  import Chart from 'svelte-frappe-charts';
$: labels = $stockDetailStore.dailyPrices.map(d =>{
  return d.date
})
$: values = $stockDetailStore.dailyPrices.map(d =>{
  return d.price
})

 $: data = {
    labels: labels.slice(0,12),
    datasets: [
      {
        values: values.slice(0,12)
      }
    ]
  };



</script>
<div class="max-w-7xl w-full mx-auto my-6 flex flex-col gap-6 ">
  <div class=""><a href="#" class="font-medium flex gap-2 items-center text-primary-500"><svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-arrow-left" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M5 12l14 0" /><path d="M5 12l6 6" /><path d="M5 12l6 -6" /></svg>Back </a></div>
  <div class="w-[100%] flex gap-6">
    <div class="w-[100%] bg-white rounded-md p-6 border  border-solid border-gray-200 ">
      <div class="heading mb-6 flex justify-between items-center">
        <h2 class="font-medium text-lg">108 Shares</h2>
        <!-- <a href="#" class="text-primary-500 font-medium">View all</a> -->
      </div>
     <div class="flex flex-col gap-6">
      <div class="w-full flex  gap-6">
        <div class="border border-solid border-gray-200 p-4 w-[25%] rounded-md">
          <div class=" flex justify-between w-full ">
            <div class="flex flex-col items-start">
              <div>Name</div>
              <div class="font-medium">{$stockDetailStore.details.company_name}</div>
            </div>
          </div>
        </div>
        <div class="border border-solid border-gray-200 p-4 w-[25%] rounded-md">
          <div class="flex justify-between w-full">
            <div class="flex flex-col items-start">
              <div>Price</div>
              <div class="font-medium">{$stockDetailStore.details.price}</div>
            </div>
          </div>
        </div>
        <div class="border border-solid border-gray-200 p-4 w-[25%] rounded-md">
          <div class="border-b border-solid border-gray-100 flex justify-between w-full">
            <div class="flex flex-col items-start">
              <div>Industry</div>
              <div class="font-medium">{$stockDetailStore.details.industry}</div>
            </div>
          </div>
        </div>
        <div class="border border-solid border-gray-200 p-4 w-[25%] rounded-md">
          <div class="flex justify-between w-full">
            <div class="flex flex-col items-start">
              <div>Market Capital</div>
              <div class="font-medium">{$stockDetailStore.details.market_capital}</div>
            </div>
          </div>
        </div>
      </div>
      <div class="w-full flex gap-6">
        <div class="border border-solid border-gray-200 p-4 w-[25%] rounded-md">
          <div class="flex justify-between ">
            <div class="flex flex-col items-start">
              <div>Daily Change</div>
              <div class="font-medium">{$stockDetailStore.details.daily_change}</div>
            </div>
          </div>
        </div>
        <div class="border border-solid border-gray-200 p-4 w-[25%] rounded-md">
          <div class=" flex justify-between">
            <div class="flex flex-col items-start">
              <div>Yearly Change</div>
              <div class="font-medium">{$stockDetailStore.details.yearly_change}</div>
            </div>
          </div>
        </div>
        <div class="border border-solid border-gray-200 p-4 w-[25%] rounded-md">
          <div class=" flex justify-between">
            <div class="flex flex-col items-start">
              <div>Symbol</div>
              <div class="font-medium">{$stockDetailStore.details.symbol}</div>
            </div>
          </div>
        </div>
        <div class=" p-4 w-[25%] rounded-md">
&nbsp;
        </div>
      </div>
     </div> 
    </div>
  </div>
  <div class="flex gap-6 ">
    <div class="w-[100%] flex gap-6">
      <div class="w-[100%] bg-white rounded-md p-6 border  border-solid border-gray-200 ">
        <div class="heading mb-6 flex justify-between items-center">
          <h2 class="font-medium text-lg">{$stockDetailStore.details.company_name}</h2>
        </div>
        <Chart data={data} type="line" />
      </div>
    </div>   
  </div>
</div>
<!-- {JSON.stringify($stockDetailStore.details)} -->
