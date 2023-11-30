const kuuid = require("kuuid");
const { DateTime } = require("luxon");

const {
  mapCsv,
  randomIntFromInterval,
  writeJSONToCsv,
  roundFloat,
} = require("./utils");

async function addTransactions() {
  const customers = await mapCsv("../generated/customers.csv", (row) => {
    return row
  });
  const stocks = await mapCsv("../generated/stocks.csv", (row) => {
    return row
  });
  const stockPrice = await mapCsv("../generated/stocks_daily_price.csv", (row) => {
    return row
  });
  const transactions = []
  const customer_stocks = []
  const stocks_buy = []
  const stocks_sell = []
  const stockPriceMap = {}
  stockPrice.forEach(sp => {
    stockPriceMap[ sp.date+sp.stock_id] = sp.price
  })
  customers.forEach(customer => {
    const today = DateTime.now();
    for( let i= 0 ; i<10; i++ ){
      const randomBuyDays = randomIntFromInterval(10,1000)
      const randomSaleDays = randomIntFromInterval(1,randomBuyDays)
      const randomBuyDate = today.plus({days: -randomBuyDays })
      const randomSaleDate =  today.plus({days: -randomSaleDays })
      const randomBuyDateSql = randomBuyDate.toSQLDate()
      const randomSaleDateSql = randomSaleDate.toSQLDate()
  
      const buyQuantity = randomIntFromInterval(200,5000)
      const sellQuantity = randomIntFromInterval(100,buyQuantity)
      // console.log({buyQuantity,saleQuantity: sellQuantity,randomBuyDate,randomSaleDate})
      // console.log({stocks})
      console.log({len: stocks.length})
      const count = randomIntFromInterval(0,stocks.length-1)
      console.log({count})
      const stockToBuy = stocks[count]
      const buyPrice = roundFloat(stockPriceMap[randomBuyDateSql + stockToBuy.stock_id])
      const buyid = kuuid.id()
      stocks_buy.push({
        id: buyid,
        stock_id : stockToBuy.stock_id,
        quantity: buyQuantity,
        buy_date: randomBuyDateSql,
        price: buyPrice,
        remaining_quantity: buyQuantity - sellQuantity,
        customer_id: customer.customer_id,

        
      })
      transactions.push({
        id : kuuid.id(),
        amount: roundFloat(buyPrice * buyQuantity),
        date: randomBuyDate.toISO(),
        customer_id: customer.customer_id,
        // transaction_id : buyid,
        desc: `Bought ${buyQuantity} stocks of ${stockToBuy.company_name}`
      })
      const sellPrice = roundFloat(stockPriceMap[randomSaleDateSql + stockToBuy.stock_id])
      const sellid = kuuid.id() 
      stocks_sell.push({
        id : sellid,
        stock_id : stockToBuy.stock_id,
        date: randomBuyDateSql,
        quantity: sellQuantity,
        price: sellPrice,
        customer_id: customer.customer_id,

      })
      if(buyQuantity> sellQuantity){
        customer_stocks.push({
          customer_id: customer.customer_id,
          stock_id : stockToBuy.stock_id,
          quantity: buyQuantity - sellQuantity,
          avg_price: buyPrice
        })
      }
      transactions.push({
        id : kuuid.id(),
        date: randomSaleDate.toISO(),
        amount: roundFloat(sellQuantity*sellPrice) ,
        customer_id: customer.customer_id,

        // transaction_id : buyid,
        desc: `sold ${sellQuantity} stocks of ${stockToBuy.company_name}`
      })
      break
    }
   console.log({transactions})

    

  })


  writeJSONToCsv(customer_stocks, "../generated/customer_stocks.csv");

  writeJSONToCsv(stocks_sell, "../generated/stocks_sell.csv");

  writeJSONToCsv(stocks_buy, "../generated/stocks_buy.csv");

  writeJSONToCsv(transactions, "../generated/transactions.csv");
}
addTransactions();
