import "normalize.css";
import "../styles/style.css";

import { generateKeyboard } from "./keyboard.js";

const initializeApp = () => {
	const app = document.createElement("div");
	app.className = "container";

	const heading = document.createElement("h1");
	heading.textContent = "Simon Says game!";
	heading.className = "heading";
	app.appendChild(heading);

	const options = document.createElement("div");
	options.className = "options";

	const startButton = document.createElement("button");
	startButton.id = "start-button";
	startButton.type = "button";
	startButton.innerHTML = "Start";
	startButton.className = "start__btn";
	options.appendChild(startButton);

	const selectWrapper = document.createElement("div");
	selectWrapper.className = "select__wrapper";

	const levelLabel = document.createElement("label");
	levelLabel.htmlFor = "level-select";
	levelLabel.className = "level__label";
	levelLabel.innerHTML = "Choose level";
	selectWrapper.appendChild(levelLabel);

	const levelSelect = document.createElement("select");
	levelSelect.id = "level-select";
	levelSelect.name = "levels";
	levelSelect.className = "level__select";

	const option1 = document.createElement("option");
	option1.value = "easy";
	option1.innerHTML = "Easy";
	option1.className = "level__option";
	option1.selected = true;
	levelSelect.appendChild(option1);

	const option2 = document.createElement("option");
	option2.value = "medium";
	option2.innerHTML = "Medium";
	option2.className = "level__option";
	levelSelect.appendChild(option2);

	const option3 = document.createElement("option");
	option3.value = "hard";
	option3.innerHTML = "Hard";
	option3.className = "level__option";
	levelSelect.appendChild(option3);

	selectWrapper.appendChild(levelSelect);
	options.appendChild(selectWrapper);
	app.appendChild(options);

	const keyboard = document.createElement("div");
	keyboard.id = "keyboard";
	keyboard.className = "keyboard__wrapper";
	app.appendChild(keyboard);

	document.body.appendChild(app);
};

initializeApp();
generateKeyboard();

const levelsSelect = document.getElementById("level-select");
levelsSelect.addEventListener("click", generateKeyboard);
