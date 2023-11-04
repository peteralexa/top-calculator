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
    if (operator === "") {
        if (numA.charAt(0) !== "-") {
            numA = "-" + numA;
        } else {
            numA = numA.slice(1);
        }
        pushNumToDisplay();
    } else {
        if (numB.charAt(0) !== "-") {
            numB = "-" + numB;
        } else {
            numB = numB.slice(1);
        }
        pushNumToDisplay(); 
    }
});

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
        if (operatorBtn.textContent === "AC") {
            allClear();
        } else if (operatorBtn.textContent === "+/-") {
            toggleSign();
        } else if (numA !== "" && numB !== "") {
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
            return "Error";
        }
        return numA / numB;
    } else if (operator === "%") {
        return (numA / 100) * numB;
    } else {
        return "ERROR";
    }
}