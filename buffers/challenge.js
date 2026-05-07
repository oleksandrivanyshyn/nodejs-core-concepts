// 0100 1000 0110 1001 0010 0001

//my implementation

// const { Buffer } = require('buffer');
// const buffer = Buffer.alloc(3);
// buffer[0] = 0b01001000;
// buffer[1] = 0b01101001;
// buffer[2] = 0b00100001;
// let result = '';
// for (let i = 0; i < buffer.length; i++) {
//     result += String.fromCharCode(buffer[i].toString(10));
// }
// console.log(result);


// 0100 1000 0110 1001 0010 0001

// const { Buffer } = require("buffer");
//
// const buff = Buffer.alloc(3); // 24 bits / 8 => 3 bytes
//
// buff[0] = 0x48;
// buff[1] = 0x69;
// buff[2] = 0x21;
//
// console.log(buff.toString("utf-8"));