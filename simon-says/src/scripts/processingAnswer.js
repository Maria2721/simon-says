export function processingAnswer(keyValue) {
	const inputWrapper = document.getElementById("input-wrapper");
	const savedSequence = JSON.parse(sessionStorage.getItem("sequence"));
	const inputReadonly = document.getElementById("readonly-input");
	const len = inputReadonly.value.length;

	if (savedSequence[len] !== keyValue) {
	}
}
