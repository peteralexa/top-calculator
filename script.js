let numA = "";
let numB = "";
let operator = "";
let equalsPressed = false;
let intermediateResult = null;
let decimalAdded = false;

const MAX_DIGITS_BEFORE_DECIMAL = 9; 
const MAX_DIGITS_AFTER_DECIMAL = 3;

const display = document.getElementById("display");
const numBtns = document.querySelectorAll(".num-btn");
const operatorBtns = document.querySelectorAll(".operator-btn");
const equalsBtn = document.getElementById("equals");
const decimalBtn = document.getElementById("decimal");
const negativeBtn = document.getElementById("negative");
const clearBtn = document.getElementById("clear");
const backspaceBtn = document.getElementById("backspace");

window.addEventListener('dblclick', function (event) {
    event.preventDefault();
});

document.addEventListener("keydown", function (event) {
    const key = event.key;

    if (!isNaN(key) || key === ".") {
        handleNumberInput(key);
    } else if (key === "+" || key === "-" || key === "*" || key === "/" || key === "%") {
        handleOperatorInput(key);
    } else if (key === "Enter") {
        handleEqualsInput();
    } else if (key === "Escape") {
        allClear();
    } else if (key === "Backspace") {
        handleBackspaceInput();
    }
});

function handleBackspaceInput() {
    if (equalsPressed) {
        allClear();
    } else if (operator === "") {
        numA = numA.slice(0, -1);
        display.textContent = numA;
    } else {
        numB = numB.slice(0, -1);
        display.textContent = numB;
    }
}

function handleNumberInput(key) {
    if (equalsPressed) {
        allClear();
    }

    if (operator === "") {
        if (key === "." && !decimalAdded) {
            numA += key;
            decimalAdded = true;
        } else if (!isNaN(key) && numA.indexOf(".") !== -1 && numA.split(".")[1].length < MAX_DIGITS_AFTER_DECIMAL) {
            numA += key;
        } else if (!isNaN(key) && numA.indexOf(".") === -1 && numA.length < MAX_DIGITS_BEFORE_DECIMAL) {
            numA += key;
            decimalAdded = false;
        }
        pushNumToDisplay();
    } else {
        if (key === "." && !decimalAdded) {
            numB += key;
            decimalAdded = true;
        } else if (!isNaN(key) && numB.indexOf(".") !== -1 && numB.split(".")[1].length < MAX_DIGITS_AFTER_DECIMAL) {
            numB += key;
        } else if (!isNaN(key) && numB.indexOf(".") === -1 && numB.length < MAX_DIGITS_BEFORE_DECIMAL) {
            numB += key;
            decimalAdded = false;
        }
        pushNumToDisplay();
    }
}

function handleOperatorInput(key) {
    if (numA !== "" && numB !== "") {
        intermediateResult = operate(parseFloat(numA), parseFloat(numB), operator);
        numA = intermediateResult.toString();
        numB = "";
        display.textContent = numA;
    }
    operator = key;
    equalsPressed = false;
    pushNumToDisplay();
}

function handleEqualsInput() {
    if (numA !== "" && numB !== "" && operator !== "") {
        const result = operate(parseFloat(intermediateResult || numA), parseFloat(numB), operator);
        display.textContent = result.toString();
        intermediateResult = null;
        numA = result.toString();
        numB = "";
        operator = "";
        equalsPressed = true;
    }
}

backspaceBtn.addEventListener("click", function () {
    if (equalsPressed) {
        allClear();
    } else if (operator === "") {
        numA = numA.slice(0, -1);
        display.textContent = numA;
    } else {
        numB = numB.slice(0, -1);
        display.textContent = numB;
    }
});

decimalBtn.addEventListener("click", function () {
    if (operator === "" && numA.indexOf(".") === -1) {
        numA += ".";
        pushNumToDisplay();
        decimalAdded = true;
    } else if (operator !== "" && numB.indexOf(".") === -1) {
        numB += ".";
        pushNumToDisplay();
        decimalAdded = true;
    }
});

negativeBtn.addEventListener("click", function () {
    if (equalsPressed) {
        if (numA) {
            numA = toggleSign(numA);
        } else if (numB) {
            numB = toggleSign(numB);
        }
        display.textContent = numA || numB || "0";
        operator = "";
        equalsPressed = false;
        intermediateResult = null;
    } else if (operator === "") {
        numA = toggleSign(numA);
        display.textContent = numA;
    } else {
        if (numB) {
            numB = toggleSign(numB);
            display.textContent = numB;
        }
    }
});

clearBtn.addEventListener("click", allClear);

function toggleSign(number) {
    if (number.charAt(0) !== "-") {
        return "-" + number;
    } else {
        return number.slice(1);
    }
}

function pushNumToDisplay() {
    if (operator === "") {
        display.textContent = numA;
    } else {
        display.textContent = numB;
    }
}

numBtns.forEach(function (numBtn) {
    numBtn.addEventListener("click", function () {
        if (equalsPressed) {
            display.textContent = "";
            numA = "";
            numB = "";
            operator = "";
            equalsPressed = false;
            intermediateResult = null;
        }

        if (operator === "") {
            if (numA.indexOf(".") === -1 && numA.length < MAX_DIGITS_BEFORE_DECIMAL) {
                numA += numBtn.textContent;
                display.textContent = numA;
            } else if (numA.indexOf(".") !== -1 && numA.split(".")[1].length < MAX_DIGITS_AFTER_DECIMAL) {
                numA += numBtn.textContent;
                display.textContent = numA;
            }
        } else {
            if (numB.indexOf(".") === -1 && numB.length < MAX_DIGITS_BEFORE_DECIMAL) {
                numB += numBtn.textContent;
                display.textContent = numB;
            } else if (numB.indexOf(".") !== -1 && numB.split(".")[1].length < MAX_DIGITS_AFTER_DECIMAL) {
                numB += numBtn.textContent;
                display.textContent = numB;
            }
        }
    });
});

operatorBtns.forEach(function (operatorBtn) {
    operatorBtn.addEventListener("click", function () {
        if (numA !== "" && numB !== "") {
            intermediateResult = operate(parseFloat(numA), parseFloat(numB), operator);
            numA = intermediateResult.toString();
            numB = "";
            display.textContent = numA;
        }
        operator = operatorBtn.textContent;
        equalsPressed = false;
    });
});

equalsBtn.addEventListener("click", function () {
    if (numA !== "" && numB !== "" && operator !== "") {
        const result = operate(parseFloat(intermediateResult || numA), parseFloat(numB), operator);
        display.textContent = result.toString();
        intermediateResult = null;
        numA = result.toString();
        numB = "";
        operator = "";
        equalsPressed = true;
    }
});

function allClear() {
    numA = "";
    numB = "";
    operator = "";
    equalsPressed = false;
    intermediateResult = null;
    display.textContent = "";
}

function operate(numA, numB, operator) {
    numA = parseFloat(numA);
    numB = parseFloat(numB);

    if (operator === "+") {
        return (numA + numB).toString();
    } else if (operator === "-") {
        return (numA - numB).toString();
    } else if (operator === "*") {
        return (numA * numB).toString();
    } else if (operator === "/") {
        if (numB === 0) {
            return "ERROR DIV BY ZERO";
        }
        return (numA / numB).toString();
    } else if (operator === "%") {
        return ((numA / 100) * numB).toString();
    } else {
        return "ERROR";
    }
}