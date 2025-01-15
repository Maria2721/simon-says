import { generateKeyboard } from "./generateKeyboard.js";
import { startGame } from "./startGame.js";

export const addEventListeners = () => {
	const levelsSelect = document.getElementById("level-select");
	levelsSelect.addEventListener("click", generateKeyboard);

	const startButton = document.getElementById("start-button");
	startButton.addEventListener("click", startGame);
};
