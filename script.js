let numA;

let numB;

let operator;

function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a,b) {
    return a * b;
}

function divide(a,b) {
    return a / b;
}

function operate(numA, numB, operator) {
    if (operator === "+") {
        return add(numA, numB);
    }

    if (operator === "-") {
        return subtract(numA, numB);
    }

    if (operator === "*") {
        return multiply(numA, numB);
    }

    if (operator === "/") {
        return divide(numA, numB);
    }
}

numA = 5;

numB = 4;

operator = "-";

console.log(operate(numA,numB, operator))
