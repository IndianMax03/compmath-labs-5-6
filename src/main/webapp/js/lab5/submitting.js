//  created by Raj Manu on 21.05.2023



const ctx = $('#graphic')[0].getContext('2d');
let chart;

document.addEventListener('DOMContentLoaded', function () {
    chart = new Chart(ctx, {type: 'line'});
})

//****************************************************************************************************************

const submitButton = document.getElementById("submitButton");
const notificationButton = document.getElementById("notificationButton");
const submitHelper = document.getElementById("submitHelper");

submitButton.addEventListener('click', (event) => {
    event.preventDefault();
    let isValid  = true;

    const type = dataSelection.value;
    if (type === "function") {

        let aLine = aInput.value.replaceAll(" ", "");
        let aValue = aLine !== "" ? Number(aLine.replaceAll(",", ".")) : NaN;
        let bLine = bInput.value.replaceAll(" ", "");
        let bValue = bLine !== "" ? Number(bLine.replaceAll(",", ".")) : NaN;
        let nLine = nInput.value.replaceAll(" ", "");
        let nValue = nLine !== "" ? Number(nLine.replaceAll(",", ".")) : NaN;
        let xLine = xInput.value.replaceAll(" ", "");
        let xValue = xLine !== "" ? Number(xLine.replaceAll(",", ".")) : NaN;

        if (isNaN(aValue) || isNaN(bValue) || isNaN(nValue) || isNaN(xValue)) {
            isValid = false;
        }

        if (nLine.includes('.') || nLine.includes(',')) {
            isValid = false;
        }

        if (bValue <= aValue) {
            isValid = false;
        }

        if (nValue < MIN_ROW_COUNT || nValue > MAX_ROW_COUNT) {
            isValid = false;
        }

        let xColumnValues = Array.from(document.querySelectorAll('#immutableTable .xColumn'));
        xColumnValues.forEach((value) => {
            let sValue = value.textContent.replaceAll(" ", "");
            let validValue = sValue !== "" ? Number(sValue.replaceAll(",", ".")) : NaN;
            if (isNaN(validValue) || sValue === "") {
                isValid = false;
            }
        })
        xColumnValues = xColumnValues.map(element => Number(element.textContent));
        let maxValue = Math.max(...xColumnValues)
        let minValue = Math.min(...xColumnValues)
        if (xValue > maxValue || xValue < minValue) {
            isValid = false;
        }
        if (xColumnValues.includes(xValue)) {
            isValid = false;
        }

    } else {

        let xLine = xInput.value.replaceAll(" ", "");
        let xValue = xLine !== "" ? Number(xLine.replaceAll(",", ".")) : NaN;

        if (isNaN(xValue)) {
            isValid = false;
        }

        let xColumnValues = Array.from(document.querySelectorAll('#mutableTable .xColumn'));
        let yColumnValues = Array.from(document.querySelectorAll('#mutableTable .xColumn'));
        xColumnValues.forEach((value) => {
            let sValue = value.value.replaceAll(" ", "");
            let validValue = sValue !== "" ? Number(sValue.replaceAll(",", ".")) : NaN;
            if (isNaN(validValue) || sValue === "") {
                isValid = false;
            }
        })
        yColumnValues.forEach((value) => {
            let sValue = value.value.replaceAll(" ", "");
            let validValue = sValue !== "" ? Number(sValue.replaceAll(",", ".")) : NaN;
            if (isNaN(validValue) || sValue === "") {
                isValid = false;
            }
        })
        xColumnValues = xColumnValues.map(element => Number(element.value));
        yColumnValues = yColumnValues.map(element => Number(element.value));


        let maxValue = Math.max(...xColumnValues)
        let minValue = Math.min(...xColumnValues)
        if (xValue > maxValue || xValue < minValue) {
            isValid = false;
        }
        if (xColumnValues.includes(xValue)) {
            isValid = false;
        }

    }

    if (!isValid) {
        submitHelper.style.display = "block";
        console.log('есть невалидные данные')
        return;
    } else {
        submitHelper.style.display = "none";
    }

    let xColumnValues = 0;
    let yColumnValues = 0;

    if (type === "function") {
        xColumnValues = Array.from(document.querySelectorAll('#immutableTable .xColumn')).map(element => Number(element.textContent));
        yColumnValues = Array.from(document.querySelectorAll('#immutableTable .yColumn')).map(element => Number(element.textContent));
    } else {
        xColumnValues = Array.from(document.querySelectorAll('#mutableTable .xColumn')).map(element => Number(element.value));
        yColumnValues = Array.from(document.querySelectorAll('#mutableTable .yColumn')).map(element => Number(element.value));
    }

    let xLine = xInput.value.replaceAll(" ", "");
    let xValue = xLine !== "" ? Number(xLine.replaceAll(",", ".")) : NaN;

    let data = {
        x: xColumnValues,
        y: yColumnValues,
        desiredX: xValue
    }

    $.ajax({
        type: "POST",
        url: "lab5/interpolation/solve",
        data: JSON.stringify(data),
        contentType: "application/json",
        dataType: "json",
        success: function (result) {

            console.log(result)
            let errorMsg = result['error'];

            if (errorMsg !== undefined) {
                document.getElementById("result").value = errorMsg;
                return;
            }

            let resultArea = document.getElementById("result");

            const desiredX = result['desiredX'];
            const finiteDifferences = result['finiteDifferences'];
            const lX = result['lX'];
            const lY = result['lY'];
            const nX = result['nX'];
            const nY = result['nY'];
            const x = result['x'];
            const y = result['y'];
            const lagrangeDesiredY = result['lagrangeDesiredY'];
            const newtonDesiredY = result['newtonDesiredY'];

            resultArea.value = "";
            resultArea.value += "Lagrange: y = " + lagrangeDesiredY + "\n";
            resultArea.value += "Newton: y = " + newtonDesiredY;

            const tableElement = document.createElement("table");
            tableElement.classList.add("table", "is-fullwidth", "has-text-centered");

            const containerElement = document.getElementById("finiteDifferencesTable");
            containerElement.innerHTML = "";
            containerElement.appendChild(tableElement);
            let diffsCount = 0;

            for (let i = 0; i < 50; i++) {
                if (finiteDifferences['d' + i] === undefined) {
                    diffsCount = i;
                    break;
                }
            }

            const theadElement = document.createElement("thead");
            const headerRow = document.createElement("tr");

            for (let i = 0; i < diffsCount; i++) {
                const headerCell = document.createElement("th");
                headerCell.classList.add('has-text-centered')
                headerCell.textContent = 'd' + i;
                headerRow.appendChild(headerCell);
            }
            theadElement.appendChild(headerRow);
            tableElement.appendChild(theadElement);

            const tableBody = document.createElement("tbody");

            // Заполнение таблицы случайными значениями
            for (let i = 0; i < diffsCount; i++) {
                const row = document.createElement("tr");

                for (let j = 0; j < diffsCount; j++) {
                    const cell = document.createElement("td");
                    console.log(finiteDifferences['d' + j][i])
                    let value = finiteDifferences['d' + j][i];
                    if (value === undefined) {
                        cell.textContent = '-';
                    } else {
                        cell.textContent = value.toFixed(2);
                    }
                    row.appendChild(cell);
                }
                tableBody.appendChild(row);
            }

            tableElement.appendChild(tableBody);


            /**************** Обновочки графика ***************/

            let j = 0;
            for (let i = 0; i < lX.length; i++) {
                if (lX[i] !== x[j]) {
                    x.splice(j, 0, NaN);
                    y.splice(j, 0, NaN);
                }
                j++;
            }

            const data = {
                labels: lX,
                datasets: [
                    {
                    label: 'Точки',
                    data: [],
                    backgroundColor: 'rgba(255, 99, 132, 0.2)',
                    borderColor: 'rgba(255, 99, 132, 1)',
                    borderWidth: 4
                    },
                    {
                        label: 'Лагрик',
                        data: [],
                        backgroundColor: 'rgba(12, 99, 132, 0.2)',
                        borderColor: 'rgba(12, 99, 132, 1)',
                        borderWidth: 3
                    },
                    {
                        label: 'Ньютик',
                        data: [],
                        backgroundColor: 'rgba(12, 92229, 132, 0.2)',
                        borderColor: 'rgba(12, 222, 132, 1)',
                        borderWidth: 5
                    }
                    ]
            };


            for (let i = 0; i < x.length; i++) {
                data.datasets[0].data.push({ x: x[i], y: y[i] });
            }

            for (let i = 0; i < lX.length; i++) {
                data.datasets[1].data.push({ x: lX[i], y: lY[i] });
            }

            for (let i = 0; i < nX.length; i++) {
                data.datasets[2].data.push({ x: nX[i], y: nY[i] });
            }

            console.log(data.datasets)

            const options = {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: false,
                            fontSize: 10,
                            max: Math.max(...lY),
                            min: Math.min(...lY)
                        }
                    }],
                    xAxes: [{
                        ticks: {
                            fontSize: 10,
                            max: Math.max(...lX),
                            min: Math.min(...lX)
                        }
                    }]
                },
                legend: {
                    display: true,
                    labels: {
                        fontSize: 8,
                    }
                }
            };

            chart.data = data;
            chart.options = options;

            chart.update();


        },
        error: function (xhr, status, error) {
            document.getElementById("result").value = error;
        }
    })

})

notificationButton.addEventListener("click", () => {
    submitHelper.style.display = "none";
})
