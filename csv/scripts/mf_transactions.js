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
  const mutual_funds = await mapCsv("../generated/mutual_funds.csv", (row) => {
    return row
  });
  const mfPrice = await mapCsv("../generated/mf_daily_price.csv", (row) => {
    return row
  });
  const transactions = []
  const customer_mfs = []
  const mf_buy = []
  const mf_sell = []
  const mfPriceMap = {}
  mfPrice.forEach(mfp => {
    mfPriceMap[ mfp.date+mfp.mf_id] = mfp.price
  })
  customers.forEach(customer => {
    const today = DateTime.now();
    const alreadyPurchased = []
    for( let i= 0 ; i<7; i++ ){
      const randomBuyDays = randomIntFromInterval(10,1000)
      const randomSaleDays = randomIntFromInterval(1,randomBuyDays)
      const randomBuyDate = today.plus({days: -randomBuyDays })
      const randomSaleDate =  today.plus({days: -randomSaleDays })
      const randomBuyDateSql = randomBuyDate.toSQLDate()
      const randomSaleDateSql = randomSaleDate.toSQLDate()
  
      const buyQuantity = randomIntFromInterval(200,5000)
      const sellQuantity = randomIntFromInterval(100,buyQuantity)
      // console.log({buyQuantity,saleQuantity: sellQuantity,randomBuyDate,randomSaleDate})
    
      console.log({len: mutual_funds.length})
      const count = randomIntFromInterval(0,mutual_funds.length-1)
      console.log({count})
      const mfToBuy = mutual_funds[count]
      if(alreadyPurchased.includes(mfToBuy.mf_id)){
        continue
      }
      alreadyPurchased.push(mfToBuy.mf_id)
      const buyPrice = roundFloat(mfPriceMap[randomBuyDateSql + mfToBuy.mf_id])
      const buyid = kuuid.id()
      mf_buy.push({
        id: buyid,
        mf_id : mfToBuy.mf_id,
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
        desc: `Bought ${buyQuantity} mutual funds of ${mfToBuy.fund_name}`
      })
      const sellPrice = roundFloat(mfPriceMap[randomSaleDateSql + mfToBuy.mf_id])
      const sellid = kuuid.id() 
      mf_sell.push({
        id : sellid,
        mf_id : mfToBuy.mf_id,
        date: randomBuyDateSql,
        quantity: sellQuantity,
        price: sellPrice,
        customer_id: customer.customer_id,

      })
      if(buyQuantity> sellQuantity){
        customer_mfs.push({
          customer_id: customer.customer_id,
          mf_id : mfToBuy.mf_id,
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
        desc: `sold ${sellQuantity} mutual funds of ${mfToBuy.fund_name}`
      })
      
    }
   console.log({transactions})

    

  })


  writeJSONToCsv(customer_mfs, "../generated/customer_mf.csv");

  writeJSONToCsv(mf_sell, "../generated/mf_sell.csv");

  writeJSONToCsv(mf_buy, "../generated/mf_buy.csv");

  writeJSONToCsv(transactions, "../generated/transactions_mfs.csv");
}
addTransactions();
