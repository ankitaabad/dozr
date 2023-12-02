const { DateTime } = require("luxon");
const { Pool, Client } = require("pg");
const {
  mfChangePercentage,
  randomPricePercentageChange,
  change,
} = require("./utils");
async function cron() {
  const client = new Client({
    user: "postgres",
    host: "68.183.85.136",
    port: 5689,
    // host: 'srv-captain--pgdb',
    // port: 5432,

    database: "postgres",
    password: "pgpass",
  });

  await client.connect();
  const today = DateTime.now();
  const tomorrow = today.plus({ days: 1 });
  const aYearBefore = tomorrow.plus({ year: -1 });
  console.log();
  const result = await client.query(
    `select stock_id,price, (select price from stocks_daily_price sdpold where "date" = '${aYearBefore.toSQLDate()}' and stock_id = sdp.stock_id) year_old_price from stocks_daily_price sdp where date = '${today.toSQLDate()}'`
  );

  const stockChanges = {}
    let sq = "with ss as (SELECT * FROM (VALUES" 
  const x = result.rows
x.forEach((row,i) => {
    const newPrice = randomPricePercentageChange(row.price);
    const dailyChange = change(newPrice, row.price);
    const yearlyChange = change(newPrice, row.year_old_price);
    sq += `('${
      row.stock_id
    }', '${tomorrow.toSQLDate()}'::date, ${newPrice}, ${dailyChange}, ${yearlyChange})`;


    if(i< x.length-1){
      sq+=','
    }
  });
  sq += `) AS t (stock_id,date,price,daily_change,yearly_change)), ist as ( INSERT INTO stocks_daily_price (stock_id, "date", price)  select stock_id, "date", price from ss) update stocks s set price = sstable.price, daily_change = sstable.daily_change, yearly_change = sstable.yearly_change  from ss sstable where s.stock_id = sstable.stock_id `
  // console.log({sq})

  const r = await client.query(sq)

  await client.end();
}

cron();
