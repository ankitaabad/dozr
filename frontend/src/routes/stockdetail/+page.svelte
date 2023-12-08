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
<!-- <div>{JSON.stringify($stockDetailStore)}</div> -->
<Chart data={data} type="line" />
