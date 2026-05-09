const fs = require('fs/promises');

(async () => {
    const createFile = async (filePath) => {
        try{
            const fileHandler = await fs.open(filePath, 'r');
            fileHandler.close();
            return console.log(`File ${filePath} already exists`);
        }
        catch(err){
                const fileHandler = await fs.open(filePath, 'w');
                console.log(`File ${filePath} created`);
                fileHandler.close();

        }


    }
    //commands
    const CREATE_FILE_COMMAND = 'create a file';

    const commandFileHandler = await fs.open('./command.txt', 'r');
    
    commandFileHandler.on('change', async () => {
        const {size} = await commandFileHandler.stat();

        const buffer = Buffer.alloc(size);
        const offset = 0;
        const length = buffer.length;
        const position = 0;

        const content = await commandFileHandler.read({buffer, offset, length, position});
        const command = content.buffer.toString('utf-8');
        if(command.includes(CREATE_FILE_COMMAND)){
            const filePath = command.substring(CREATE_FILE_COMMAND.length + 1);
            await createFile(filePath);
        }
    });

    // watcher...
    const watcher = await fs.watch('./command.txt');
    for await (const event of watcher) {
        if(event.eventType === 'change'){
            commandFileHandler.emit('change');
        }
    }
})()