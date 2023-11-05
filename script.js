let numA = "";
let numB = "";
let operator = "";
let equalsPressed = false;
let intermediateResult = null;

const display = document.getElementById("display");
const numBtns = document.querySelectorAll(".num-btn");
const operatorBtns = document.querySelectorAll(".operator-btn");
const equalsBtn = document.getElementById("equals");
const decimalBtn = document.getElementById("decimal");
const negativeBtn = document.getElementById("negative");
const clearBtn = document.getElementById("clear");

decimalBtn.addEventListener("click", function () {
    if (operator === "" && numA.indexOf(".") === -1) {
        numA += ".";
        pushNumToDisplay();
    } else if (operator !== "" && numB.indexOf(".") === -1) {
        numB += ".";
        pushNumToDisplay();
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
            numA += numBtn.textContent;
            display.textContent = numA;
        } else {
            numB += numBtn.textContent;
            display.textContent = numB;
        }
    });
});

operatorBtns.forEach(function (operatorBtn) {
    operatorBtn.addEventListener("click", function () {
        if (numA !== "" && numB !== "") {
            intermediateResult = operate(parseFloat(numA), parseFloat(numB), operator);
            display.textContent = intermediateResult.toString();
            numA = intermediateResult.toString();
            numB = "";
            operator = operatorBtn.textContent;
            equalsPressed = false;
        } else {
            operator = operatorBtn.textContent;
        }
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
        return numA + numB;
    } else if (operator === "-") {
        return numA - numB;
    } else if (operator === "*") {
        return numA * numB;
    } else if (operator === "/") {
        if (numB === 0) {
            return "ERROR DIV BY ZERO";
        }
        return numA / numB;
    } else if (operator === "%") {
        return (numA / 100) * numB;
    } else {
        return "ERROR";
    }
}