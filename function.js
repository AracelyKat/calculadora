let pantalla = document.getElementById("pantalla");
let historial = [];

function agregar(valor) {
    if (pantalla.textContent === "0") pantalla.textContent = valor;
    else pantalla.textContent += valor;
}

function borrar() {
    pantalla.textContent = "0";
}

function calcular() {
    try {
        let expresion = pantalla.textContent;
        let resultado = eval(expresion);
        pantalla.textContent = resultado;
        guardarHistorial(expresion + " = " + resultado);
    } catch (e) {
        pantalla.textContent = "Error";
    }
}

function operar(tipo) {
    let val = parseFloat(pantalla.textContent);
    let resultado;
    switch(tipo) {
        case 'x2': resultado = val ** 2; break;
        case 'sqrt': resultado = Math.sqrt(val); break;
        case 'exp': resultado = Math.exp(val); break;
        case 'log': resultado = Math.log(val); break;
        case 'sin': resultado = Math.sin(val); break;
        case 'cos': resultado = Math.cos(val); break;
        case 'tan': resultado = Math.tan(val); break;
    }
    pantalla.textContent = resultado;
    guardarHistorial(tipo + "(" + val + ") = " + resultado);
}

function guardarHistorial(operacion) {
    historial.push(operacion);
    renderHistorial();
}

function renderHistorial() {
    let contenedor = document.getElementById("listaHistorial");
    contenedor.innerHTML = "";
    let historialInvertido = historial.slice().reverse();
    for (let i = 0; i < historialInvertido.length; i++) {
        let elemento = document.createElement("div");
        elemento.textContent = historialInvertido[i];
        contenedor.appendChild(elemento);
    }
}


function toggleHistorial() {
    let cont = document.getElementById("historial");
    cont.style.display = (cont.style.display === "none" || cont.style.display === "") ? "block" : "none";
}

function limpiarHistorial() {
    historial = [];
    renderHistorial();
}
