const fs = require("fs");
const { parse } = require("csv-parse");
const { Parser } = require("@json2csv/plainjs");

module.exports.mapCsv = async function (filePath, fn) {
  return new Promise((resolve, reject) => {
    let data = [];

    fs.createReadStream(filePath)
      .pipe(parse({ delimiter: ",", headers: true, columns: true }))
      .on("data", function (row) {
        data.push(fn(row));
      })
      .on("end", () => {
        resolve(data);
      })
      .on("error", () => {
        reject();
      });
  });
}

module.exports.writeJSONToCsv = function (data, filename) {
  const parser = new Parser({});
  const csv = parser.parse(data);
  fs.writeFileSync(filename, csv);
  // console.log(csv);
 
}


module.exports.randomIntFromInterval = function(min, max) { 
  return Math.floor(Math.random() * (max - min + 1) + min)
}

module.exports.mfChangePercentage = function(upto= 10) {

  // const rn = module.exports.randomIntFromInterval(-8900,9000)
  // const result = parseFloat((rn * 0.0005).toFixed(2))
   const rn = module.exports.randomIntFromInterval(-upto*100+5,upto*100)
  const result = parseFloat((rn /100).toFixed(2))
  // console.log({result})
  return result
}

module.exports.roundFloat = (f) => {
  try{
    
    return +Number(f).toFixed(2)

  }
  catch(err){
    console.log({f})
  }
}
module.exports.change = (newPrice, oldPrice) => {
  return !oldPrice
    ? 0
    : module.exports.roundFloat((newPrice - oldPrice) * 100 / oldPrice);
};

