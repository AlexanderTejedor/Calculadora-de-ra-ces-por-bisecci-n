const btn = document.getElementById('btn-send');
const btn2 = document.getElementById('btn-toggle');

// Función que evalúa el polinomio dado un valor de x
const evaluarPolinomio = (a, b, c, d, x) => a * x ** 3 + b * x ** 2 + c * x + d;

// Validación de entradas numéricas
const validarEntrada = (input) => {
    const valor = input.value.trim();
    input.setCustomValidity(isNaN(valor) || valor === '' ? 'Por favor, ingrese un número válido.' : '');
    input.reportValidity();
};

// Agregar validación a los campos de entrada
document.querySelectorAll('#coefA, #coefB, #coefC, #coefD, #limInf, #limSup').forEach(input => {
    input.addEventListener('input', () => validarEntrada(input));
});

// Obtener coeficientes y límites
const obtenerValores = () => {
    return {
        a: parseFloat(document.getElementById('coefA').value),
        b: parseFloat(document.getElementById('coefB').value),
        c: parseFloat(document.getElementById('coefC').value),
        d: parseFloat(document.getElementById('coefD').value),
        limInf: parseFloat(document.getElementById('limInf').value),
        limSup: parseFloat(document.getElementById('limSup').value)
    };
};

// Método de bisección para buscar raíces en el intervalo dado
btn.addEventListener('click', () => {
    const { a, b, c, d, limInf, limSup } = obtenerValores();
    const tolerancia = 0.00001; // Precisión deseada

    if (evaluarPolinomio(a, b, c, d, limInf) * evaluarPolinomio(a, b, c, d, limSup) > 0) {
        document.getElementById('solution-content').innerHTML = "No se puede aplicar el método de la bisección en este intervalo.";
        return;
    }

    let inf = limInf;
    let sup = limSup;

    while ((sup - inf) / 2 > tolerancia) {
        const puntoMedio = (inf + sup) / 2;
        const valorMedio = evaluarPolinomio(a, b, c, d, puntoMedio);

        if (valorMedio === 0) break;

        if (evaluarPolinomio(a, b, c, d, inf) * valorMedio < 0) {
            sup = puntoMedio;
        } else {
            inf = puntoMedio;
        }
    }

    const raiz = (inf + sup) / 2;
    document.getElementById('solution-content').innerHTML = "Raíz encontrada: " + raiz.toFixed(5);
});

// Función para encontrar máximos y mínimos por inspección y comparación
btn2.addEventListener('click', () => {
    const { a, b, c, d, limInf, limSup } = obtenerValores();

    const discriminante = (2 * b) ** 2 - 12 * a * c;
    const puntosCriticos = [];

    if (discriminante >= 0) {
        const sqrtDiscriminante = Math.sqrt(discriminante);
        const x1 = (-2 * b + sqrtDiscriminante) / (6 * a);
        const x2 = (-2 * b - sqrtDiscriminante) / (6 * a);

        if (x1 >= limInf && x1 <= limSup) puntosCriticos.push(x1);
        if (x2 >= limInf && x2 <= limSup) puntosCriticos.push(x2);
    }

    puntosCriticos.push(limInf, limSup);

    let maximo = null;
    let minimo = null;

    puntosCriticos.forEach(punto => {
        const valorEnPunto = evaluarPolinomio(a, b, c, d, punto);

        if (maximo === null || valorEnPunto > maximo.valor) maximo = { punto, valor: valorEnPunto };
        if (minimo === null || valorEnPunto < minimo.valor) minimo = { punto, valor: valorEnPunto };
    });

    let resultado = "<h3>Extremos encontrados:</h3>";
    if (minimo) resultado += `Mínimo en x = ${minimo.punto.toFixed(5)}: f(x) = ${minimo.valor.toFixed(5)}<br>`;
    if (maximo) resultado += `Máximo en x = ${maximo.punto.toFixed(5)}: f(x) = ${maximo.valor.toFixed(5)}`;
    
    document.getElementById('solution-content').innerHTML = resultado;
});
