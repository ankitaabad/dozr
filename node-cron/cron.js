const { DateTime } = require("luxon");
const { Pool, Client } = require("pg");
const { randomPricePercentageChange, change } = require("./utils");
var cron = require('node-cron');
const axios = require('axios')


cron.schedule('58 23 * * *', async () => {
  const healthCheckEndpoint = process.env.healthChecksBaseURL
  console.log('running a task every minute', healthCheckEndpoint );
  await job()
});
async function job() {
  try {
    console.log("inside job")
    const {user,host, port,database,password} = process.env
    const p1 =  axios.default.get(`${healthCheckEndpoint}/start`)
    
    const client = new Client({
    user,
    host,
    port,
    database,
    password,
  });

  await client.connect();
 
  const today = DateTime.now();
  const tomorrow = today.plus({ days: 1 });
  const aYearBefore = tomorrow.plus({ year: -1 });
  console.log();
  const result = await client.query(
    `select stock_id,price, (select price from stocks_daily_price sdpold where "date" = '${aYearBefore.toSQLDate()}' and stock_id = sdp.stock_id) year_old_price from stocks_daily_price sdp where date = '${today.toSQLDate()}'`
  );

  let sq = "with ss as (SELECT * FROM (VALUES";
  // const x = result.rows;
  result.rows.forEach((row, i) => {
    const newPrice = randomPricePercentageChange(row.price);
    const dailyChange = change(newPrice, row.price);
    const yearlyChange = change(newPrice, row.year_old_price);
    sq += `('${
      row.stock_id
    }', '${tomorrow.toSQLDate()}'::date, ${newPrice}, ${dailyChange}, ${yearlyChange})`;

    if (i < result.rows.length - 1) {
      sq += ",";
    }
  });
  sq += `) AS t (stock_id,date,price,daily_change,yearly_change)), ist as ( INSERT INTO stocks_daily_price (stock_id, "date", price)  select stock_id, "date", price from ss) update stocks s set price = sstable.price, daily_change = sstable.daily_change, yearly_change = sstable.yearly_change  from ss sstable where s.stock_id = sstable.stock_id `;
  // console.log({sq})

  // const sqResult = await client.query(sq);

  // console.log({ sqResult });
  console.log("generating mf data");
  const mfdaily = await client.query(
    `select mf_id,price, (select price from mf_daily_price mfrold where "date" = '${aYearBefore.toSQLDate()}' and mf_id = mfdp.mf_id) year_old_price from mf_daily_price mfdp where date = '${today.toSQLDate()}'`
  );
  let mfsq = "with mfs as (SELECT * FROM (VALUES";
  const mfr = mfdaily.rows;
  mfr.forEach((row, i) => {
    const newPrice = randomPricePercentageChange(row.price);
    const dailyChange = change(newPrice, row.price);
    const yearlyChange = change(newPrice, row.year_old_price);
    mfsq += `('${
      row.mf_id
    }', '${tomorrow.toSQLDate()}'::date, ${newPrice}, ${dailyChange}, ${yearlyChange})`;

    if (i < mfr.length - 1) {
      mfsq += ",";
    }
  });
  mfsq += `) AS t (mf_id,date,price,daily_change,yearly_change)), ist as ( INSERT INTO mf_daily_price (mf_id, "date", price)  select mf_id, "date", price from mfs) update mutual_funds mf set price = mfstable.price, daily_change = mfstable.daily_change, yearly_change = mfstable.yearly_change  from mfs mfstable where mf.mf_id = mfstable.mf_id `;
  // console.log({sq})
  console.log({ mfsq });

  const mfsqResult = await client.query(mfsq);
  // mfsqResult.rowCount
  console.log({ mfsqResult });
  await client.end();
    const p2 = axios.default.get(`${healthCheckEndpoint}`)
    await Promise.all([p1,p2])
  }catch(err){
    await axios.default.get(`${healthCheckEndpoint}/fail}`).catch(err=> {})

  }
  
}


