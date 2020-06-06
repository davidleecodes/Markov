/** Command-line tool to generate Markov text. */
const argv = process.argv;
const fs = require("fs");
const axios = require("axios");
const { MarkovMachine } = require("./markov");

function readFile(path) {
  fs.readFile(path, "utf8", function (err, data) {
    if (err) {
      console.log(`there was error with path: ${path}, errror: ${err}`);
      process.exit(1);
    } else {
      console.log(data);
      let mm = new MarkovMachine(data);
      mm.makeText(20);
    }
  });
}

function readUrl(url) {
  axios
    .get(url)
    .then((resp) => {
      data = resp.data.slice(0, 200);
      console.log(data);
      let mm = new MarkovMachine(data);
      mm.makeText(20);
    })
    .catch((err) => console.log(err.response));
}

let type = argv[2];
let source = argv[3];

if (type == "file") {
  console.log(`file ${source}`);
  readFile(source);
} else if (type == "url") {
  console.log(`url ${source}`);
  readUrl(source);
} else {
  console.log(`not correct type ${type}`);
}
