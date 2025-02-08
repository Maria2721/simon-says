let buttonsDisabled = false;

export function disableKeyboardButtons(state) {
	const keyboard = document.getElementById("keyboard");
	const buttons = keyboard.querySelectorAll("button");

	buttons.forEach((button) => {
		button.disabled = state;
		button.style.pointerEvents = state ? "none" : "auto";
		button.style.cursor = state ? "default" : "pointer";
	});

	buttonsDisabled = state;

	if (state) {
		document.addEventListener("keydown", blockKeyboardInteractions);
	} else {
		document.removeEventListener("keydown", blockKeyboardInteractions);
	}
}

function blockKeyboardInteractions(event) {
	if (buttonsDisabled) {
		event.preventDefault();
		event.stopPropagation();
	}
}
