
const greeting = function () {
  const currentHour = new Date().getHours();
  
  const greetings = 
  currentHour < 12 ? 'Morning' :
  currentHour < 18 ? 'Afternoon' :
  currentHour < 24 ? 'Evening' :
  'Morning'
  return `Good ${greetings}`;
}


const getDate = function () {
  const Months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul',
  'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const currentDate = new Date(),
  currentDay = currentDate.getDate(),
  currentMonth = Months[currentDate.getMonth()],
  currentYear = currentDate.getFullYear();
  
  return `${currentMonth} ${currentDay}, ${currentYear}`;
}

// make note book field content editable and focus

const makeElemEditable = function (element) {
  element.setAttribute('contenteditable', 'true');
  element.focus();
};

// generating id for the notebooks

function generateID () {
  return new Date().getTime().toString()
}

// active new created notebook and deactive previous one
let lastActiveNavItem;

const activeNoteBook = function () {
  lastActiveNavItem?.classList.remove('active');
  this.classList.add('active'); //this: navItem
  lastActiveNavItem = this;
}

/**
 * Finds a notebook in database by its ID.
 * 
 * @param {Object} db - the database containing the notebooks.
 * @param {string} notebookId - The ID of the notebook to find.
 * @returns {Object | undefined} the found notebook object or undefined if not found.
 * 
 */

const findNotebook = function (db, notebookId){
  return db.notebooks.find(notebook => notebook.id === notebookId);
}

/**
 * Finds the index of a notebook in an array of notebooks based on its ID.
 * 
 * @param {Object} db - the object containing an array of notebooks.
 * @param {String} notebookId - the id of the notebook to find.
 * @returns {number} the index of the found notebook, or -1 if not 
 * found.
 */

const findNotebookIndex = function (db, notebookId) {
  return db.notebooks.findIndex(item => item.id === notebookId);
}

export {
  greeting,
  getDate,
  makeElemEditable,
  generateID,
  activeNoteBook,
  findNotebook,
  findNotebookIndex
}