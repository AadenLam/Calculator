let pointer = 0; // pointer '|' position in the display, 0 is at the beginning
let display = []; // the expression shown in the display
function add(x) {
    display.splice(pointer, 0, x);
    pointer++;
    setDisplay();
}
function back() {
    display = display.slice(0, display.length - 1);
    move(-1);
    if (display.length === 0) {pointer = 0;}
    setDisplay();
}
function calc(expression) {
    // combine digits into full numbers (FIX)
    console.log(expression)
    let nums = ["0","1","2","3","4","5","6","7","8","9","."]
    for (let i = 1; i < expression.length; i++) {
        if (nums.indexOf(expression[i]) !== -1 && nums.indexOf(expression[i-1]) !== -1) {
            expression[i-1] += expression[i];
            expression = expression.slice(0, i).concat(expression.slice(i+1));
            i--;
        }
    }
    console.log(expression);
    // multiplication and division
    for (let i = 1; i < expression.length - 1; i++) {
        if (expression[i] === "*") {
            expression[i-1] = parseFloat(expression[i-1]) * parseFloat(expression[i+1]);
            expression = expression.slice(0, i).concat(expression.slice(i+2));
            i--;
        } else if (expression[i] === "/") {
            expression[i-1] = parseFloat(expression[i-1]) / parseFloat(expression[i+1]);
            expression = expression.slice(0, i).concat(expression.slice(i+2));
            i--;
        }
    }

    // addition and subtraction
    for (let i = 1; i < expression.length - 1; i++) {
        if (expression[i] === "+") {
            expression[i-1] = parseFloat(expression[i-1]) + parseFloat(expression[i+1]);
            expression = expression.slice(0, i).concat(expression.slice(i+2));
            i--;
        } else if (expression[i] === "-") {
            expression[i-1] = parseFloat(expression[i-1]) - parseFloat(expression[i+1]);
            expression = expression.slice(0, i).concat(expression.slice(i+2));
            i--;
        }
    }
    console.log(expression[0]);
    let answer = expression[0].toString();
    display = [];
    pointer = answer.length;
    for (let i = 0; i < answer.length; i++) {
        display[i] = answer[i];
    }
    setDisplay();
}
function clr() {
    display = [];
    pointer = 0;
    setDisplay();
}
function history(dir) {
    // wip
}
function move(dir) {
    pointer += dir;
    if (pointer < 0) {pointer = 0;}
    if (pointer > display.length) {pointer = display.length;}
    setDisplay();
}
function setDisplay() {
    let i = 0;
    let text = "";
    for (; i < pointer; i++) {
        text += display[i];
    }
    text += '|';
    for (; i < display.length; i++) {
        text += display[i];
    }
    document.getElementById("display").innerHTML = text;
}