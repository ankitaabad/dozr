const {
  mapCsv,
  randomIntFromInterval,
  mfChangePercentage,
  writeJSONToCsv,
  change,
} = require("./utils");
const { DateTime } = require("luxon");

async function backfillNav() {
  const funds = await mapCsv("../generated/mutual_funds.csv", (row) => {
    return { mf_id: row.mf_id };
  });
  console.log({ funds });
  // console.log(DateTime.now().toFormat("yyyy-MM-dd"))
  const today = DateTime.now();
  console.log(today.toSQLDate());

  const threeYearBack = today.plus({ years: -4 });
  let count = 0;
  const result = [];
  const pricemap = {};
  const getFromPriceMap = (key) => {
    return pricemap[key] || randomIntFromInterval(20, 800);
  };
  for (
    let i = threeYearBack;
    today.toSQLDate() > i.toSQLDate();
    i = i.plus({ days: 1 })
  ) {
    funds.forEach((f) => {
      let prevDayKey = i.plus({ days: -1 }).toSQLDate() + f.mf_id;
      let price = parseFloat(
        (
          getFromPriceMap(prevDayKey) *
          ((100 + mfChangePercentage(5)) / 100)
        ).toFixed(2)
      );
      let todayKey = i.toSQLDate() + f.mf_id;
      const lastDayPrice =
        pricemap[i.plus({ days: -1 }).toSQLDate() + f.mf_id] || 0;
      const lastYearPrice =
        pricemap[i.plus({ days: -365 }).toSQLDate() + f.mf_id] || 0;

      pricemap[todayKey] = price;
      result.push({
        mf_id: f.mf_id,
        date: i.toSQLDate(),
        price: price,
        daily_change: change(price, lastDayPrice),
        yeary_change: change(price, lastYearPrice),
      });
    });
  }
  console.log({ result });
  writeJSONToCsv(result, "../generated/mf_daily_price.csv");
}
backfillNav();
