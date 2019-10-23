const yargs = require("yargs");
const notes = require("./notes");

// Create add command
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

// Create remove command
yargs.command({
	command: "remove",
	describe: "Remove a note",
	builder: {
		title: {
			describe: "Remove body",
			demandOption: true,
			type: "string"
		}
	},
	handler: ({ title }) => notes.removeNote(title)
});

// Create list command
yargs.command({
	command: "list",
	describe: "Lists note",
	handler: function() {
		console.log("Listing notes");
	}
});

// Create read command
yargs.command({
	command: "read",
	describe: "Read note",
	handler: function() {
		console.log("Reading note");
	}
});

yargs.parse();
