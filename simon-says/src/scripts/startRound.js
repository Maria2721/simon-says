import { roundCounter } from "./roundCounter.js";
import { showSequence } from "./showSequence.js";

export function startRound() {
	const round = document.getElementById("round-counter");
	const repeatButton = document.getElementById("repeat-button");

	const { incrementCounter, getCounter } = roundCounter(round);
	incrementCounter();
	showSequence(2 * getCounter(), false);

	repeatButton.addEventListener(
		"click",
		() => showSequence(2 * getCounter(), true),
		{
			once: true,
		}
	);
}
