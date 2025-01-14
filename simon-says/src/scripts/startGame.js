import { roundCounter } from "./roundCounter.js";
import { showSequence } from "./showSequence.js";
import { clickingKeys } from "./clickingKeys.js";

export function startGame() {
	// add action buttons
	const actionsWrapper = document.getElementById("actions");
	actionsWrapper.innerHTML = "";

	const repeatButton = document.createElement("button");
	repeatButton.id = "repeat-button";
	repeatButton.type = "button";
	repeatButton.innerHTML = "Repeat the sequence";
	repeatButton.className = "action__btn";
	actionsWrapper.appendChild(repeatButton);

	repeatButton.addEventListener("click", () => showSequence(2, true), {
		once: true,
	});

	const restartButton = document.createElement("button");
	restartButton.id = "restart-button";
	restartButton.type = "button";
	restartButton.innerHTML = "New game";
	restartButton.className = "action__btn";
	actionsWrapper.appendChild(restartButton);

	// inactive level selection
	const levelSelect = document.getElementById("level-select");
	levelSelect.disabled = true;
	levelSelect.style.pointerEvents = "none";
	levelSelect.style.cursor = "default";
	levelSelect.style.opacity = "0.5";

	const output = document.getElementById("output");

	// display non-editable input
	const inputWrapper = document.createElement("div");
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

	clickingKeys();
}
