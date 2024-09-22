const btn = document.getElementById('btn-send');
const btn2 = document.getElementById('btn-toggle');

// Función que evalúa el polinomio dado un valor de x
function evaluarPolinomio(a, b, c, d, x) {
    return a * Math.pow(x, 3) + b * Math.pow(x, 2) + c * x + d;
}

// Método de bisección para buscar raíces en el intervalo dado
btn.addEventListener('click', () => {
    const a = parseFloat(document.getElementById('coefA').value);
    const b = parseFloat(document.getElementById('coefB').value);
    const c = parseFloat(document.getElementById('coefC').value);
    const d = parseFloat(document.getElementById('coefD').value);
    let limInf = parseFloat(document.getElementById('limInf').value);
    let limSup = parseFloat(document.getElementById('limSup').value);

    const tolerancia = 0.00001; // Precisión deseada
    let raiz = null;

    // Verificar si hay un cambio de signo en los límites iniciales
    if (evaluarPolinomio(a, b, c, d, limInf) * evaluarPolinomio(a, b, c, d, limSup) > 0) {
        document.getElementById('solution-content').innerHTML = "No se puede aplicar el método de la bisección en este intervalo.";
        return;
    }

    // Aplicar el método de la bisección
    while ((limSup - limInf) / 2 > tolerancia) {
        let puntoMedio = (limInf + limSup) / 2;
        let valorMedio = evaluarPolinomio(a, b, c, d, puntoMedio);

        if (valorMedio === 0) {
            raiz = puntoMedio;
            break;
        }

        if (evaluarPolinomio(a, b, c, d, limInf) * valorMedio < 0) {
            limSup = puntoMedio;
        } else {
            limInf = puntoMedio;
        }

        raiz = (limInf + limSup) / 2;
    }

    document.getElementById('solution-content').innerHTML = "Raíz encontrada: " + raiz.toFixed(5);
});

// Función para encontrar máximos y mínimos por inspección y comparación
/* 
btn2.addEventListener('click', () => {
    const a = parseFloat(document.getElementById('coefA').value);
    const b = parseFloat(document.getElementById('coefB').value);
    const c = parseFloat(document.getElementById('coefC').value);
    const d = parseFloat(document.getElementById('coefD').value);

    let xMin = -10; 
    let xMax = 10;
    let step = 0.01;

    let xMaximo = xMin;
    let xMinimo = xMin;
    let yMaximo = evaluarPolinomio(a, b, c, d, xMin);
    let yMinimo = evaluarPolinomio(a, b, c, d, xMin);

    for (let x = xMin; x <= xMax; x += step) {
        let y = evaluarPolinomio(a, b, c, d, x);

        if (y > yMaximo) {
            yMaximo = y;
            xMaximo = x;
        }

        if (y < yMinimo) {
            yMinimo = y;
            xMinimo = x;
        }
    }

    document.getElementById('solution-content').innerHTML += "Máximo: (" + xMaximo.toFixed(5) + ", " + yMaximo.toFixed(5) + ")<br>" +
        "Mínimo: (" + xMinimo.toFixed(5) + ", " + yMinimo.toFixed(5) + ")<br>";
});

 */

//Función para encontrar máximos y mínimos por inspección y comparación

// Función para encontrar máximos y mínimos por inspección y comparación
btn2.addEventListener('click', () => {
    const a = parseFloat(document.getElementById('coefA').value);
    const b = parseFloat(document.getElementById('coefB').value);
    const c = parseFloat(document.getElementById('coefC').value);
    const d = parseFloat(document.getElementById('coefD').value);
    let limInf = parseFloat(document.getElementById('limInf').value);
    let limSup = parseFloat(document.getElementById('limSup').value);

    // Derivada del polinomio (3ax^2 + 2bx + c)
    function derivada(x) {
        return 3 * a * Math.pow(x, 2) + 2 * b * x + c;
    }

    // Segunda derivada para determinar concavidad
    function segundaDerivada(x) {
        return 6 * a * x + 2 * b;
    }

    // Resolver la derivada 3ax^2 + 2bx + c = 0 para encontrar puntos críticos
    let discriminante = Math.pow(2 * b, 2) - 4 * 3 * a * c; // b^2 - 4ac (ecuación cuadrática)

    let puntosCriticos = [];

    if (discriminante >= 0) {
        let x1 = (-2 * b + Math.sqrt(discriminante)) / (2 * 3 * a);
        let x2 = (-2 * b - Math.sqrt(discriminante)) / (2 * 3 * a);

        // Si los puntos críticos están dentro del intervalo, los consideramos
        if (x1 >= limInf && x1 <= limSup) {
            puntosCriticos.push(x1);
        }
        if (x2 >= limInf && x2 <= limSup) {
            puntosCriticos.push(x2);
        }
    }

    // También verificamos los valores en los extremos del intervalo
    puntosCriticos.push(limInf);
    puntosCriticos.push(limSup);

    let maximo = null;
    let minimo = null;

    puntosCriticos.forEach(punto => {
        let valorEnPunto = evaluarPolinomio(a, b, c, d, punto);

        // Inicializar máximo y mínimo con los primeros valores
        if (maximo === null || valorEnPunto > maximo.valor) {
            maximo = { punto, valor: valorEnPunto };
        }
        if (minimo === null || valorEnPunto < minimo.valor) {
            minimo = { punto, valor: valorEnPunto };
        }
    });

    let resultado = "Extremos encontrados:<br>";
    if (minimo) resultado += `Mínimo en x = ${minimo.punto.toFixed(5)}: f(x) = ${minimo.valor.toFixed(5)}<br>`;
    if (maximo) resultado += `Máximo en x = ${maximo.punto.toFixed(5)}: f(x) = ${maximo.valor.toFixed(5)}`;
    
    document.getElementById('solution-content').innerHTML = resultado;
});