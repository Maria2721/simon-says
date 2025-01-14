let activeKey = null;

const getActiveKey = () => {
	return activeKey;
};

const setActiveKey = (key) => {
	activeKey = key;
};

const handleKeyClick = (key) => {
	if (activeKey !== null) return;

	key.classList.add("keyboard__key_pressed");
	activeKey = key;

	setTimeout(() => {
		key.classList.remove("keyboard__key_pressed");
		activeKey = null;
	}, 500);
};

export const keyManager = {
	getActiveKey,
	setActiveKey,
	handleKeyClick,
};
