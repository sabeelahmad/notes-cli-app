console.log('Starting app.js');

const fs = require('fs');
const _ = require('lodash');
const yargs = require('yargs');

const notes = require('./notes.js');

// Yargs command line inputs are stored in the yargs.argv
// Yargs helps to parse command line arguments in an easier way
const argv = yargs.argv;
var command = argv._[0];
console.log('Yargs', argv);

if(command === 'add') {
  var note = notes.addNote(argv.title, argv.body);
  /* Checking for creation of note */
  if(note) {
    console.log('Note created.');
    /* Printing note contents */
    console.log('-----');
    console.log(`Title: ${note.title}`);
    console.log(`Body: ${note.body}`);
  } else {
    console.log('Note with same title already exists, try again.');
  }
} else if(command === 'list') {
  notes.getAll();
} else if(command === 'read') {
  notes.readNote(argv.title);
} else if(command === 'remove') {
  notes.removeNote(argv.title);
} else {
  console.log('Command not recognized');
}