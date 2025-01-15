import { roundCounter } from "./roundCounter.js";
import { showSequence } from "./showSequence.js";
import { clickingKeys } from "./clickingKeys.js";
import { clickingPhysicalKeys } from "./clickingPhysicalKeys.js";
import { errorManager } from "./errorManager.js";

const activatePhysicalKeysListener = () => {
	document.addEventListener("keydown", clickingPhysicalKeys);
};

export function startGame() {
	// inactive level selection
	const levelSelect = document.getElementById("level-select");
	levelSelect.disabled = true;
	levelSelect.style.pointerEvents = "none";
	levelSelect.style.cursor = "default";
	levelSelect.style.opacity = "0.5";

	const output = document.getElementById("output");

	// display non-editable input
	const inputWrapper = document.createElement("div");
	inputWrapper.id = "input-wrapper";
	inputWrapper.className = "input__wrapper";

	const inputLabel = document.createElement("label");
	inputLabel.htmlFor = "readonly-input";
	inputLabel.className = "sequence__label";
	inputLabel.innerHTML = "The entered sequence:";
	inputWrapper.appendChild(inputLabel);

	const inputReadonly = document.createElement("input");
	inputReadonly.type = "text";
	inputReadonly.id = "readonly-input";
	inputReadonly.className = "readonly__input";
	inputReadonly.readOnly = true;
	inputWrapper.appendChild(inputReadonly);
	output.appendChild(inputWrapper);

	// add message about input keys in sequence
	const message = document.getElementById("message");
	const answer = document.createElement("span");
	answer.id = "answer";
	answer.className = "message__answer";
	message.appendChild(answer);

	// add action buttons
	const actionsWrapper = document.getElementById("actions");
	actionsWrapper.innerHTML = "";

	const repeatButton = document.createElement("button");
	repeatButton.id = "repeat-button";
	repeatButton.type = "button";
	repeatButton.innerHTML = "Repeat the sequence";
	repeatButton.className = "action__btn";
	actionsWrapper.appendChild(repeatButton);

	repeatButton.addEventListener(
		"click",
		function () {
			inputReadonly.value = "";
			answer.textContent = "";
			errorManager.clearErrors();
			showSequence(2, true);
		},
		{
			once: true,
		}
	);

	const restartButton = document.createElement("button");
	restartButton.id = "restart-button";
	restartButton.type = "button";
	restartButton.innerHTML = "New game";
	restartButton.className = "action__btn";
	actionsWrapper.appendChild(restartButton);

	// display round counter
	const round = document.createElement("div");
	round.id = "round-counter";
	round.className = "round__counter";
	output.appendChild(round);

	// initializing counter
	const { incrementCounter } = roundCounter(round);
	incrementCounter();

	// show sequence
	showSequence(2, false);

	// add onclick on virtual keyboard
	clickingKeys();

	// add listener for physical keys press
	activatePhysicalKeysListener();
}
