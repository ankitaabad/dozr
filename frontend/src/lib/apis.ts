import { get } from "svelte/store";
import { customerId,  refreshDozerStores } from "./store";
import { server } from "./utils";


export async function  addMoneyApi(amount){
  console.log("inside add money api")
  const data = JSON.stringify({
    amount:Number(amount)
  });
  const customer_id = get(customerId)
  const config = {
    method: 'put',
    url: `customers/${customer_id}/addMoney`,
    
    data : data
  };
  
  await server(config).then(async (response) => {
    console.log("added the money")
    refreshDozerStores("recentTransactionsStore","customerBalanceStore")
  })
  .catch((error) => {
    console.log(error);
  });
}

