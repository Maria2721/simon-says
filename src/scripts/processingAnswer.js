import { errorManager } from "./errorManager.js";
import { disableButtonById } from "./disableButtonById.js";
import { disableKeyboardButtons } from "./disableKeyboardButtons.js";
import { clickingPhysicalKeys } from "./clickingPhysicalKeys.js";

const deactivatePhysicalKeysListener = () => {
	document.removeEventListener("keydown", clickingPhysicalKeys);
};

export function processingAnswer(keyValue) {
	const answer = document.getElementById("answer");
	const savedSequence = JSON.parse(sessionStorage.getItem("sequence"));
	const inputReadonly = document.getElementById("readonly-input");
	const len = inputReadonly.value.length;

	// clear the answer
	answer.textContent = "";

	// check on value of errors
	if (errorManager.getErrorCount() >= 1) {
		answer.textContent = "Too many errors, game over!";
		disableButtonById(true, "repeat-button");
		disableKeyboardButtons(true);
		deactivatePhysicalKeysListener();

		return false;
	}

	// check on incorrect key
	if (savedSequence[len] !== keyValue) {
		errorManager.incrementError();
		answer.textContent = "Incorrect answer!";
		return false;
	}

	// check on correct all sequence
	if (savedSequence.length === len + 1) {
		answer.textContent = "Correct sequence, congratulation!";
		disableButtonById(true, "repeat-button");
		disableKeyboardButtons(true);
		deactivatePhysicalKeysListener();
	}

	return true;
}
