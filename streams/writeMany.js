const fs = require("node:fs/promises");

//DO NOT USE THIS CODE
// Execution Time: 10.2s
// CPU Usage: 100% (one core)
// Memory Usage: 50MB
(async () => {
  console.time("writeMany");
  const fileHandle = await fs.open("test.txt", "w");
  const stream = fileHandle.createWriteStream();

  for (let i = 0; i < 1000000; i++) {
    const buff = Buffer.from(` ${i} `, "utf-8");
    stream.write(buff);
  }
  console.timeEnd("writeMany");
})();

// Execution Time: 1.165s
// CPU Usage: 100% (one core)
// Memory Usage: 50MB
// const fs = require("node:fs");
// //
// (async () => {
//   console.time("writeMany");
//   fs.open("test.txt", "w", (err, fd) => {
//     for (let i = 0; i < 1000000; i++) {
//       const buff = Buffer.from(` ${i} `, "utf-8");
//
//       fs.writeSync(fd, buff);
//     }
//
//     console.timeEnd("writeMany");
//   });
// })();
