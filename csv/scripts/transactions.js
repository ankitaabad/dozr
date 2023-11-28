const {
  mapCsv,
  randomIntFromInterval,
  writeJSONToCsv,
} = require("./utils");

async function addTransactions() {
  const customers = await mapCsv("../generated/customers.csv", (row) => {
    return row
  });
  const stocks = await mapCsv("../generated/stocks.csv", (row) => {
    return row
  });
  

  writeJSONToCsv(customers, "../generated/customers.csv");
}
addTransactions();
