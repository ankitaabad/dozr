<script>

import {
  customerStockInvestmentValueStore,
  customerMFInvestmentValueStore,
  customerTotalInvestmentValueStore
} from '$lib/store';

</script>

<fieldset>
  <legend> stock investment</legend>
  <div>{$customerStockInvestmentValueStore[0]?.investment}</div>
  <div>{$customerStockInvestmentValueStore[0]?.present_value}</div>

</fieldset>

<fieldset>
  <legend> mf investment</legend>
  <div>{$customerMFInvestmentValueStore[0]?.investment}</div>
  <div>{$customerMFInvestmentValueStore[0]?.present_value}</div>

</fieldset>

<fieldset>
  <legend> total investment</legend>
  <div>{$customerTotalInvestmentValueStore[0]?.total_investment}</div>
  <div>{$customerTotalInvestmentValueStore[0]?.total_present_value}</div>

</fieldset>
