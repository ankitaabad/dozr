const kuuid = require("kuuid");
const { DateTime } = require("luxon");
const { mapCsv, writeJSONToCsv, randomIntFromInterval } = require("./utils");

async function getLoans() {
  let stocks = await mapCsv("../growthgenie/fixed_deposits.csv", function (row) {
    // return {
    //   loan_id: row["LOANID"],
    //   customer_id: row["CUSTOMERID"],
    //   loan_type: row["LOANTYPE"],
    //   loan_amount: row["LOANAMOUNT"],
    //   interest_rate: row["INTERESTRATE"],
    //   loan_status: row["LOANSTATUS"],
    //   emi: row["EMI"],
    //   loan_term: row["LOANTERM"],
    //   repayment_schedule: row["REPAYMENTSCHEDULE"],
    //   Disbursement_Date: DateTime.now()
    //     .plus({ days: randomIntFromInterval(-2000, -300) })
    //     .toSQLDate(),
    // };
    const today = DateTime.now()
    today.di
return {
  
    fd_id :row["FIXEDDEPOSITID"],
    customer_id :randomIntFromInterval(1001,2500),
    principal_amount :row["PRINCIPALAMOUNT"],
    interest_rate :row["INTERESTRATE"],
    maturity_date :row["MATURITYDATE"],
    interset_payment_frequency :row["INTERESTPAYMENTFREQUENCY"],
    maturity_amount :row["MATURITYAMOUNT"]
}
}

  });
  // take around 700 stocks out of 2000 stocks

  writeJSONToCsv(stocks, "../generated/loans.csv");
  // console.log({ count: stocks.length });
}

getLoans();
