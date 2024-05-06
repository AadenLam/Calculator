let pointer = 0; // pointer '|' position in the display, 0 is at the beginning
let display = ""; // the current display (not including pointer)
function add(x) {
    display = display.substring(0,pointer) + x + display.substring(pointer);
    pointer++;
    setDisplay();
}
function calc() {
    // wip
}
function equals() {
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
    document.getElementById('display').innerHTML = display.substring(0, pointer) + "|" + display.substring(pointer);
}
function setDisplayText(text) {
    display = text;
    pointer = text.length;
    setDisplay();
}