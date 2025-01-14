export function generateKeyboard() {
	const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
	const numbers = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];

	const keyboard = document.getElementById("keyboard");
	const level = document.getElementById("level-select").value;

	keyboard.innerHTML = "";

	let symbols = [];
	if (level === "easy") {
		symbols = numbers;
	} else if (level === "medium") {
		symbols = letters.split("");
	} else if (level === "hard") {
		symbols = numbers.concat(letters.split(""));
	}

	symbols.forEach((el) => {
		const key = document.createElement("button");
		key.type = "button";
		key.id = `symbol${el}`;
		key.dataset.value = el;
		key.innerHTML = el;
		key.className = "keyboard__key";
		keyboard.appendChild(key);
	});
}
