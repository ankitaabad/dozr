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
  <div class="w-[100%] flex gap-6">
    <div class="w-[100%] bg-white rounded-md p-6 border  border-solid border-gray-200 ">
      <div class="heading mb-6 flex justify-between items-center">
        <h2 class="font-medium text-lg">108 Shares</h2>
        <!-- <a href="#" class="text-primary-500 font-medium">View all</a> -->
      </div>
      <div class="w-full flex justify-between">
        <div class="">
          <div class="pb-4 border-b border-solid border-gray-100 flex justify-between w-full">
            <div>Current Value</div>
            <div class="flex flex-col items-end">
              <div class=" ">-21.60(3.69%)</div>
              <div><b>{$stockDetailStore.details.price}</b></div>
            </div>
          </div>
        </div>
        <div class="">
          <div class="py-4 border-b border-solid border-gray-100 flex justify-between w-full">
            <div>Invested Value</div>
            <div class="flex flex-col items-end">
              <div class=" ">38.60(1.23%)</div>
            </div>
          </div>
        </div>
        
        <div class="">
          <div class="py-4 border-b border-solid border-gray-100 flex justify-between w-full">
            <div>Mkt Price</div>
            <div class="flex flex-col items-end">
              <div class="text-success-500 ">-1.55(0.78%)</div>
            </div>
          </div>
        </div>
        <div class="">
          <div class="py-4  flex justify-between w-full">
            <div class="font-medium">Total Returns</div>
            <div class="flex flex-col items-end">
              <div class="text-success-500 font-medium">+₹508.68(51.53%)</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="flex gap-6 mt-6">
    <div class="w-[100%] flex gap-6">
      <div class="w-[100%] bg-white rounded-md p-6 border  border-solid border-gray-200 ">
        <div class="heading mb-6 flex justify-between items-center">
          <h2 class="font-medium text-lg">Standard Industries Ltd.</h2>
          <!-- <a href="#" class="text-primary-500 font-medium">View all</a> -->
        </div>
        <Chart data={data} type="line" />
        <Chart data={data} type="axis-mixed" />
      </div>
    </div>

    <!-- <div class="w-[25%] bg-white rounded-md p-6 border  border-solid border-gray-200 ">
      <div class="heading mb-6 flex justify-between items-center">
        <h2 class="font-medium text-lg">108 Shares</h2>
      </div>
      
      <div class="w-full ">
        <div class="">
          <div class="pb-4 border-b border-solid border-gray-100 flex justify-between w-full">
            <div>Current Value</div>
            <div class="flex flex-col items-end">
              <div class=" ">-21.60(3.69%)</div>
            </div>
          </div>
        </div>
        <div class="">
          <div class="py-4 border-b border-solid border-gray-100 flex justify-between w-full">
            <div>Invested Value</div>
            <div class="flex flex-col items-end">
              <div class=" ">38.60(1.23%)</div>
            </div>
          </div>
        </div>
        
        <div class="">
          <div class="py-4 border-b border-solid border-gray-100 flex justify-between w-full">
            <div>Mkt Price</div>
            <div class="flex flex-col items-end">
              <div class="text-success-500 ">-1.55(0.78%)</div>
            </div>
          </div>
        </div>
        <div class="">
          <div class="py-4 border-b border-solid border-gray-100 flex justify-between w-full">
            <div>Avg Price</div>
            <div class="flex flex-col items-end">
              <div class=" ">2.30(1.11%)</div>
            </div>
          </div>
        </div>
        <div class="">
          <div class="py-4 border-b border-solid border-gray-100 flex justify-between w-full">
            <div>1D Returns</div>
            <div class="flex flex-col items-end">
              <div class="text-error-500 ">38.60(1.23%)</div>
            </div>
          </div>
        </div>
        <div class="">
          <div class="py-4  flex justify-between w-full">
            <div class="font-medium">Total Returns</div>
            <div class="flex flex-col items-end">
              <div class="text-success-500 font-medium">+₹508.68(51.53%)</div>
            </div>
          </div>
        </div>
      </div>
		</div> -->
   
  </div>
</div>
{JSON.stringify($stockDetailStore.details)}
