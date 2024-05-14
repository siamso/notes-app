'use strict';


const overlay = document.createElement('div');
overlay.classList.add('overlay', 'active', 'modal-overlay');

/**
 * Creates and manages a modal for adding or editing notes.The modal
 * allows users to input a note's title and text and provides functionality to submit and save the note.
 * 
 * @param {string} [title='Untitled'] - the default title for the note.
 * @param {string} [text='Add your note...'] - the default text for the note.
 * @param {string} [time=''] - The time associated with the note .
 * @returns {Object} - An object containing functions to open the modal, close the modal, and handle note submissions.
 */

const NoteModal = function (title = 'Untitled', text = 'Add your note...',time = '') {
  const modal = document.createElement('div');
  modal.classList.add('modal');

  modal.innerHTML = `
      <button class="icon-btn large" aria-label="Close modal"
      data-close-btn>

        <i class="fas fa-close" aria-hidden="true"></i>

        <div class="state-layer"></div>

      </button>

      <input type="text" placeholder="Untitled" value="${title}" class="modal-title text-title-medium"
      data-note-field>

      <textarea placeholder="Take a note..." class="modal-text text-body-large custom-scrollbar" data-note-field>${text}</textarea>

      <div class="modal-footer">
        <span class="time text-label-large">${time}</span>

        <button class="btn text" data-submit-btn>

            <span class="text-label-large">Save</span>

            <div class="state-layer"></div>
        </button>
      </div>
  `;

  const submitBtn = modal.querySelector('[data-submit-btn]');
  submitBtn.disabled = true;

  const [titleField, textField] = modal.querySelectorAll('[data-note-field]');

  const enableSubmit = function () {
    submitBtn.disabled = !titleField.value && !textField.value;
  }

  textField.addEventListener('keyup', enableSubmit);
  titleField.addEventListener('keyup', enableSubmit);

  //opens the modal
  const open = function () {
    document.body.appendChild(modal);
    document.body.appendChild(overlay);
    titleField.focus();
  }

  //close the modal
  const close = function () {
    document.body.removeChild(modal);
    document.body.removeChild(overlay);
  };

  // Attach click event to closeBtn
  const closeBtn = modal.querySelector('[data-close-btn]');
  closeBtn.addEventListener('click', close);

  /**
   * Handles the submissions of the delete confirmation.
   * 
   * @param {Function} callback - the callback function to execute with the 
   * submitted note data.
   */

  const onSubmit = function (callback) {

    submitBtn.addEventListener('click', function () {
      const /** {Object} */ noteData = {
        title: titleField.value,
        text: textField.value
      }

      callback(noteData);
    });

  }

  return { open, close, onSubmit }
}


/**
 * Creates and manages a modal for confirming the deletion of an
 * item
 * 
 * @param {string} title - The title of the item to be deleted
 * @returns {Object} an object containing functions to open the modal, close the modal,
 * and handle the confirmation 
 */

const DeleteConfirmModal = function (title) {

  const modal = document.createElement('div');
  modal.classList.add('modal');

  modal.innerHTML = `
      <h3 class="modal-title text-title-medium">
        Are you sure you want to delete <strong>"${title}"</strong>
      </h3>

      <div class="modal-footer">

        <button class="btn text" data-action-btn="false">

          <span class="text-label-large">Cancel</span>

          <div class="state-layer"></div>
        </button>

        <button class="btn fill" data-action-btn="true">

          <span class="text-label-large">Delete</span>

          <div class="state-layer"></div>

        </button>

      </div>
  `

  const open = function () {
    document.body.appendChild(modal);
    document.body.appendChild(overlay);
  };

  // Closes the delete confirmation modal by removing it from the document body

  const close = function () {
    document.body.removeChild(modal);
    document.body.removeChild(overlay);
  }

  const actionBtns = modal.querySelectorAll('[data-action-btn]');


  /**
   * Handles the submissions of the delete confirmation.
   * 
   * @param {Function} callback - the callback function to execute with the 
   * confirmation result (true for confirmation, false for cancel)
   */

  const onSubmit = function (callback) {
    actionBtns.forEach(btn => btn.addEventListener('click', function() {
      const /** {Boolean} */ isConfirm = this.dataset.actionBtn === 
      'true' ? true : false;

      callback(isConfirm);
    }));
  }

  return { open, close, onSubmit }

}

export { DeleteConfirmModal, NoteModal }