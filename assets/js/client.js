'Use strict';

// import module
import { navitem } from "./navitem.js";
import { activeNoteBook } from "./utility.js";

const sidebarList = document.querySelector('[data-sidebar-list]');
const notePanelTitle = document.querySelector('[data-note-panel-title]');
const notePanel = document.querySelector('[data-note-panel]');

export const client = {
  notebook : {
    create(notebookData) {
      const navItem = navitem(notebookData.id, notebookData.name)
      sidebarList.appendChild(navItem);
      activeNoteBook.call(navItem);
      notePanelTitle.textContent = notebookData.name;
    },
    /**
     * 
     * @param {Array<Object>} notebookList - list of notebook data to 
     * display.
     */
    read(notebookList){
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
        // notePanel.innerHTML = '';
      }

      deletedNotebook.remove()
    }

  }
}