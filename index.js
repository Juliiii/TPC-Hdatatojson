const fs        = require("fs"),
      readline  = require("readline"),
      chalk     = require("chalk"),
      config    = require("./config.js");

(function() {


  function factory(key, data) {
    return new Promise((resolve, reject) => {
      let readStream = fs.createReadStream(`./data/${key}.tbl`),
          writeStream = fs.createWriteStream(`./res/${key}.text`);
      const keys = data,
            start = new Date();

      let rl = readline.createInterface({
        input: readStream,
        output: writeStream
      });
      let index = 0;
      rl.on("line", (line) => {
        let arr = line.split("|");
        arr = arr.slice(0, arr.length - 1);
        let str = index + '\t';
        for (let i = 0; i < arr.length; i++) {
          if (i === 0) {
            str += "{\"" + keys[i] + "\": \"" + arr[i] + "\"";
          } else if (i === arr.length - 1) {
            str += ", \"" + keys[i] + "\": \"" + arr[i] + "\"}\r\n";
          } else {
            str += ", \"" + keys[i] + "\": \"" + arr[i] + "\"";
          }
        }
        index++;
        writeStream.write(str);
      })

      rl.on("close", () => {
        const end = new Date();
        total += index;
        console.log(chalk.red(`${key}.tbl finished all, waste ${end - start} ms`));
        resolve();
      })
      }
    )
  }



  let total      = 0,
      PromiseArr = [];
  for (let key in config) {
    PromiseArr.push(factory(key, config[key]));
  }



  Promise.all(PromiseArr).then(() => {
    console.log(chalk.yellow("ALL FINISHED !"))
    console.log(chalk.yellow(`total items: ${total}`));
    process.exit(0);
  })
})();
