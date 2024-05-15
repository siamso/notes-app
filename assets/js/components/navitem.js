'Use strict';

// import module..................

import { Tooltip } from "./tooltip.js";
import { activeNoteBook, makeElemEditable} from "../utility.js";
import { db } from "../db.js";
import { client } from "../client.js";
import { DeleteConfirmModal } from "./modal.js";

const notePanelTitle = document.querySelector('[data-note-panel-title]');

export const navitem = function (id, name) {
  const navItem = document.createElement('div');
  navItem.classList.add('nav-item');
  navItem.setAttribute('data-notebook', id);

  navItem.innerHTML = `
      <span class="text text-label-large" data-notebook-field>${name}</span>

      <button class="icon-btn small" aria-label="Edit notebook" data-tooltip="Edit notebook" data-edit-btn>

        <i class="fas fa-pen" aria-hidden="true"></i>

        <div class="state-layer"></div>

      </button>

      <button class="icon-btn small" aria-label="Delete notebook" data-tooltip="Delete notebook" data-delete-btn>

        <i class="fas fa-trash" aria-hidden="true"></i>

        <div class="state-layer"></div>

      </button>

      <div class="state-layer"></div>
  `
  const toolTipEl = navItem.querySelectorAll('[data-tooltip]');
  toolTipEl.forEach(element => Tooltip(element));

  navItem.addEventListener('click', function () {
    notePanelTitle.textContent = name;
    activeNoteBook.call(this);

    const noteList = db.get.note(this.dataset.notebook);
    client.note.read(noteList);
  });

  /*
   * Notebook edit functionality
  */

  const /** {HTMLElement} */ navItemEditBtn = navItem.querySelector('[data-edit-btn]');
  const /** {HTMLElement} */ navItemField = navItem.querySelector('[data-notebook-field]');

  navItemEditBtn.addEventListener('click', makeElemEditable.bind(null, navItemField));
  navItemField.addEventListener('keydown', function (event) {
    if (event.key === 'Enter'){
      this.removeAttribute('contenteditable');

      // Update edited in  database
      const updateNotebookData = db.update.notebook(id, this.textContent);

      // Render updated notebook
      client.notebook.update(id, updateNotebookData);
    }
  });


  /**
   * Notebook delete functionality
   */

  const navItemDeleteBtn = navItem.querySelector('[data-delete-btn]');
  navItemDeleteBtn.addEventListener('click', function () {
    
    const /** { Object } */ modal = DeleteConfirmModal(name);

    modal.open();

    modal.onSubmit(function (isConfirm) {
      if (isConfirm) {
        db.delete.notebook(id);
        client.notebook.delete(id);
      }

      modal.close();
    }); 

  })

  return navItem;
}
