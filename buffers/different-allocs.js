const {Buffer} = require('buffer');

console.log(Buffer.poolSize >>> 1);

const buffer = Buffer.alloc(10000, 0);
const unsafeBuffer = Buffer.allocUnsafe(10000);

const buff = Buffer.allocUnsafeSlow(2);

// for(let i = 0; i < unsafeBuffer.length; i++){
//     if(unsafeBuffer[i] !== 0) console.log(`${i} - ${unsafeBuffer[i].toString('2')}`)
// }