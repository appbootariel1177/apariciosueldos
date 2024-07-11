const salaryData = {
    logica: { jornal: 10000, hora50: 1875, hora100: 2500, adicionalA: 0.1, adicionalB: 0.1 },
    chofer: { jornal: 22179.24, hora50: 4158.61, hora100: 5544.81, adicionalA: 0.15, adicionalB: 0 },
    recolector: { jornal: 20451.76, hora50: 3834.71, hora100: 5112.94, adicionalA: 0.15, adicionalB: 0 },
    peon: { jornal: 20256.57, hora50: 3798.11, hora100: 5064.14, adicionalA: 0.15, adicionalB: 0 },
    oficial1: { jornal: 24701.69, hora50: 4631.57, hora100: 6175.42, adicionalA: 0.25, adicionalB: 0.1 },
    oficialC: { jornal: 23421.87, hora50: 4391.60, hora100: 5855.47, adicionalA: 0.25, adicionalB: 0.1 },
    oficial: { jornal: 22268.16, hora50: 4175.28, hora100: 5567.04, adicionalA: 0.25, adicionalB: 0.1 },
    medioOficial: { jornal: 21268.16, hora50: 3987.78, hora100: 5317.04, adicionalA: 0.18, adicionalB: 0.02 }
};

function updateDiasValue(value) {
    document.getElementById('diasValue').textContent = value;
}

function updateHoras50Value(value) {
    document.getElementById('horas50Value').textContent = value;
}

function updateHoras100Value(value) {
    document.getElementById('horas100Value').textContent = value;
}

function updateAntiguedadValue(value) {
    document.getElementById('antiguedadValue').textContent = value;
}

function calculateSalary() {
    const category = document.getElementById('category').value;
    const dias = parseInt(document.getElementById('dias').value);
    const horas50 = parseInt(document.getElementById('horas50').value);
    const horas100 = parseInt(document.getElementById('horas100').value);
    const antiguedad = parseFloat(document.getElementById('antiguedad').value);
    
    // Obtener valores de adicionalA y adicionalB según la categoría seleccionada
    const adicionalA = salaryData[category].adicionalA * 100; // Multiplicar por 100 para convertirlo a porcentaje
    const adicionalB = salaryData[category].adicionalB * 100; // Multiplicar por 100 para convertirlo a porcentaje

    // Mostrar los valores de adicionalA y adicionalB en los campos correspondientes
    document.getElementById('adicionalA').value = adicionalA.toFixed(2);
    document.getElementById('adicionalB').value = adicionalB.toFixed(2);

    const data = salaryData[category];
    const jornal = data.jornal;
    const hora50 = data.hora50;
    const hora100 = data.hora100;

    const totalJornal = jornal * dias;
    const totalHora50 = hora50 * horas50;
    const totalHora100 = hora100 * horas100;

    const totalAdicionalA = (adicionalA / 100) * (totalJornal + totalHora50 + totalHora100);
    const totalAdicionalB = (adicionalB / 100) * (totalJornal + totalHora50 + totalHora100);
    const viaticos = dias * 4087.18;
    const comidas = dias * 8145.08;

    // Calcular antigüedad
    const totalAntiguedad = (antiguedad / 100) * (totalJornal + totalHora50 + totalHora100 + totalAdicionalA + totalAdicionalB);

    // Calcular haberes, descuentos y sueldo final
    const haberes = totalJornal + totalHora50 + totalHora100 + totalAdicionalA + totalAdicionalB + totalAntiguedad;
    const descuentos = haberes * 0.215;
    const sueldoFinal = haberes - descuentos+viaticos+comidas; // Eliminé viáticos y comidas porque no se usan en el cálculo final

    // Mostrar resultados en el HTML
    document.getElementById('results').innerHTML = `
        <h2>Resultados</h2>
        <p><strong>Total Jornal:</strong> ${totalJornal.toFixed(2)}</p>
        <p><strong>Total Hora Extra 50%:</strong> ${totalHora50.toFixed(2)}</p>
        <p><strong>Total Hora Extra 100%:</strong> ${totalHora100.toFixed(2)}</p>
        <p><strong>Total Adicional cct A:</strong> ${totalAdicionalA.toFixed(2)}</p>
        <p><strong>Total Adicional cct B:</strong> ${totalAdicionalB.toFixed(2)}</p>
        <p><strong>Antigüedad:</strong> ${totalAntiguedad.toFixed(2)}</p> <!-- Mostrar el total de antigüedad -->
        <p><strong>Haberes:</strong> ${haberes.toFixed(2)}</p>
        <p><strong>Descuentos:</strong> ${descuentos.toFixed(2)}</p>
        <p><strong>Viáticos:</strong> ${viaticos.toFixed(2)}</p>
         <p><strong>Comidas:</strong> ${comidas.toFixed(2)}</p>
        <p><strong>Sueldo Final:</strong> ${sueldoFinal.toFixed(2)}</p>
    `;
}
// Función para actualizar el valor del porcentaje de aumento
function updateAumentoValue(value) {
    document.getElementById('aumentoValue').textContent = `${value}%`;
}

// Función para simular el aumento
function simulateIncrease() {
    const aumentoPorcentaje = parseFloat(document.getElementById('aumentoPorcentaje').value);

    // Obtener los valores originales del resultado
    const totalJornal = parseFloat(document.querySelector('#results p:nth-child(2)').textContent.split(': ')[1]);
    const totalHora50 = parseFloat(document.querySelector('#results p:nth-child(3)').textContent.split(': ')[1]);
    const totalHora100 = parseFloat(document.querySelector('#results p:nth-child(4)').textContent.split(': ')[1]);
    const adicionalA = parseFloat(document.querySelector('#results p:nth-child(5)').textContent.split(': ')[1]);
    const adicionalB = parseFloat(document.querySelector('#results p:nth-child(6)').textContent.split(': ')[1]);
    const antiguedad = parseFloat(document.querySelector('#results p:nth-child(7)').textContent.split(': ')[1]);
    const viaticos = parseFloat(document.querySelector('#results p:nth-child(10)').textContent.split(': ')[1]);
    const comidas = parseFloat(document.querySelector('#results p:nth-child(11)').textContent.split(': ')[1]);

    // Calcular los nuevos valores con el aumento
    const nuevoTotalJornal = totalJornal * (1 + aumentoPorcentaje / 100);
    const nuevoTotalHora50 = totalHora50 * (1 + aumentoPorcentaje / 100);
    const nuevoTotalHora100 = totalHora100 * (1 + aumentoPorcentaje / 100);
    const nuevoViaticos = viaticos * (1 + aumentoPorcentaje / 100);
    const nuevoComidas = comidas * (1 + aumentoPorcentaje / 100);

    // Recalcular los adicionales y antigüedad con los nuevos valores
    const nuevoAdicionalA = adicionalA * (1 + aumentoPorcentaje / 100);
    const nuevoAdicionalB = adicionalB * (1 + aumentoPorcentaje / 100);
    const nuevoAntiguedad = antiguedad * (1 + aumentoPorcentaje / 100);

    // Calcular haberes, descuentos y sueldo final con los nuevos valores
    const nuevoHaberes = nuevoTotalJornal + nuevoTotalHora50 + nuevoTotalHora100 + nuevoAdicionalA + nuevoAdicionalB + nuevoAntiguedad;
    const nuevoDescuentos = nuevoHaberes * 0.215;
    const nuevoSueldoFinal = nuevoHaberes - nuevoDescuentos + nuevoViaticos + nuevoComidas;

    // Mostrar los resultados recalculados en una nueva sección del HTML
    document.getElementById('simulationResults').innerHTML = `
        <h2>Resultados con Aumento</h2>
        <p><strong>Total Jornal:</strong> ${nuevoTotalJornal.toFixed(2)}</p>
        <p><strong>Total Hora Extra 50%:</strong> ${nuevoTotalHora50.toFixed(2)}</p>
        <p><strong>Total Hora Extra 100%:</strong> ${nuevoTotalHora100.toFixed(2)}</p>
        <p><strong>Total Adicional cct A:</strong> ${nuevoAdicionalA.toFixed(2)}</p>
        <p><strong>Total Adicional cct B:</strong> ${nuevoAdicionalB.toFixed(2)}</p>
        <p><strong>Antigüedad:</strong> ${nuevoAntiguedad.toFixed(2)}</p>
        <p><strong>Haberes:</strong> ${nuevoHaberes.toFixed(2)}</p>
        <p><strong>Descuentos:</strong> ${nuevoDescuentos.toFixed(2)}</p>
        <p><strong>Viáticos:</strong> ${nuevoViaticos.toFixed(2)}</p>
        <p><strong>Comidas:</strong> ${nuevoComidas.toFixed(2)}</p>
        <p><strong>Sueldo Final:</strong> ${nuevoSueldoFinal.toFixed(2)}</p>
    `;
}
