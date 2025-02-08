import "normalize.css";
import "../styles/style.css";

import { initializeApp } from "./initializeApp.js";
import { generateKeyboard } from "./generateKeyboard.js";
import { addEventListeners } from "./eventListeners.js";

const initializeAppAndEvents = () => {
	initializeApp();
	addEventListeners();
	generateKeyboard();
};

initializeAppAndEvents();
