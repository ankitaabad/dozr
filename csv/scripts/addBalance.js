const {
  mapCsv,
  randomIntFromInterval,
  writeJSONToCsv,
} = require("./utils");

async function addBalance() {
  const customers = await mapCsv("../growthgenie/customers.csv", (row) => {
    return { 
      customer_id : row.CUSTOMERID,
      first_name: row.FIRSTNAME,
      last_name: row.LASTNAME,
      gender: row.GENDER,
      balance : randomIntFromInterval(5000,50000)*100,
      address : row.ADDRESS,
      email: row.EMAIL,
      phone: row.PHONE
    };
  });

  writeJSONToCsv(customers, "../generated/customers.csv");
}
addBalance();
