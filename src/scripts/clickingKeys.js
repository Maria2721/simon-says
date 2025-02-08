import { keyManager } from "./keyManager.js";
import { processingAnswer } from "./processingAnswer.js";

export function clickingKeys() {
	const inputReadonly = document.getElementById("readonly-input");
	const keyboard = document.getElementById("keyboard");

	keyboard.addEventListener("click", (event) => {
		const button = event.target.closest("button");

		if (keyManager.getActiveKey() !== null) {
			return;
		}

		if (button) {
			keyManager.handleKeyClick(button);

			const valueToAdd = button.getAttribute("data-value");
			const answer = processingAnswer(valueToAdd);

			if (answer) {
				inputReadonly.value += valueToAdd;
			}
		}
	});
}
