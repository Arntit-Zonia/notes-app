const yargs = require("yargs");

const notes = require("./notes.js");

yargs.command({
    command: "add",
    describe: "Add a new note",
    builder: {
        title: {
            describe: "Note title",
            demandOption: true,
            type: "string"
        },
        body: {
            describe: "Note body",
            demandOption: true,
            type: "string"
        }
    },
    handler: ({ title, body }) => notes.addNotes(title, body)
});

yargs.command({
    command: "remove",
    describe: "Remove note",
    builder: {
        title: {
            describe: "Note title",
            demandOption: true,
            type: "string"
        },
    },
    handler: ({ title }) => notes.removeNotes(title)
});

yargs.command({
    command: "list",
    describe: "List notes",
    handler: notes.listNotes
});

yargs.command({
    command: "read",
    describe: "Read notes",
    builder: {
        title: {
            describe: "Note title",
            demandOption: true,
            type: "string"
        },
    },
    handler: ({ title }) => notes.readNotes(title)
});

yargs.command({
    command: "edit",
    describe: "Edit note",
    builder: {
        oldTitle: {
            describe: "Title you want to change",
            demandOption: true,
            type: "string"
        },
        newTitle: {
            describe: "New title name",
            demandOption: true,
            type: "string"
        }
    },
    handler: ({ oldTitle, newTitle }) => notes.editNotes(oldTitle, newTitle)
});

yargs.parse();