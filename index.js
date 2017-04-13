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


/*
// 第一题
SELECT id, data->>'totalprice' AS TotalPrice
FROM orders
WHERE data->>'orderdate' = '1994-09-29' AND data->>'orderpriority' = '2-HIGH'


// 第二题
SELECT data->>'orderpriority' AS priority, SUM(CAST(data->>'totalprice' AS DOUBLE PRECISION) AS total
FROM orders
WHERE data->>'orderdate' > '1998-01-01'
GROUP BY data->>'orderpriority'
ORDER BY total DESC;

// 第三题
SELECT l.data->>'shipmode' AS shipmode, SUM(CAST(l.data->>'quantity' AS DOUBLE PRECISION) AS total
FROM lineitem l, orders o
WHERE o.data->>'orderkey' = l.data->>'orderkey' AND o.data->>'orderdate' >= '1998-11-01' AND o.data->>'orderdate' <= '1998-11-30'
GROUP BY l.data->>'shipmode'
HAVING l.data->>'shipmode' != 'MAIL';


// 第四题
SELECT MAX(CAST(l.data->>'extendedprice' AS DOUBLE PRECISION)) AS maximum
FROM lineitem l, orders o
WHERE o.data->>'orderkey' = l.data->>'orderkey' AND o.data->>'orderdate' < '1997-01-01';


// 第五题
SELECT p.data->>'name' as name, p.data->>'size' as size  
FROM partsupp ps, part p
WHERE ps.partkey = p.partkey AND ps.suppkey = 39;
ORDER BY COUNT(*) DESC
LIMIT 3;
// 第六题
SELECT p.data->>'partkey' as key, p.data->>'name' as name
FROM part p, partsupp ps, lineitem l
WHERE p.data->>'partkey' = ps.data->>'partkey' AND ps.data->>'partkey' = lineitem.data->>'partkey'



// 第七题
SELECT c.data->>'custkey' as custkey, c.data->>'name' as name, c.data->>'address' as address, c.data->>'phone' as phone, COUNT(*) as count
FROM customer c, orders o
WHERE c.data->>'custkey' = o.data->'custkey' AND o.data->'orderdate' >= '1996-01-01' AND o.data->'orderdata' <= '1996-12-31' AND COUNT(*) > 2;