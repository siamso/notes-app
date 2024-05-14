'use strict';

// importing from other files---------
import { greeting, 
         getDate } from "./utility.js";
import { Tooltip } from "./components/tooltip.js";
import { db } from "./db.js";
import { client } from "./client.js";
import { activeNoteBook,
         makeElemEditable} from "./utility.js";
import { NoteModal } from "./components/modal.js";

// sidebar toggler------------------------------------

const sidebar = document.querySelector('[data-sidebar]');
const sidebarTogglers = document.querySelectorAll('[data-sidebar-toggler]');
const overlay = document.querySelector('[data-sidebar-overlay]');

sidebarTogglers.forEach(sidebarToggler => {
  sidebarToggler.addEventListener('click', () => {
    sidebar.classList.toggle('active');
    overlay.classList.toggle('active');
  })
});

/** Initializing tooltip behavior for all DOM elements with
 * 'data-tooltip' attribute.
*/

const toolTipEL = document.querySelectorAll('[data-tooltip]');

toolTipEL.forEach(element => Tooltip(element));


// setting up greeting and date------------------------

const greetingEl = document.querySelector('[data-greeting]');
const getDateEl = document.querySelector('[data-current-date]');

getDateEl.textContent = getDate();
greetingEl.textContent = greeting();


// notebook create field-------------------------------

const sidebarList = document.querySelector('[data-sidebar-list]');
const addNoteBtnEl = document.querySelector('[data-add-notebook]');


const showNoteBookField = function () {
  const navItem = document.createElement('div');
  navItem.classList.add('nav-item');

  navItem.innerHTML = `
    <span class="text text-label-large" data-notebook-field></span>

    <div class="state-layer"></div>
  `

  sidebarList.appendChild(navItem);

  // make note book field content editable and focus

  const navItemField = navItem.querySelector('[data-notebook-field]')
  makeElemEditable(navItemField);

  // when user press Enter than create a notebook

  const createNoteBook = function (event) {
    if(event.key === 'Enter'){
     const notebookData = db.post.notebook(this.textContent || 'Untitled') //this: navItemField
     this.parentElement.remove()

    //  Render navItem
    client.notebook.create(notebookData);
    }
  }
  
  navItemField.addEventListener('keydown', createNoteBook);
  activeNoteBook.call(navItem)
}

addNoteBtnEl.addEventListener('click', showNoteBookField);

/**
*Renders the existing notebook list by retrieving data from the database
*and passing it to the client. 
*/

const renderExistedNotebook = function () {
  const /*{Array}*/ notebookList = db.get.notebook();
  client.notebook.read(notebookList);
  
}
renderExistedNotebook()

/**
 * Create new note
 * 
 * Attaches event listeners to a collection of DOM elements representing "Create Note"
 * buttons.
 * 
 * When a button is clicked, it opens a modal for creating a new note and handles the
 * submission of the new note to the database and client.
 * 
 */

const /** { Array<HTMLElement> } */ noteCreateBtns = document.querySelectorAll('[data-note-create-btn]');

noteCreateBtns.forEach(element => {
  element.addEventListener('click', function () {
    const /** {Object} */ modal = NoteModal();
    modal.open();

    //Handle the submissions of the new note to database and client
    modal.onSubmit(noteObj => {
      const activeNotebookId = document.querySelector('[data-notebook].active').dataset.notebook;

      const noteData = db.post.note(activeNotebookId, noteObj);
      client.note.create(noteData);
      modal.close();
    })
  });
});


