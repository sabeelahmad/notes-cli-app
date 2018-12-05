const fs = require('fs');
const _ = require('lodash');
const yargs = require('yargs');

const notes = require('./notes.js');

/* Yargs command line inputs are stored in the yargs.argv
Yargs helps to parse command line arguments in an easier way
*/
/* Yargs configuration and chaining of functions */
/* Help function displays all options and commands for user if he/she uses
the --help flag while running the app using node */
/* Command function is where all configuration of a particular command is done
command(commandName, description, optionsObj) */
/* DRY code for title and body options for yargs configuration */
const titleOptions = {
  describe: 'Title of note.',
  demand: true,
  alias: 't'
};
const bodyOptions = {
  describe: 'Body of note.',
  demand: true,
  alias: 'b'
};
const argv = yargs
      .command('add', 'Add a new note.', {
        /* Options for the commands, there are 3 options
        Alias - short form / flag
        Demand - Required or Note (False by default)
        Describe - Description for the particular option
        This is basically an object of objects where in each property is
        defined as an object
        Refer to yargs docs for more. */
        title: titleOptions,
        body: bodyOptions
      })
      .command('list', 'List all notes.')
      .command('read', 'Read a note.', {
        title: titleOptions
      })
      .command('remove', 'Remove a note.', {
        title: titleOptions
      })
      .help()
      .argv;
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