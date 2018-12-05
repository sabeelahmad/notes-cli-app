const fs = require('fs');
const _ = require('lodash');
const yargs = require('yargs');

const notes = require('./notes.js');

// Yargs command line inputs are stored in the yargs.argv
// Yargs helps to parse command line arguments in an easier way
const argv = yargs.argv;
var command = argv._[0];

if(command === 'add') {
  var note = notes.addNote(argv.title, argv.body);
  /* Checking for creation of note */
  if(note) {
    console.log('Note created.');
    notes.logNote(note);
  } else {
    console.log('Note with same title already exists, try again.');
  }
} else if(command === 'list') {
  var allNotes = notes.getAll();
  /* Logging all notes */
  allNotes.forEach((note) => notes.logNote(note));
} else if(command === 'read') {
  var foundNote = notes.readNote(argv.title);
  if(foundNote) {
    console.log('Note found.');
    notes.logNote(foundNote);
  } else {
    console.log('Note not found.');
  }
} else if(command === 'remove') {
  var noteRemoved = notes.removeNote(argv.title);
  /* Generating Message */
  var message = noteRemoved ? 'Note was removed.' : 'Note not found.';
  console.log(message);
} else {
  console.log('Command not recognized');
}