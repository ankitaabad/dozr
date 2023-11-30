import { readable, writable } from "svelte/store";
import { dozerRest } from "./utils";
import {DateTime} from 'luxon'
export const isManager = writable(false) 
export const customerId = writable(0)


function createRecentTransactions() {
  const { subscribe, set, update } = writable([]);
  async function fetchData(){
    const data = JSON.stringify({
      $limit: 10,
      $filter: {
        customer_id: 1001
      }
    });
  
    const config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: '/recent_transactions/query',
      headers: {
        'Content-Type': 'application/json'
      },
      data: data
    };

    dozerRest.request(config).then((response) => {
      console.log("before updating recent transactino store")
      update(() => response.data)
    })
  }

  return {subscribe,set,update,fetchData}
}

function createDailyStockGainers() {
  const { subscribe, set, update } = writable([]);
  async function fetchData(){
    const data = JSON.stringify({
      "$order_by": {"daily_change": "desc"},
      "$limit": 10,
      "$filter": {"date":"2023-11-28"}

  });
        // "$filter": {"date":DateTime.now().toSQLDate()}

    const config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: '/dailyStocks/query',
      headers: {
        'Content-Type': 'application/json'
      },
      data: data
    };

    dozerRest.request(config).then((response) => {
      console.log("before updating top stock gainers store")
      update(() => response.data)
    })
  }

  return {subscribe,set,update,fetchData}
}

export const recentTransactionsStore = createRecentTransactions()
export const topStockGainersStore = createDailyStockGainers()