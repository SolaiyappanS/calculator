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
    if(count%3==1)
        element.classList.toggle("black");
    else if(count%3==2) {
        element.classList.toggle("black");
        element.classList.toggle("blue");
    }
    else
        element.classList.toggle("blue");
}

function append(val) {

    if(document.getElementById("numin").value.includes("."))
        isDot = true;
    else
        isDot = false;
    if(isChar && isDot){
        isDot = false;
        isChar = false;
    }
    if(isResult) {
        if(val == ".")
            document.getElementById("numin").value = "0.";
        else if(val != "00")
            document.getElementById("numin").value = val;
        isResult = false;
    }
    else if(document.getElementById("numin").value.length <10) {
        if(val == '.')
            if(!isDot) {
                isDot = true;
                if (isDigit(document.getElementById("numin").value.charAt(document.getElementById("numin").value.length-1)))
                    document.getElementById("numin").value += '.';
                else
                    document.getElementById("numin").value += '0.';
            }
            else;
        else if(document.getElementById("numin").value == '0')
            document.getElementById("numin").value = val;
        else if(val == "00"){
            if(isDigit(document.getElementById("numin").value.charAt(document.getElementById("numin").value.length-1))
            && document.getElementById("numin").value *1 != 0
            || document.getElementById("numin").value.charAt(document.getElementById("numin").value.length-1) == ".")
                document.getElementById("numin").value += val;
            else
                document.getElementById("numin").value = 0;
        }
        else
        document.getElementById("numin").value += val;
    }
    else 
        alert("No more digits are allowed");
}

function appendSpl(val) {
    var txt = document.getElementById("numin").value;
    if(!isChar || isDigit(txt.charAt(txt.length-1))) {
        if(txt == "")
            document.getElementById("numin").value += "0";
        document.getElementById("numin").value += val;
        isChar = true;
        isDot = false;
        isResult = false;
    }
}

function back() {
    var txt = document.getElementById("numin").value;
    txt = txt.slice(0,-1);
    if(txt == "") txt = "0";
    document.getElementById("numin").value = txt;
}

function clearAll() {
    document.getElementById("numin").value = "0";
    isChar = false;
}
 
function solve() {
    var numin = document.getElementById("numin").value;
    if(!isDigit(numin.charAt(numin.length-1)))
    numin = numin.slice(0,-1);
    document.getElementById("numin").value = eval(numin);
    isChar = false;
    isResult = true;
}

document.addEventListener('keypress', logKey);
document.addEventListener('keydown', logKey);
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
    }
    if(key === "Backspace")
        back();
    else if(key === "Delete")
        clearAll();
  }