'use strict';


const overlay = document.createElement('div');
overlay.classList.add('overlay', 'active', 'modal-overlay');


/**
 * Creates and manages a modal for confirming the deletion of an
 * item
 * 
 * @param {string} title - The title of the item to be deleted
 * @returns {Object} - an object containing functions to open the modal, close the modal,
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

export { DeleteConfirmModal }