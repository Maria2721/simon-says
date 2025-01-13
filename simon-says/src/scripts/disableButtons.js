let buttonsDisabled = false;

export function disableButtons(state, id = null) {
	const buttons = document.querySelectorAll("button");
	buttons.forEach((button) => {
		if (id && button.id === id) {
			return;
		}

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
