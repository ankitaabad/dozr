<script lang="ts">
	import { stockDetailStore } from "$lib/store";
  

  import Chart from 'svelte-frappe-charts';


$: labels = $stockDetailStore.dailyPrices.map(d =>{
  return d.date
})

$: values = $stockDetailStore.dailyPrices.map(d =>{
  return d.price
})



 $: data = {
    labels: labels,
    datasets: [
      {
        values: values
      }
    ]
  };
</script>
<Chart data={data} type="line" />
<div>{JSON.stringify($stockDetailStore.details)}</div>

