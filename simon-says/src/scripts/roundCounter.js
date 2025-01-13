export function roundCounter(displayElement) {
	let counter = 0;

	const setCounter = (count) => {
		counter = count;
		displayElement.innerHTML = `Current round ${counter}`;
	};

	const incrementCounter = () => {
		setCounter(counter + 1);
	};

	const resetCounter = () => {
		setCounter(0);
	};

	const getCounter = () => {
		return counter;
	};

	return { incrementCounter, resetCounter, getCounter };
}
