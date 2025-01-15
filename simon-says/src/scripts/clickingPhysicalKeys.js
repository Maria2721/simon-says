import { keyManager } from "./keyManager.js";

export function clickingPhysicalKeys(event) {
	const inputReadonly = document.getElementById("readonly-input");
	let keyPressed = event.key;
	keyPressed = keyPressed.toUpperCase();

	const virtualKeyButton = document.querySelector(
		`.keyboard__key[data-value="${keyPressed}"]`
	);

	if (keyManager.getActiveKey() !== null) {
		return;
	}

	if (virtualKeyButton) {
		keyManager.handleKeyClick(virtualKeyButton);
		inputReadonly.value += keyPressed;
	}
}
