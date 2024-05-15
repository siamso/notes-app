'Use strict';

// import module
import { navitem } from "./components/navitem.js";
import { activeNoteBook } from "./utility.js";
import { Card } from "./components/card.js";

const sidebarList = document.querySelector('[data-sidebar-list]');
const notePanelTitle = document.querySelector('[data-note-panel-title]');
const notePanel = document.querySelector('[data-note-panel]');
const noteCreateBtns = document.querySelectorAll('[data-note-create-btn]');
const emptyNotesTemplate = `
    <div class="empty-notes">

      <i class="fa-regular fa-note-sticky"></i>

      <div class="text-headline-small">No notes</div>

    </div>
`;

/**
 * Enables or disables "Create Note" buttons based on whether there are any notebooks.
 * 
 * @param {boolean} hasNotebook -Indicates whether there are any notebooks.
 */
const disableNoteCreateBtns = function (hasNotebook) {
  noteCreateBtns.forEach(item => {
    item[hasNotebook ? 'removeAttribute' : 'setAttribute']('disabled', '');
  })
}

export const client = {
  notebook : {
    create(notebookData) {
      const navItem = navitem(notebookData.id, notebookData.name)
      sidebarList.appendChild(navItem);
      activeNoteBook.call(navItem);
      notePanelTitle.textContent = notebookData.name;
      notePanel.innerHTML = emptyNotesTemplate;
      disableNoteCreateBtns(true);
    },
    /**
     * 
     * @param {Array<Object>} notebookList - list of notebook data to 
     * display.
     */
    read(notebookList){
      disableNoteCreateBtns(notebookList.length);
      notebookList.forEach((notebookData, index) => {
        const navItem = navitem(notebookData.id, notebookData.name);
        if (index === 0) {
          activeNoteBook.call(navItem);
          notePanelTitle.textContent = notebookData.name;
        }

        sidebarList.appendChild(navItem);
      }) 
    },

    /**
     * Updates the UI to reflect changes in a notebook.
     * 
     * @param {string} notebookId - ID of the notebook to update.
     * @param {Object} notebookData - New data for the notebook.
     */
    update(notebookId, notebookData) {
      const oldNotebook = document.querySelector(`[data-notebook="${notebookId}"]`);
      const newNotebook = navitem(notebookData.id, notebookData.name);

      notePanelTitle.textContent = notebookData.name;
      sidebarList.removeChild(newNotebook, oldNotebook);
      activeNoteBook.call(newNotebook);
    },

    /**
     * Delete a notebook from the UI
     * 
     * @param {string} notebookId - ID of the notebook to delete.
     */

    delete(notebookId) {
      const deletedNotebook = document.querySelector(`[data-notebook="${notebookId}"]`);
      const activeNavItem = deletedNotebook.nextElementSibling ?? deletedNotebook.previousElementSibling;

      if(activeNavItem) {
        activeNavItem.click();
      } else {
        notePanelTitle.innerHTML = '';
        notePanel.innerHTML = '';
        disableNoteCreateBtns(false);
      }

      deletedNotebook.remove()
    }

  },

  note: {
    /**
     * Creates a new note card in the UI based on provided note data.
     * 
     * @param {Object} noteData - Data representing the new note.
     */
    create(noteData) {
      // Clear 'emptyNotesTemplate' from 'notePanel'
      if (!notePanel.querySelector('[data-note]')) notePanel.innerHTML = '';

      //Append card in notePanel
      const card = Card(noteData);
      notePanel.prepend(card);
    },

    /**
     * Reads and displays a list of notes in the UI
     * 
     * @param {Array<Object>} noteList - List of note data to display 
     */
    read(noteList) {

      if (noteList.length) {
        notePanel.innerHTML = '';

        noteList.forEach(noteData => {
          const card = Card(noteData);
          notePanel.appendChild(card);
        });
      } else {
        notePanel.innerHTML = emptyNotesTemplate;
      }
    },

    /**
     * Updates a note card in the UI based on provided note data.
     * 
     * @param {string} noteId - Id of the note to update 
     * @param {Object} noteData - New data for the note. 
     */
    update(noteId, noteData) {
      const oldCard = document.querySelector(`[data-note="${noteId}"]`);
      const newCard = Card(noteData);
      notePanel.replaceChild(newCard, oldCard);
    },

    delete(noteId, isNoteExists) {
      document.querySelector(`[data-note="${noteId}"]`).remove();
      if (!isNoteExists) notePanel.innerHTML = emptyNotesTemplate;
    }
  }
}