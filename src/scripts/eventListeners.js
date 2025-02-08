import { generateKeyboard } from "./generateKeyboard.js";
import { startGame } from "./startGame.js";

let initialLevel;
if (sessionStorage.getItem("level") !== null) {
	initialLevel = JSON.parse(sessionStorage.getItem("level"));
} else {
	initialLevel = "easy";
}

export const addEventListeners = () => {
	const levelsSelect = document.getElementById("level-select");
	levelsSelect.value = initialLevel;
	levelsSelect.addEventListener("click", generateKeyboard);

	const startButton = document.getElementById("start-button");
	startButton.addEventListener("click", startGame);
};
