const fs = require("fs");
const chalk = require("chalk");

const loadNotes = () => {
    try {
        return JSON.parse(fs.readFileSync("notes.json", "utf-8"));
    }

    catch(err) {
        return [];
    }
}

const saveNotes = (notes) => {
    const jsonData = JSON.stringify(notes);

    fs.writeFileSync("notes.json", jsonData);
}

const addNotes = (noteTitle, noteBody) => {
    const parsedData = loadNotes();
    const duplicateNotes = parsedData.find((elm) => elm.title.toLowerCase() === noteTitle.toLowerCase());

    if (!duplicateNotes) {
        parsedData.push({ "title": noteTitle, "body": noteBody });

        saveNotes(parsedData);

        console.log(chalk.bgGreen.inverse("Note successfully added!"));
    }

    else {
        console.log(chalk.bgRed.inverse("Note title already exists, note wasn't added!"));
    }
}

const removeNotes = (noteTitle) => {
    const parsedData = loadNotes();
    const filteredData  = parsedData.filter((elm) => elm.title.toLowerCase() !== noteTitle.toLowerCase());

    if (filteredData.length < parsedData.length) {
        saveNotes(filteredData);

        console.log(chalk.bgGreen.inverse("Note removed!"));
    }

    else {
        console.log(chalk.bgRed.inverse("Note title not found!"));
    }
}

const listNotes = () => {
    const currentNotes = loadNotes();

    console.log(chalk.green("Listing all notes:"));

    for (let note of currentNotes) {
        console.log(`Note Title: ${chalk.green(note.title)}`);
    }
}

const readNotes = (noteTitle) => {
    const currentNotes = loadNotes();
    const findNote = currentNotes.find((currentNote) => currentNote.title.toLowerCase() === noteTitle.toLowerCase());
    
    if (findNote) {
        console.log(`Note title: ${chalk.green(findNote.title)}`);
        console.log(`Note body: ${chalk.blue(findNote.body)}`);  
    } else {
        console.log(chalk.red(`${noteTitle} note title not found!`));
    }
}

const editNotes = (OldTitle, newTitle) => {
    const currentNotes = loadNotes();
    const findNote = currentNotes.find((currentNote) => currentNote.title.toLowerCase() === OldTitle.toLowerCase());
    const updatedNotes = [];

    if (OldTitle.toLowerCase() === newTitle.toLowerCase()) {
        console.log(chalk.inverse.red("New and old title values are the same aborting update..."));
    } 
    
    else {
        if (findNote) {
            for (let note of currentNotes) {
                if (note.title == findNote.title) {
                    updatedNotes.push({ "title": newTitle, "body": note.body });
                } 
                
                else {
                    updatedNotes.push({ "title": note.title, "body": note.body });
                }
            }
    
            saveNotes(updatedNotes);
    
            console.log(chalk.bgGreen(`${findNote.title} Title was updated to ${newTitle}`));
        } 
        
        else {
            console.log(chalk.bgRed("Title to edit not found!"));
        }
    }    
}

module.exports = {
    addNotes,
    removeNotes,
    listNotes,
    readNotes,
    editNotes
};