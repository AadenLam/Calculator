let pointer = 0; // pointer '|' position in the display, 0 is at the beginning
let display = []; // the expression shown in the display
let historyPos = -1 // history position (-1 if not in history)
if (localStorage.getItem("historyLength") == null) {
    localStorage.setItem("historyLength","0");
}
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
    // combine digits into full numbers
    for (let i = 1; i < expression.length; i++) {
        if (isNum(expression[i]) && isNum(expression[i-1])) {
            expression[i-1] += expression[i];
            expression = expression.slice(0, i).concat(expression.slice(i+1));
            i--;
        }
    }

    // parenthesis and square roots
    for (let i = 0; i < expression.length - 1; i++) {
        if (expression[i].charAt(expression[i].length - 1) === "(") {
            let type = expression[i];
            let parenthesis = 1, start = i;
            while (parenthesis !== 0) {
                i++;
                if (i >= expression.length) {
                    expression = [NaN];
                    break;
                }
                if (expression[i] === "(") {
                    parenthesis++;
                } else if (expression[i] === ")") {
                    parenthesis--;
                }
            }
            let result = calc(expression.slice(start + 1, i));
            if (type === "sqrt(") {
                result = Math.sqrt(parseFloat(result)).toString();
            }
            expression = expression.slice(0, start).concat(result).concat(expression.slice(i+1));
        }
    }

    // exponentiation
    for (let i = 1; i < expression.length - 1; i++) {
        if (expression[i] === "^") {
            expression[i-1] = Math.pow(parseFloat(expression[i-1]), parseFloat(expression[i+1]));
            expression = expression.slice(0, i).concat(expression.slice(i+2));
            i--;
        }
    }

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
    return parseFloat(expression[0]).toString();
}
function clr() {
    display = [];
    pointer = 0;
    setDisplay();
}
function enter() {
    for (let i = localStorage.getItem("historyLength") - 1; i > 0; i--) {
        localStorage.setItem("history".concat(i.toString()), localStorage.getItem("history".concat((i-1).toString())));
    }
    localStorage.setItem("history0",display.toString());
    localStorage.setItem("historyLength",(parseInt(localStorage.getItem("historyLength")) + 1).toString());
    let answer = calc(display);
    display = [];
    pointer = answer.length;
    for (let i = 0; i < answer.length; i++) {
        display[i] = answer[i];
    }
    setDisplay();
}
function hist(dir) {
    historyPos += dir;
    console.log(historyPos + " " + localStorage.getItem("historyLength"));
    if (historyPos < -1) {historyPos = -1;}
    if (historyPos > parseInt(localStorage.getItem("historyLength")) - 1) {historyPos = parseInt(localStorage.getItem("historyLength")) - 1}
    if (historyPos === -1) {
        clr();
        return;
    }
    let i = 0;
    let x = localStorage.getItem("history".concat(historyPos.toString()));
    display = [];
    while (x.indexOf(",") !== -1) {
        display[i] = x.substring(0, x.indexOf(","));
        x = x.substring(x.indexOf(",") + 1);
        i++;
    }
    display[i] = x;
    console.log(display);
    pointer = display.length;
    setDisplay();
}
function isNum(num) {
    let valid = ['0','1','2','3','4','5','6','7','8','9','.'];
    for (let i = 0; i < num.length; i++) {
        if (valid.indexOf(num[i]) === -1) {
            return false;
        }
    }
    return true;
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