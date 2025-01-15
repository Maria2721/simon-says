export function disableButtonById(state, id) {
	const button = document.getElementById(id);

	button.disabled = state;
	button.style.pointerEvents = state ? "none" : "auto";
	button.style.cursor = state ? "default" : "pointer";
	button.style.opacity = state ? "0.5" : "1";
}
