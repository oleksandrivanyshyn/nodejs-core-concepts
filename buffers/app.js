const {Buffer} = require('buffer');

const memoryContainer = Buffer.alloc(4);
console.log(memoryContainer);

memoryContainer[0] = 0xF4;
memoryContainer[1] = 0x34;
memoryContainer[2] = 0x00;
memoryContainer[3] = 0xff;

console.log(memoryContainer);
console.log(memoryContainer[0]);
console.log(memoryContainer[1]);
console.log(memoryContainer[2]);
console.log(memoryContainer[3]);

console.log(memoryContainer.toString('hex'));

const buff = Buffer.from('Hi!');

console.log(buff.toString());