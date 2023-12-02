const {
  mapCsv,
  randomIntFromInterval,
  mfChangePercentage,
  writeJSONToCsv,
  change,
  roundFloat,
} = require("./utils");
const { DateTime } = require("luxon");

async function backfillStocks() {
  let stocks = await mapCsv("../generated/stocks.csv", (row) => {
    return row;
  });

  console.log({ stocks });
  // console.log(DateTime.now().toFormat("yyyy-MM-dd"))
  const today = DateTime.now();
  console.log(today.toSQLDate());

  const threeYearBack = today.plus({ years: -3 });
  const result = [];
  const pricemap = {};
  const getFromPriceMap = (key) => {
    return pricemap[key] || randomIntFromInterval(20, 3000);
  };
  const newStocks = [];
  for (let i = threeYearBack; today.toSQLDate() >= i.toSQLDate(); ) {
    i = i.plus({ days: 1 });

    stocks.forEach((s) => {
      let prevDayKey = i.plus({ days: -1 }).toSQLDate() + s.stock_id;
      let price = roundFloat(
        getFromPriceMap(prevDayKey) * ((100 + mfChangePercentage()) / 100)
      );
      let todayKey = i.toSQLDate() + s.stock_id;

      if (i.toSQLDate() === today.toSQLDate()) {
        const lastDayPrice =
          pricemap[i.plus({ days: -1 }).toSQLDate() + s.stock_id] || 0;
        const lastYearPrice =
          pricemap[i.plus({ days: -365 }).toSQLDate() + s.stock_id] || 0;

        newStocks.push({
          ...s,
          price,
          daily_change: change(price, lastDayPrice),
          yearly_change: change(price, lastYearPrice),
        });
      }
      pricemap[todayKey] = price;


      result.push({
        stock_id: s.stock_id,
        date: i.toSQLDate(),
        price: price,
      });
    });
  }
  writeJSONToCsv(result, "../generated/stocks_daily_price.csv");
  writeJSONToCsv(newStocks, "../generated/stocks.csv");

}
backfillStocks();
