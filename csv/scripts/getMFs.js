
const kuuid = require("kuuid");
const { mapCsv, writeJSONToCsv } = require("./utils");

async function getMFs() {
  const mfData = await mapCsv("../scraped/mfund.csv", function (row) {
    return {
      mf_id: kuuid.id(),
      fund_name: row.fundname,
      image_src: row.imagesrc,
      fund_size: Number(
        row.fundSize
          .toLowerCase()
          .split("")
          .filter((ch) => !["c", "r", "s", "₹", ",", " "].includes(ch))
          .join("")
      ),
    };
  });

  writeJSONToCsv(mfData, "../generated/mutual_funds.csv");
}

getMFs();
