const kuuid = require("kuuid");
const { DateTime } = require("luxon");
const { mapCsv, writeJSONToCsv, randomIntFromInterval } = require("./utils");

async function getLoans() {
  let stocks = await mapCsv("../growthgenie/loans.csv", function (row) {
    return {
      loan_id: row["LOANID"],
      customer_id: row["CUSTOMERID"],
      loan_type: row["LOANTYPE"],
      loan_amount: row["LOANAMOUNT"],
      interest_rate: row["INTERESTRATE"],
      loan_status: row["LOANSTATUS"],
      emi: row["EMI"],
      loan_term: row["LOANTERM"],
      repayment_schedule: row["REPAYMENTSCHEDULE"],
      Disbursement_Date: DateTime.now()
        .plus({ days: randomIntFromInterval(-2000, -300) })
        .toSQLDate(),
    };
  });
  // take around 700 stocks out of 2000 stocks

  writeJSONToCsv(stocks, "../generated/loans.csv");
  // console.log({ count: stocks.length });
}

getLoans();
