const {
  mapCsv,
  randomIntFromInterval,
  mfChangePercentage,
  writeJSONToCsv,
} = require("./utils");
const { DateTime } = require("luxon");

async function backfillNav() {
  const funds = await mapCsv("../generated/mfData.csv", (row) => {
    return {mfId: row.mfId};
  });
  console.log({ funds });
  // console.log(DateTime.now().toFormat("yyyy-MM-dd"))
  const today = DateTime.now();
  console.log(today.toSQLDate());

  const threeYearBack = today.plus({ years: -1 });
  let count = 0;
  const result = [];
  const pricemap = {};
  const getFromPriceMap = (key) => {
    return pricemap[key] || randomIntFromInterval(20, 2000);
  };
  for (
    let i = threeYearBack;
    today.toSQLDate() !== i.toSQLDate();
    i = i.plus({ days: 1 })
  ) {
    funds.forEach((f) => {
      let prevDayKey = i.plus({days: -1}).toSQLDate() + f.mfId
      let price = parseFloat((getFromPriceMap(prevDayKey) *((100 + mfChangePercentage())/100)).toFixed(2))
      let todayKey = i.toSQLDate() + f.mfId

      pricemap[todayKey] = price  
      result.push({
        mfId: f.mfId,
        date: i.toSQLDate(),
        price : price

      });
    });

  }
  console.log({  result });
  writeJSONToCsv(result,"../generated/mfDailyPrice.csv")
}
backfillNav();
