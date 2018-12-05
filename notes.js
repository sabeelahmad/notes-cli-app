console.log('Starting notes.js');

const fs = require('fs');

// Functions for reusability
var fetchNotes = () => {
  /* Loading all notes using fs module, by converting the JSON string back to array */
  try {
    /* Since file is being read before writing, if it doesn't exist
    the program will crash */
    var noteString = fs.readFileSync('notes-data.json');
    return JSON.parse(noteString);
  } catch (e) {
    /* Notes array will be empty as initialized */
    return [];
  }
};

var saveNotes = (notes) => {
  /* Update file data
  / Storing the notes array as a JSON string in the file which we can later parse back to
  / a simple JS object/Array using the JSON.parse() method */
  fs.writeFileSync('notes-data.json', JSON.stringify(notes));
};

// Function adds a note to our database
var addNote = (title, body) => {
  /* All notes are required to be fetched before updating
  otherwise they'll be overwritten when we write a new note */
  var notes = fetchNotes();
  // New note
  var note = {
    title, /* title: title */
    body /* body: body */
  }
  /* To ensure that we don't have duplicate titles for notes
  we run the filter function on our notes array */
  /* The filter() method creates a new array with all elements
  that pass the test implemented by the provided function. */
  /* The filter function loops on all data of the array and if
  for any note the title is same as the current one being created we store that
  in the filtered array */
  var duplicateNotes = notes.filter((note) => note.title === title);
  /* If any notes had same title, duplicateNotes won't be empty */
  if(duplicateNotes.length === 0) {
    // Add note to notes array
    notes.push(note);
    // Call saveNotes with the notes array
    saveNotes(notes);
    // Return created note to the calling function in app.js
    return note;
    // If the if block doesn't execute JS automatically return undefined
  }
};

// Function retrieves all notes
var getAll = () => {
  console.log('Getting all notes');
};

// Function reads a note of provided title
var readNote = (title) => {
  console.log('Reading', title);
};

// Function removes a note corresponding to given title
var removeNote = (title) => {
  /* This function is broken down into 3 steps */
  /* Fetching all notes currently stored */
  var notes = fetchNotes();
  /* Now we need to remove the note with the provided title
  to achieve this we use the filter method on the notes array
  we filter the notes on basis of title and keep only those notes
  that don't match the title provided, since filter function only
  stores those values that satisfy the provided condition in the callback */
  var notesFinal = notes.filter((note) => note.title !== title);
  /* The final step is to save the notes after removal */
  saveNotes(notesFinal);
  /* Returning value to app.js to determine whether a note was removed or not */
  /* We establish this by checking length before and after removal of the arrays */
  return (notes.length !== notesFinal.length);
};

module.exports = {
  addNote,
  getAll,
  readNote,
  removeNote
}

