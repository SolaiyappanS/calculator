var count = 0;
var element = document.body;
var isDot = false;
var isResult = false;
var display = document.getElementById("numin");
document.addEventListener('keypress', logKey);
document.addEventListener('keydown', logKeyd);

function swapmode() {
    count++;
    switch (count) {
        case 1:
            element.classList = "red";
            break;
        case 2:
            element.classList = "green";
            break;
        case 3:
            element.classList = "blue";
            break;
        default:
            element.classList = "regular";
            count = 0;
    }
}

function append(val) {

    if(isResult) {
        if(val == ".") {
            display.innerHTML = "0.";
            isDot = true;
        }
        else
            display.innerHTML = val;
        isResult = false;
    }
    else if(display.innerHTML.length <12) {
        if(val == '.')
            if(!isDot) {
                isDot = true;
                if (isDigit(display.innerHTML.charAt(display.innerHTML.length-1)))
                    display.innerHTML += '.';
                else
                    display.innerHTML += '0.';
            }
            else;
        else if(display.innerHTML == '0')
            display.innerHTML = val;
        else 
            display.innerHTML += val;
    }
    else 
        alert("No more digits are allowed");
}

function appendSpl(val) {
    var txt = display.innerHTML;
    if(isDigit(txt.charAt(txt.length-1))) {
        if(txt == "")
            display.innerHTML += "0";
        display.innerHTML += val;
        isDot = false;
        isResult = false;
    }
    else if("+-*/".includes(txt.charAt(txt.length-1))){
        txt = txt.slice(0,-1);
        txt += val;
        display.innerHTML = txt;
    }
    else if(txt.charAt(txt.length-1) == ".") {
        txt += "0" + val;
        display.innerHTML = txt;
        isDot = false;
        isResult = false;
    }
}

function back() {
    if(isResult) {
        isResult = false;
        display.innerHTML = "0";
    }
    var txt = display.innerHTML;
    txt = txt.slice(0,-1);
    if(txt == "") {
        txt = "0";
        isDot = false;
    }
    display.innerHTML = txt;
}

function clearAll() {
    display.innerHTML = "0";
    isDot = false;
}
 
function solve() {
    var numin = display.innerHTML;
    if(!isDigit(numin.charAt(numin.length-1)))
    numin = numin.slice(0,-1);
    display.innerHTML = round(eval(numin),5);
    isDot = false;
    isResult = true;
}

function logKey(e) {
    if(e.which >= 49 && e.which <= 57)
    append(e.which-48);
    else switch(e.which){
        case 48:
            append("0");
            break;
        case 43:
            appendSpl("+");
            break;
        case 45:
            appendSpl("-");
            break;
        case 42:
            appendSpl("*");
            break;
        case 47:
            appendSpl("/");
            break;
        case 61:
        case 13:
            solve();
            break;
        case 46:
            append(".");
    }
}
  
function logKeyd(e) {
    const key = e.key;
    if(key === "Backspace")
        back();
    else if(key === "Delete")
        clearAll();
}

function round(value, decimals) {
    return Number(Math.round(value+'e'+decimals)+'e-'+decimals);
}

function isDigit(val) {
    if(val >= '0' && val <= '9')
        return true;
    return false;
}