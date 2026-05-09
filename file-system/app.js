const fs = require('fs/promises');

(async () => {


    const createFile = async (filePath) => {
        try{
            const fileHandler = await fs.open(filePath, 'r');
            await  fileHandler.close();
            return console.log(`File ${filePath} already exists`);
        }
        catch(err){
                const fileHandler = await fs.open(filePath, 'w');
                console.log(`File ${filePath} created`);
                await fileHandler.close();

        }

    }
    const deleteFile = async (filePath) => {
        try{
            await fs.unlink(filePath);
            console.log(`File ${filePath} deleted`);
        }
        catch(err){
            console.log(`File ${filePath} does not exist`);
        }

    }
    const renameFile = async (filePath, newFilePath) => {
        try{
            await fs.rename(filePath, newFilePath);
            console.log(`File ${filePath} renamed to ${newFilePath}`);
        }
        catch(err){
            console.log(`File ${filePath} does not exist`);
        }
    }

    let addedContent;

    const addToFile = async (filePath, content) => {
        if(addedContent === content) return;
        try{
            await fs.appendFile(filePath, content);
            addedContent = content;
            console.log(`Content added to file ${filePath}`);
        }
        catch(err){
            console.log(`File ${filePath} does not exist`);
        }
    }
    //commands
    const CREATE_FILE_COMMAND = 'create a file';
    const DELETE_FILE_COMMAND = 'delete a file';
    const RENAME_FILE_COMMAND = 'rename a file';
    const ADD_TO_FILE_COMMAND = 'add to a file';

    const commandFileHandler = await fs.open('./command.txt', 'r');
    
    commandFileHandler.on('change', async () => {
        const {size} = await commandFileHandler.stat();

        const buffer = Buffer.alloc(size);
        const offset = 0;
        const length = buffer.length;
        const position = 0;

        const content = await commandFileHandler.read({buffer, offset, length, position});
        const command = content.buffer.toString('utf-8');

        //create a file
        //create a file <path>
        if(command.includes(CREATE_FILE_COMMAND)){
            const filePath = command.substring(CREATE_FILE_COMMAND.length + 1);
            await createFile(filePath);
        }
        //delete a file
        //delete a file <path>
        if(command.includes(DELETE_FILE_COMMAND)){
            const filePath = command.substring(DELETE_FILE_COMMAND.length + 1);
            await deleteFile(filePath);
        }
        //rename a file
        //rename a file <path> to <new-path>
        if(command.includes(RENAME_FILE_COMMAND)){
            const _idx = command.indexOf(' to ');
            const filePath = command.substring(RENAME_FILE_COMMAND.length + 1, _idx);
            const newFilePath = command.substring(_idx + 4);
            await renameFile(filePath, newFilePath);
        }
        //add to a file
        //add to a file <path> this <content>
        if(command.includes(ADD_TO_FILE_COMMAND)){
            const _idx = command.indexOf(' this ');
            const filePath = command.substring(ADD_TO_FILE_COMMAND.length + 1, _idx);
            const content = command.substring(_idx + 6);
            await addToFile(filePath, content);

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