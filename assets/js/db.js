'use strict';

// importing from the files....

//made generatedId from date.js file....
import { generateID, findNotebook,
         findNotebookIndex, findNote,
         findNoteIndex } from "./utility.js";  

//DB (database) Object

let notekeeperDB = {};

// initializes  a local database

const initDB = function () {
  const db = JSON.parse(localStorage.getItem('notekeeperDB'));
  if(db) {
    notekeeperDB = db
  } else {
    notekeeperDB.notebooks = [];
    localStorage.setItem('notekeeperDB', JSON.stringify(notekeeperDB));
  }
}

initDB();

/**
 * reads and loads the localStorage data in to the global 
 * variable 'notekeeperDB'
*/
const readDB = function () {
  notekeeperDB = JSON.parse(localStorage.getItem('notekeeperDB'));
}
/**
 * writes the current state of the global 'notekeeperDB'
*/
const writeDB = function () {
  localStorage.setItem('notekeeperDB', JSON.stringify(notekeeperDB));
}

/**
 * collection of functions for performing CRUD (Create, Read, Update, Delete) operations
 * on database.
 * the database is using local storage
 * 
 * @namespace
 * @property {Object} get - Functions for retrieving data from 
 * database.
 * @property {Object} post - Functions for adding data to 
 * database.
 * @property {Object} update - Functions for updating data in the
 * database.
 * @property {Object} delete - Functions for deleting data from the
 * database.
 */

export const db = {

  post : {
    notebook(name) {
      readDB();

      const notebookData = {
        id : generateID(),
        name,
        notes:[]
      }

      notekeeperDB.notebooks.push(notebookData);

      writeDB();
      return notebookData;
    },

    /**
     * Adds a new note to a specified notebook in database.
     * 
     * @function
     * @param {string} notebookId - The ID of the notebook to add the note to.
     * @param {Object} object - The note object to add.
     * @returns {Object} The newly created note object.
     */
    note(notebookId, object) {
      readDB();

      const notebook = findNotebook(notekeeperDB, notebookId);

      const noteData = {
        id: generateID(),
        notebookId,
        ...object,
        postedOn: new Date().getTime()
      }

      notebook.notes.unshift(noteData);
      writeDB();

      return noteData;
    }
  },

  get : {
    notebook() {
      readDB()

      return notekeeperDB.notebooks;
    },

    /**
     * Retrieves all note within a specified notebook.
     * 
     * @function
     * @param {string} notebookId - The ID of the notebook to retrieve notes from.
     * @returns {Array<Object>} An array of note objects
     */
    note(notebookId) {
      readDB();

      const notebook = findNotebook(notekeeperDB, notebookId);
      return notebook.notes;
    }
  },

  update: {
    notebook(notebookId, name) {
      readDB();

      const /** {Object} */ notebook = findNotebook(notekeeperDB, notebookId);
      notebook.name = name;

      writeDB();

      return notebook;
    },
    /**
     * Updates the content of a note in the database.
     * 
     * @function
     * @param {string} noteId - The ID of the note to update.
     * @param {Object} object - The updated data for the note.
     * @returns {Object} The updated note Object
     */
    note(noteId, object) {
      readDB();

      const oldNote = findNote(notekeeperDB, noteId);
      const newNote = Object.assign(oldNote, object);

      writeDB();
      
      return newNote;      
    }
  },

  delete: {

    /**
     * Deletes a notebook from the database.
     * 
     * @function
     * @param {string} notebookId - The ID of the notebook to delete.
     */
    notebook(notebookId) {
      readDB();

      const /** {Number} */ notebookIndex = findNotebookIndex(notekeeperDB, notebookId);
      notekeeperDB.notebooks.splice(notebookIndex, 1);

      writeDB();
    },

    /**
     * Deletes a note from a specified notebook in the database.
     * 
     * @function
     * @param {string} notebookId - The ID of the notebook containing the note to delete. 
     * @param {string} noteId - The ID of the note to delete.
     * @returns {Array<Object>} An array of remaining notes in the notebook 
     */
    note(notebookId, noteId) {
      readDB();

      const notebook = findNotebook(notekeeperDB, notebookId);
      const noteIndex = findNoteIndex(notebook, noteId);

      notebook.notes.splice(noteIndex, 1);

      writeDB();

      return notebook.notes;
    }
  }
};