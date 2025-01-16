import { addEventListeners } from "./eventListeners.js";
import { disableButtonById } from "./disableButtonById.js";
import { errorManager } from "./errorManager.js";
import { keyManager } from "./keyManager.js";

export function restartGame() {
	const actionsWrapper = document.getElementById("actions");
	actionsWrapper.innerHTML = "";

	const startButton = document.createElement("button");
	startButton.id = "start-button";
	startButton.type = "button";
	startButton.innerHTML = "Start";
	startButton.className = "action__btn";
	actionsWrapper.appendChild(startButton);

	disableButtonById(false, "level-select");

	const output = document.getElementById("output");
	output.innerHTML = "";

	const message = document.getElementById("message");
	message.innerHTML = "";

	addEventListeners();

	errorManager.clearErrors();
	keyManager.setActiveKey(null);
}
