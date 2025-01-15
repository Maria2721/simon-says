import { keyManager } from "./keyManager.js";

export function clickingKeys() {
	const inputReadonly = document.getElementById("readonly-input");
	const keyboard = document.getElementById("keyboard");

	keyboard.addEventListener("click", (event) => {
		const button = event.target.closest("button");

		if (keyManager.getActiveKey() !== null) {
			return;
		}

		keyManager.handleKeyClick(button);

		const valueToAdd = button.getAttribute("data-value");

		// processingAnswer(valueToAdd);
		inputReadonly.value += valueToAdd;
	});
}
