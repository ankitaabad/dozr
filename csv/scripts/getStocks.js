const kuuid = require("kuuid");
const { mapCsv, writeJSONToCsv } = require("./utils");

async function getStocks() {
  let stocks = await mapCsv("../scraped/stocks.csv", function (row) {
    const company_name = row.companyName.split(" ").slice(0, -1).join(" ");
    const symbol = row.companyName.split(" ").pop();
    return {
      stock_id: kuuid.id(),
      company_name,
      symbol,
      industry: row.industry,
      market_capital: Number(
        row.marketCap
          .toLowerCase()
          .split("")
          .filter((ch) => !["c", "r", "s", "₹", ",", " "].includes(ch))
          .join("")
      ),
    };
  });

  writeJSONToCsv(stocks, "../generated/stocks.csv");
  console.log({ count: stocks.length });
}

getStocks();
