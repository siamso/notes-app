'use strict';

// importing from other files---------
import { greeting, getDate } from "./Date.js";

const sidebar = document.querySelector('[data-sidebar]');
const sidebarTogglers = document.querySelectorAll('[data-sidebar-toggler]');
const overlay = document.querySelector('[data-sidebar-overlay]');
const greetingEl = document.querySelector('[data-greeting]');
const getDateEl = document.querySelector('[data-current-date]');

// sidebar toggler------------------------------------

sidebarTogglers.forEach(sidebarToggler => {
  sidebarToggler.addEventListener('click', () => {
    sidebar.classList.toggle('active');
    overlay.classList.toggle('active');
  })
});

// setting up greeting and date------------------------

getDateEl.textContent = getDate();
greetingEl.textContent = greeting();


