var count = 0;
var element = document.body;
var isChar = false;
var isDot = false;
var isResult = false;

function isDigit(val) {
    if(val >= '0' && val <= '9')
        return true;
    return false;
}

function swapmode() {
    count++;
    switch (count%4) {
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
    }
}

function append(val) {

    if(document.getElementById("numin").innerHTML.includes("."))
        isDot = true;
    else
        isDot = false;
    if(isChar && isDot){
        isDot = false;
    }
    if(isResult) {
        if(val == ".")
            document.getElementById("numin").innerHTML = "0.";
        else if(val != "00")
            document.getElementById("numin").innerHTML = val;
        isResult = false;
    }
    else if(document.getElementById("numin").innerHTML.length <12) {
        if(val == '.')
            if(!isDot) {
                isDot = true;
                if (isDigit(document.getElementById("numin").innerHTML.charAt(document.getElementById("numin").innerHTML.length-1)))
                    document.getElementById("numin").innerHTML += '.';
                else
                    document.getElementById("numin").innerHTML += '0.';
            }
            else;
        else if(document.getElementById("numin").innerHTML == '0')
            document.getElementById("numin").innerHTML = val;
        else if(val == "00"){
            if(isDigit(document.getElementById("numin").innerHTML.charAt(document.getElementById("numin").innerHTML.length-1))
            && document.getElementById("numin").innerHTML *1 != 0
            || document.getElementById("numin").innerHTML.charAt(document.getElementById("numin").innerHTML.length-1) == ".")
                document.getElementById("numin").innerHTML += val;
            else
                document.getElementById("numin").innerHTML = 0;
        }
        else
        document.getElementById("numin").innerHTML += val;
    }
    else 
        alert("No more digits are allowed");
}

function appendSpl(val) {
    var txt = document.getElementById("numin").innerHTML;
    if(!isChar || isDigit(txt.charAt(txt.length-1))) {
        if(txt == "")
            document.getElementById("numin").innerHTML += "0";
        document.getElementById("numin").innerHTML += val;
        isChar = true;
        isDot = false;
        isResult = false;
    }
}

function back() {
    if(isResult) {
        isResult = false;
        document.getElementById("numin").innerHTML = "0";
    }
    var txt = document.getElementById("numin").innerHTML;
    txt = txt.slice(0,-1);
    if(txt == "") txt = "0";
    document.getElementById("numin").innerHTML = txt;
}

function clearAll() {
    document.getElementById("numin").innerHTML = "0";
    isChar = false;
}
 
function solve() {
    var numin = document.getElementById("numin").innerHTML;
    if(!isDigit(numin.charAt(numin.length-1)))
    numin = numin.slice(0,-1);
    document.getElementById("numin").innerHTML = round(eval(numin),5);
    isChar = false;
    isResult = true;
}

document.addEventListener('keypress', logKey);
document.addEventListener('keydown', logKeyd);
function logKey(e) {
    const key = e.key;
    if(e.which >= 48 && e.which <= 57)
    append(e.which-48)
    else switch(e.which){
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