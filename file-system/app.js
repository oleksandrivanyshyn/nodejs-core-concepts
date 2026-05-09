const fs = require('fs/promises');

(async () => {
    const commandFileHandler = await fs.open('./command.txt', 'r');
    
    commandFileHandler.on('change', async () => {
        const {size} = await commandFileHandler.stat();

        const buffer = Buffer.alloc(size);
        const offset = 0;
        const length = buffer.length;
        const position = 0;

        const content = await commandFileHandler.read({buffer, offset, length, position});
        console.log(content.buffer.toString('utf-8'));
    });

    // watcher...
    const watcher = await fs.watch('./command.txt');
    for await (const event of watcher) {
        if(event.eventType === 'change'){
            commandFileHandler.emit('change');
        }
    }
})()