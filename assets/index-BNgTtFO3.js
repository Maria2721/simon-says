(function polyfill() {
  const relList = document.createElement("link").relList;
  if (relList && relList.supports && relList.supports("modulepreload")) {
    return;
  }
  for (const link of document.querySelectorAll('link[rel="modulepreload"]')) {
    processPreload(link);
  }
  new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      if (mutation.type !== "childList") {
        continue;
      }
      for (const node of mutation.addedNodes) {
        if (node.tagName === "LINK" && node.rel === "modulepreload")
          processPreload(node);
      }
    }
  }).observe(document, { childList: true, subtree: true });
  function getFetchOpts(link) {
    const fetchOpts = {};
    if (link.integrity) fetchOpts.integrity = link.integrity;
    if (link.referrerPolicy) fetchOpts.referrerPolicy = link.referrerPolicy;
    if (link.crossOrigin === "use-credentials")
      fetchOpts.credentials = "include";
    else if (link.crossOrigin === "anonymous") fetchOpts.credentials = "omit";
    else fetchOpts.credentials = "same-origin";
    return fetchOpts;
  }
  function processPreload(link) {
    if (link.ep)
      return;
    link.ep = true;
    const fetchOpts = getFetchOpts(link);
    fetch(link.href, fetchOpts);
  }
})();
const initializeApp = () => {
  const app = document.createElement("div");
  app.className = "container";
  const heading = document.createElement("h1");
  heading.textContent = "Simon Says game!";
  heading.className = "heading";
  app.appendChild(heading);
  const options = document.createElement("div");
  options.id = "options";
  options.className = "options";
  const actionsWrapper = document.createElement("div");
  actionsWrapper.id = "actions";
  actionsWrapper.className = "actions__wrapper";
  const startButton = document.createElement("button");
  startButton.id = "start-button";
  startButton.type = "button";
  startButton.innerHTML = "Start";
  startButton.className = "action__btn";
  actionsWrapper.appendChild(startButton);
  options.appendChild(actionsWrapper);
  const selectWrapper = document.createElement("div");
  selectWrapper.className = "select__wrapper";
  const levelLabel = document.createElement("label");
  levelLabel.htmlFor = "level-select";
  levelLabel.className = "level__label";
  levelLabel.innerHTML = "Choose level:";
  selectWrapper.appendChild(levelLabel);
  const levelSelect = document.createElement("select");
  levelSelect.id = "level-select";
  levelSelect.name = "levels";
  levelSelect.className = "level__select";
  const option1 = document.createElement("option");
  option1.value = "easy";
  option1.innerHTML = "Easy";
  option1.className = "level__option";
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
  const output = document.createElement("div");
  output.id = "output";
  output.className = "output";
  app.appendChild(output);
  const message = document.createElement("div");
  message.id = "message";
  message.className = "message";
  app.appendChild(message);
  const keyboard = document.createElement("div");
  keyboard.id = "keyboard";
  keyboard.className = "keyboard__wrapper";
  app.appendChild(keyboard);
  document.body.appendChild(app);
};
function generateKeyboard() {
  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const numbers = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
  const keyboard = document.getElementById("keyboard");
  const level = document.getElementById("level-select").value;
  sessionStorage.setItem("level", JSON.stringify(level));
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
function roundCounter(displayElement) {
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
function disableButtonById(state, id) {
  const button = document.getElementById(id);
  button.disabled = state;
  button.style.pointerEvents = state ? "none" : "auto";
  button.style.cursor = state ? "default" : "pointer";
  button.style.opacity = state ? "0.5" : "1";
}
let buttonsDisabled = false;
function disableKeyboardButtons(state) {
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
async function showSequence(length, repeat) {
  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const numbers = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
  const level = document.getElementById("level-select").value;
  let symbols = [];
  if (level === "easy") {
    symbols = numbers;
  } else if (level === "medium") {
    symbols = letters.split("");
  } else if (level === "hard") {
    symbols = numbers.concat(letters.split(""));
  }
  const sequence = [];
  disableButtonById(true, "repeat-button");
  disableButtonById(true, "restart-button");
  disableKeyboardButtons(true);
  if (!repeat) {
    for (let i = 0; i < length; i++) {
      let randomValue;
      let randomIndex;
      do {
        randomIndex = Math.floor(Math.random() * symbols.length);
        randomValue = symbols[randomIndex];
      } while (sequence[i - 1] === randomValue);
      sequence.push(randomValue);
      const keyboardButton = document.getElementById(
        `symbol${randomValue}`
      );
      await simulatePress(keyboardButton);
    }
    sessionStorage.setItem("sequence", JSON.stringify(sequence));
    console.log("Saved sequence:", sequence);
  } else {
    const savedSequence = JSON.parse(sessionStorage.getItem("sequence"));
    for (let i = 0; i < savedSequence.length; i++) {
      let randomValue = savedSequence[i];
      const keyboardButton = document.getElementById(
        `symbol${randomValue}`
      );
      await simulatePress(keyboardButton);
    }
  }
  if (!repeat) {
    disableButtonById(false, "repeat-button");
  }
  disableButtonById(false, "restart-button");
  disableKeyboardButtons(false);
}
function simulatePress(button) {
  return new Promise((resolve) => {
    button.classList.add("keyboard__key_pressed");
    const eventDown = new MouseEvent("mousedown", { bubbles: true });
    button.dispatchEvent(eventDown);
    setTimeout(() => {
      button.classList.remove("keyboard__key_pressed");
      const eventUp = new MouseEvent("mouseup", { bubbles: true });
      button.dispatchEvent(eventUp);
      resolve();
    }, 500);
  });
}
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
const keyManager = {
  getActiveKey,
  setActiveKey,
  handleKeyClick
};
let errorCount = 0;
const getErrorCount = () => {
  return errorCount;
};
const incrementError = () => {
  errorCount += 1;
};
const clearErrors = () => {
  errorCount = 0;
};
const errorManager = {
  getErrorCount,
  incrementError,
  clearErrors
};
function clickingPhysicalKeys(event) {
  const inputReadonly = document.getElementById("readonly-input");
  let keyPressed = event.key;
  keyPressed = keyPressed.toUpperCase();
  const virtualKeyButton = document.querySelector(
    `.keyboard__key[data-value="${keyPressed}"]`
  );
  if (keyManager.getActiveKey() !== null) {
    return;
  }
  if (virtualKeyButton) {
    keyManager.handleKeyClick(virtualKeyButton);
    const answer = processingAnswer(keyPressed);
    if (answer) {
      inputReadonly.value += keyPressed;
    }
  }
}
const deactivatePhysicalKeysListener = () => {
  document.removeEventListener("keydown", clickingPhysicalKeys);
};
function processingAnswer(keyValue) {
  const answer = document.getElementById("answer");
  const savedSequence = JSON.parse(sessionStorage.getItem("sequence"));
  const inputReadonly = document.getElementById("readonly-input");
  const len = inputReadonly.value.length;
  answer.textContent = "";
  if (errorManager.getErrorCount() >= 1) {
    answer.textContent = "Too many errors, game over!";
    disableButtonById(true, "repeat-button");
    disableKeyboardButtons(true);
    deactivatePhysicalKeysListener();
    return false;
  }
  if (savedSequence[len] !== keyValue) {
    errorManager.incrementError();
    answer.textContent = "Incorrect answer!";
    return false;
  }
  if (savedSequence.length === len + 1) {
    answer.textContent = "Correct sequence, congratulation!";
    disableButtonById(true, "repeat-button");
    disableKeyboardButtons(true);
    deactivatePhysicalKeysListener();
  }
  return true;
}
function clickingKeys() {
  const inputReadonly = document.getElementById("readonly-input");
  const keyboard = document.getElementById("keyboard");
  keyboard.addEventListener("click", (event) => {
    const button = event.target.closest("button");
    if (keyManager.getActiveKey() !== null) {
      return;
    }
    if (button) {
      keyManager.handleKeyClick(button);
      const valueToAdd = button.getAttribute("data-value");
      const answer = processingAnswer(valueToAdd);
      if (answer) {
        inputReadonly.value += valueToAdd;
      }
    }
  });
}
function restartGame() {
  const actionsWrapper = document.getElementById("actions");
  actionsWrapper.innerHTML = "";
  const startButton = document.createElement("button");
  startButton.id = "start-button";
  startButton.type = "button";
  startButton.innerHTML = "Start";
  startButton.className = "action__btn";
  actionsWrapper.appendChild(startButton);
  disableButtonById(false, "level-select");
  const output = document.getElementById("output");
  output.innerHTML = "";
  const message = document.getElementById("message");
  message.innerHTML = "";
  addEventListeners();
  errorManager.clearErrors();
  keyManager.setActiveKey(null);
}
const activatePhysicalKeysListener = () => {
  document.addEventListener("keydown", clickingPhysicalKeys);
};
function startGame() {
  disableButtonById(true, "level-select");
  const output = document.getElementById("output");
  const inputWrapper = document.createElement("div");
  inputWrapper.id = "input-wrapper";
  inputWrapper.className = "input__wrapper";
  const inputLabel = document.createElement("label");
  inputLabel.htmlFor = "readonly-input";
  inputLabel.className = "sequence__label";
  inputLabel.innerHTML = "The entered sequence:";
  inputWrapper.appendChild(inputLabel);
  const inputReadonly = document.createElement("input");
  inputReadonly.type = "text";
  inputReadonly.id = "readonly-input";
  inputReadonly.value = "";
  inputReadonly.className = "readonly__input";
  inputReadonly.readOnly = true;
  inputWrapper.appendChild(inputReadonly);
  output.appendChild(inputWrapper);
  const message = document.getElementById("message");
  const answer = document.createElement("span");
  answer.id = "answer";
  answer.textContent = "";
  answer.className = "message__answer";
  message.appendChild(answer);
  const actionsWrapper = document.getElementById("actions");
  actionsWrapper.innerHTML = "";
  const repeatButton = document.createElement("button");
  repeatButton.id = "repeat-button";
  repeatButton.type = "button";
  repeatButton.innerHTML = "Repeat the sequence";
  repeatButton.className = "action__btn";
  actionsWrapper.appendChild(repeatButton);
  repeatButton.addEventListener(
    "click",
    function() {
      inputReadonly.value = "";
      answer.textContent = "";
      errorManager.clearErrors();
      showSequence(2, true);
    },
    {
      once: true
    }
  );
  const restartButton = document.createElement("button");
  restartButton.id = "restart-button";
  restartButton.type = "button";
  restartButton.innerHTML = "New game";
  restartButton.className = "action__btn";
  actionsWrapper.appendChild(restartButton);
  restartButton.addEventListener("click", restartGame);
  const round = document.createElement("div");
  round.id = "round-counter";
  round.className = "round__counter";
  output.appendChild(round);
  const { incrementCounter } = roundCounter(round);
  incrementCounter();
  showSequence(2, false);
  clickingKeys();
  activatePhysicalKeysListener();
}
let initialLevel;
if (sessionStorage.getItem("level") !== null) {
  initialLevel = JSON.parse(sessionStorage.getItem("level"));
} else {
  initialLevel = "easy";
}
const addEventListeners = () => {
  const levelsSelect = document.getElementById("level-select");
  levelsSelect.value = initialLevel;
  levelsSelect.addEventListener("click", generateKeyboard);
  const startButton = document.getElementById("start-button");
  startButton.addEventListener("click", startGame);
};
const initializeAppAndEvents = () => {
  initializeApp();
  addEventListeners();
  generateKeyboard();
};
initializeAppAndEvents();
