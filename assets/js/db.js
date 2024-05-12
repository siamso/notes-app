'use strict';

// importing from the files....

//made generatedId from date.js file....
import { generateID, findNotebook,
         findNotebookIndex } from "./utility.js";  

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
    }
  },

  get : {
    notebook() {
      readDB()

      return notekeeperDB.notebooks;
    }
  },

  update: {
    notebook(notebookId, name) {
      readDB();

      const /** {Object} */ notebook = findNotebook(notekeeperDB, notebookId);
      notebook.name = name;

      writeDB();

      return notebook;
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
    }
  }
};