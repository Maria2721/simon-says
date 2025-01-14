import { keyManager } from "./keyManager.js";

export function clickingKeys() {
	const inputReadonly = document.getElementById("readonly-input");
	const keyboard = document.getElementById("keyboard");
	const buttons = keyboard.querySelectorAll("button");

	buttons.forEach((button) => {
		button.addEventListener("click", () => {
			if (keyManager.getActiveKey() !== null) {
				return;
			}

			keyManager.handleKeyClick(button);

			const valueToAdd = button.getAttribute("data-value");
			inputReadonly.value += valueToAdd;
		});
	});
}
