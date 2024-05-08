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
function calc() {
    // wip
}
function clear() {
    // wip
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