const fs = require('node:fs/promises');

(async () => {
    const fileHandleRead = await fs.open('src.txt', 'r');
    const fileHandleWrite = await fs.open('dist.txt', 'w');

    const streamRead = fileHandleRead.createReadStream();
    const streamWrite = fileHandleWrite.createWriteStream();

    let split = '';
    streamRead.on('data', (chunk) => {
        const numbers = chunk.toString().split('  ');
        if(Number(numbers[0] + 1) !== Number(numbers[1])){
            if(split){
                numbers[0] = split.trim() + numbers[0].trim();
            }
        }
        if(Number(numbers[numbers.length - 2] + 1) !== Number(numbers[numbers.length-1])){
            split = numbers.pop();
        }
        

        if(!streamWrite.write(chunk)) streamRead.pause();
    });
    streamWrite.on('drain', () => {
        streamRead.resume();
    })
})()