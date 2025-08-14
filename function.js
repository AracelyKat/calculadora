let display = document.getElementById("screen");
let historyList = [];

window.addEventListener("DOMContentLoaded", () => {
    let storedHistory = localStorage.getItem("history");
    if (storedHistory) {
        historyList = JSON.parse(storedHistory);
        renderHistory();
    }
});

function addValue(value) {
    if (display.textContent === "0") display.textContent = value;
    else display.textContent += value;
}

function clearDisplay() {
    display.textContent = "0";
}

function calculate() {
    try {
        let expression = display.textContent;
        let result = eval(expression);
        display.textContent = result;
        saveHistory(expression + " = " + result);
    } catch (e) {
        display.textContent = "Error";
    }
}

function operate(type) {
    let value = parseFloat(display.textContent);
    let result;
    switch(type) {
        case 'x2': result = value ** 2; break;
        case 'sqrt': result = Math.sqrt(value); break;
        case 'exp': result = Math.exp(value); break;
        case 'log': result = Math.log(value); break;
        case 'sin': result = Math.sin(value); break;
        case 'cos': result = Math.cos(value); break;
        case 'tan': result = Math.tan(value); break;
    }
    display.textContent = result;
    saveHistory(`${type}(${value}) = ${result}`);
}

function saveHistory(operation) {
    historyList.push(operation);
    localStorage.setItem("history", JSON.stringify(historyList));
    renderHistory();
}

function renderHistory() {
    let container = document.getElementById("listaHistorial");
    container.innerHTML = "";
    let reversedHistory = historyList.slice().reverse();
    for (let i = 0; i < reversedHistory.length; i++) {
        let itemElement = document.createElement("div");
        itemElement.textContent = reversedHistory[i];
        container.appendChild(itemElement);
    }
}

function toggleHistory() {
    let histContainer = document.getElementById("historial"); // id corregido
    histContainer.style.display = (histContainer.style.display === "none" || histContainer.style.display === "") ? "block" : "none";
}

function clearHistory() {
    historyList = [];
    localStorage.removeItem("history");
    renderHistory();
}
