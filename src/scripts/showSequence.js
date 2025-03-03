import { disableButtonById } from "./disableButtonById.js";
import { disableKeyboardButtons } from "./disableKeyboardButtons.js";

export async function showSequence(length, repeat) {
	const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
	const numbers = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];

	const level = document.getElementById("level-select").value;

	let symbols = [];
	if (level === "easy") {
		symbols = numbers;
	} else if (level === "medium") {
		symbols = letters.split("");
	} else if (level === "hard") {
		symbols = numbers.concat(letters.split(""));
	}
	const sequence = [];

	disableButtonById(true, "repeat-button");
	disableButtonById(true, "restart-button");
	disableKeyboardButtons(true);

	if (!repeat) {
		for (let i = 0; i < length; i++) {
			let randomValue;
			let randomIndex;

			do {
				randomIndex = Math.floor(Math.random() * symbols.length);
				randomValue = symbols[randomIndex];
			} while (sequence[i - 1] === randomValue);

			sequence.push(randomValue);

			const keyboardButton = document.getElementById(
				`symbol${randomValue}`
			);
			await simulatePress(keyboardButton);
		}

		sessionStorage.setItem("sequence", JSON.stringify(sequence));
		console.log("Saved sequence:", sequence);
	} else {
		const savedSequence = JSON.parse(sessionStorage.getItem("sequence"));
		for (let i = 0; i < savedSequence.length; i++) {
			let randomValue = savedSequence[i];

			const keyboardButton = document.getElementById(
				`symbol${randomValue}`
			);
			await simulatePress(keyboardButton);
		}
	}

	if (!repeat) {
		disableButtonById(false, "repeat-button");
	}

	disableButtonById(false, "restart-button");
	disableKeyboardButtons(false);
}

function simulatePress(button) {
	return new Promise((resolve) => {
		button.classList.add("keyboard__key_pressed");
		const eventDown = new MouseEvent("mousedown", { bubbles: true });
		button.dispatchEvent(eventDown);

		setTimeout(() => {
			button.classList.remove("keyboard__key_pressed");
			const eventUp = new MouseEvent("mouseup", { bubbles: true });
			button.dispatchEvent(eventUp);
			resolve();
		}, 500);
	});
}
