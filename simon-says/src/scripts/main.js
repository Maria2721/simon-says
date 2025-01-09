import "normalize.css";
import "../styles/style.css";
import { setupCounter } from "./counter.js";

const initializeApp = () => {
	const app = document.createElement("div");
	app.className = "container";

	const heading = document.createElement("h1");
	heading.textContent = "Simon Says!";
	app.appendChild(heading);

	const counterButton = document.createElement("button");
	counterButton.id = "counter";
	counterButton.type = "button";
	app.appendChild(counterButton);

	document.body.appendChild(app);

	setupCounter(counterButton);
};

initializeApp();
