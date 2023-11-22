const fs = require("fs");
const kuuid = require("kuuid");
const { stringify } = require("csv-stringify/sync");
const { mapCsv, writeJSONToCsv } = require("./utils");

async function getMFs() {
  const mfData = await mapCsv("../scraped/mfund.csv", function (row) {
    return {
      mfId: kuuid.id(),
      fundName: row.fundname,
      imageSrc: row.imagesrc,
    };
  });

  writeJSONToCsv(mfData, "../generated/mfData.csv");
}

getMFs();
