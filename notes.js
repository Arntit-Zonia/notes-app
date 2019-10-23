const chalk = require("chalk");
const fs = require("fs");

const getNotes = () => "Your notes...";

const addNotes = (title, body) => {
	const notes = loadNotes();
	const duplicateNotes = notes.filter((note) => note.title === title);

	if (!duplicateNotes.length) {
		notes.push({ title, body });

		saveNotes(notes);
		console.log("New note added");
	} else {
		console.log("Note title taken");
	}
};

const saveNotes = (notes) => {
	const dataJSON = JSON.stringify(notes);

	fs.writeFileSync("notes.json", dataJSON);
};

const loadNotes = () => {
	try {
		const dataBuffer = fs.readFileSync("notes.json");
		const dataJSON = dataBuffer.toString();

		return JSON.parse(dataJSON);
	} catch (e) {
		return [];
	}
};

const removeNote = (note) => {
	const notes = loadNotes();
	const filteredNotes = notes.filter((n) => n.title !== note);

	if (filteredNotes.length < notes.length) {
		saveNotes(filteredNotes);
		console.log(chalk.green(`Removing note ${note}`));
	} else {
		console.log(chalk.red(`Couldn't find the ${note} note`));
	}
};

module.exports = {
	getNotes,
	addNotes,
	removeNote
};
