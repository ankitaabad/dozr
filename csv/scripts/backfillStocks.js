const {
  mapCsv,
  randomIntFromInterval,
  mfChangePercentage,
  writeJSONToCsv,
} = require("./utils");
const { DateTime } = require("luxon");

async function backfillStocks() {
  const stocks = await mapCsv("../generated/stocks.csv", (row) => {
    return { stock_id: row.stock_id };
  });
  console.log({ stocks });
  // console.log(DateTime.now().toFormat("yyyy-MM-dd"))
  const today = DateTime.now();
  console.log(today.toSQLDate());

  const fourYearBack = today.plus({ years: -3 });
  const result = [];
  const pricemap = {};
  const getFromPriceMap = (key) => {
    return pricemap[key] || randomIntFromInterval(20, 3000);
  };
  for (
    let i = fourYearBack;
    today.toSQLDate() !== i.toSQLDate();
    i = i.plus({ days: 1 })
  ) {
    stocks.forEach((s) => {
      let prevDayKey = i.plus({ days: -1 }).toSQLDate() + s.stock_id;
      let price = parseFloat(
        (
          getFromPriceMap(prevDayKey) *
          ((100 + mfChangePercentage()) / 100)
        ).toFixed(2)
      );
      let todayKey = i.toSQLDate() + s.stock_id;
      const lastDayPrice =
        pricemap[i.plus({ days: -1 }).toSQLDate() + s.stock_id] || 0;
      const lastYearPrice =
        pricemap[i.plus({ days: -365 }).toSQLDate() + s.stock_id] || 0;
     
      pricemap[todayKey] = price;
      result.push({
        stock_id: s.stock_id,
        date: i.toSQLDate(),
        price: price,
        daily_change: change(price, lastDayPrice),
        yeary_change: change(price, lastYearPrice),
      });


    });
  }
  writeJSONToCsv(result, "../generated/stocks_daily_price.csv");
}
backfillStocks();
