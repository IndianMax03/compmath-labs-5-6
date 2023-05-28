//  created by Raj Manu on 28.05.2023

const eulerCtx = $('#eulerGraphic')[0].getContext('2d');
let eulerChart;

const ruKuCtx = $('#rungeKuttaGraphic')[0].getContext('2d');
let ruKuChart;


const milneCtx = $('#milneGraphic')[0].getContext('2d');
let milneChart;

document.addEventListener('DOMContentLoaded', function () {
    eulerChart = new Chart(eulerCtx, {type: 'line'});
    ruKuChart = new Chart(ruKuCtx, {type: 'line'});
    milneChart = new Chart(milneCtx, {type: 'line'});
})





//****************************************************************************************************************

const submitButton = document.getElementById("submit-button");
const notificationButton = document.getElementById("notification-button");
const submitHelper = document.getElementById("submit-helper");
const TABLE_FRACTION_COUNT = 7

submitButton.addEventListener('click', (event) => {

    event.preventDefault();

    let isValid = isValidInput(x0Input) &&
        isValidInput(xnInput) &&
        isValidInput(yx0Input) &&
        isValidInput(hInput) &&
        isValidInput(epsInput) &&
        validateInterval() &&
        isValidStep() &&
        isValidEpsilon();

    if (!isValid) {
        submitHelper.style.display = "block";
        console.log('есть невалидные данные')
        return;
    } else {
        submitHelper.style.display = "none";
    }

    console.log("Данные прошли валидацию. Следует запрос:");

    let data = {
        x0: formatValue(x0Input.value),
        xN: formatValue(xnInput.value),
        yX0: formatValue(yx0Input.value),
        h: formatValue(hInput.value),
        eps: formatValue(epsInput.value),
        sde: document.querySelector('input[name="sde"]:checked').id,
    }

    $.ajax({
        type: "POST",
        url: "lab6/sde/solve",
        data: JSON.stringify(data),
        contentType: "application/json",
        dataType: "json",
        success: function (result) {
            console.log(result);
            document.getElementById("result").value = "";

            let errorMsg = result['error'];
            let eulerExpectedY = result['eulerExpectedY'];
            let eulerX = result['eulerX'];
            let eulerY = result['eulerY'];
            let milneExpectedY = result['milneExpectedY'];
            let milneX = result['milneX'];
            let milneY = result['milneY'];
            let rungeKuttaExpectedY = result['rungeKuttaExpectedY'];
            let rungeKuttaX = result['rungeKuttaX'];
            let rungeKuttaY = result['rungeKuttaY'];

            if (errorMsg !== undefined) {
                document.getElementById("result").value = errorMsg + "\n";
                document.getElementById("result").classList.add("is-danger");
                if (eulerX === undefined) {
                    document.getElementById("eulerTable").innerHTML = "";
                    document.getElementById("rungeKuttaTable").innerHTML = "";
                    document.getElementById("milneTable").innerHTML = "";
                    return;
                }
            }

            if (eulerX.length === 0) {
                document.getElementById("result").value += "Методу Эйлера не удалось добиться указанной точности" + "\n";
            }
            if (rungeKuttaX.length === 0) {
                document.getElementById("result").value += "Методу Рунге-Кутта не удалось добиться указанной точности" + "\n";
            }
            if (milneX !== undefined && milneX.length === 0) {
                document.getElementById("result").value += "Методу Милна не удалось добиться указанной точности" + "\n";
            }

            if (milneX === undefined || eulerX.length + rungeKuttaX.length === 0) {
                document.getElementById("eulerTable").innerHTML = "";
                document.getElementById("rungeKuttaTable").innerHTML = "";
                document.getElementById("milneTable").innerHTML = "";
                document.getElementById("result").classList.add("is-danger");
                return;
            }
            document.getElementById("result").classList.remove("is-danger");
            document.getElementById("result").value += "Данные успешно получены, они ожидают вас на странице ниже";
            /**************** Таблица Эйлера ***************/
            let tableElement = document.createElement("table");
            tableElement.classList.add("table", "is-fullwidth", "has-text-centered");

            let containerElement = document.getElementById("eulerTable");
            containerElement.innerHTML = "";
            containerElement.appendChild(tableElement);

            let theadElement = document.createElement("thead");
            let headerRow = document.createElement("tr");

            let headerCell = document.createElement("th");
            headerCell.classList.add('has-text-centered')
            headerCell.textContent = 'i';
            headerRow.appendChild(headerCell);
            headerCell = document.createElement("th");
            headerCell.classList.add('has-text-centered')
            headerCell.textContent = 'x_i';
            headerRow.appendChild(headerCell);
            headerCell = document.createElement("th");
            headerCell.classList.add('has-text-centered')
            headerCell.textContent = 'euler_y_i';
            headerRow.appendChild(headerCell);
            headerCell = document.createElement("th");
            headerCell.classList.add('has-text-centered')
            headerCell.textContent = 'y_i';
            theadElement.appendChild(headerRow);
            headerRow.appendChild(headerCell);

            tableElement.appendChild(theadElement);

            let tableBody = document.createElement("tbody");

            for (let i = 0; i < eulerX.length; i++) {
                const row = document.createElement("tr");
                const i_cell = document.createElement("td");
                const x_i_cell = document.createElement("td");
                const euler_y_i_cell = document.createElement("td");
                const y_i_cell = document.createElement("td");

                i_cell.textContent = i;
                row.appendChild(i_cell);

                let x_i = eulerX[i];

                if (x_i === undefined) {
                    x_i_cell.textContent = '-';
                } else {
                    x_i_cell.textContent = x_i.toFixed(TABLE_FRACTION_COUNT);
                }
                row.appendChild(x_i_cell);


                let euler_y_i = eulerY[i];

                if (euler_y_i === undefined) {
                    euler_y_i_cell.textContent = '-';
                } else {
                    euler_y_i_cell.textContent = euler_y_i.toFixed(TABLE_FRACTION_COUNT);
                }
                row.appendChild(euler_y_i_cell);

                let y_i = eulerExpectedY[i];
                if (y_i === undefined) {
                    y_i_cell.textContent = '-';
                } else {
                    y_i_cell.textContent = y_i.toFixed(TABLE_FRACTION_COUNT);
                }
                row.appendChild(y_i_cell);

                tableBody.appendChild(row);
            }

            tableElement.appendChild(tableBody);

            /**************** Таблица Рунге-Кутта ***************/
            tableElement = document.createElement("table");
            tableElement.classList.add("table", "is-fullwidth", "has-text-centered");

            containerElement = document.getElementById("rungeKuttaTable");
            containerElement.innerHTML = "";
            containerElement.appendChild(tableElement);

            theadElement = document.createElement("thead");
            headerRow = document.createElement("tr");

            headerCell = document.createElement("th");
            headerCell.classList.add('has-text-centered')
            headerCell.textContent = 'i';
            headerRow.appendChild(headerCell);
            headerCell = document.createElement("th");
            headerCell.classList.add('has-text-centered')
            headerCell.textContent = 'x_i';
            headerRow.appendChild(headerCell);
            headerCell = document.createElement("th");
            headerCell.classList.add('has-text-centered')
            headerCell.textContent = 'ru-ku_y_i';
            headerRow.appendChild(headerCell);
            headerCell = document.createElement("th");
            headerCell.classList.add('has-text-centered')
            headerCell.textContent = 'y_i';
            theadElement.appendChild(headerRow);
            headerRow.appendChild(headerCell);

            tableElement.appendChild(theadElement);

            tableBody = document.createElement("tbody");

            for (let i = 0; i < rungeKuttaX.length; i++) {
                const row = document.createElement("tr");
                const i_cell = document.createElement("td");
                const x_i_cell = document.createElement("td");
                const rungeKutta_y_i_cell = document.createElement("td");
                const y_i_cell = document.createElement("td");

                i_cell.textContent = i;
                row.appendChild(i_cell);

                let x_i = rungeKuttaX[i];

                if (x_i === undefined) {
                    x_i_cell.textContent = '-';
                } else {
                    x_i_cell.textContent = x_i.toFixed(TABLE_FRACTION_COUNT);
                }
                row.appendChild(x_i_cell);


                let rungeKutta_y_i = rungeKuttaY[i];

                if (rungeKutta_y_i === undefined) {
                    rungeKutta_y_i_cell.textContent = '-';
                } else {
                    rungeKutta_y_i_cell.textContent = rungeKutta_y_i.toFixed(TABLE_FRACTION_COUNT);
                }
                row.appendChild(rungeKutta_y_i_cell);

                let y_i = rungeKuttaExpectedY[i];
                if (y_i === undefined) {
                    y_i_cell.textContent = '-';
                } else {
                    y_i_cell.textContent = y_i.toFixed(TABLE_FRACTION_COUNT);
                }
                row.appendChild(y_i_cell);

                tableBody.appendChild(row);
            }

            tableElement.appendChild(tableBody);

            /**************** Таблица Милна ***************/
            tableElement = document.createElement("table");
            tableElement.classList.add("table", "is-fullwidth", "has-text-centered");

            containerElement = document.getElementById("milneTable");
            containerElement.innerHTML = "";
            containerElement.appendChild(tableElement);

            theadElement = document.createElement("thead");
            headerRow = document.createElement("tr");

            headerCell = document.createElement("th");
            headerCell.classList.add('has-text-centered')
            headerCell.textContent = 'i';
            headerRow.appendChild(headerCell);
            headerCell = document.createElement("th");
            headerCell.classList.add('has-text-centered')
            headerCell.textContent = 'x_i';
            headerRow.appendChild(headerCell);
            headerCell = document.createElement("th");
            headerCell.classList.add('has-text-centered')
            headerCell.textContent = 'milne_y_i';
            headerRow.appendChild(headerCell);
            headerCell = document.createElement("th");
            headerCell.classList.add('has-text-centered')
            headerCell.textContent = 'y_i';
            theadElement.appendChild(headerRow);
            headerRow.appendChild(headerCell);

            tableElement.appendChild(theadElement);

            tableBody = document.createElement("tbody");

            for (let i = 0; i < milneX.length; i++) {
                const row = document.createElement("tr");
                const i_cell = document.createElement("td");
                const x_i_cell = document.createElement("td");
                const milne_y_i_cell = document.createElement("td");
                const y_i_cell = document.createElement("td");

                i_cell.textContent = i;
                row.appendChild(i_cell);

                let x_i = milneX[i];

                if (x_i === undefined) {
                    x_i_cell.textContent = '-';
                } else {
                    x_i_cell.textContent = x_i.toFixed(TABLE_FRACTION_COUNT);
                }
                row.appendChild(x_i_cell);


                let milne_y_i = milneY[i];

                if (milne_y_i === undefined) {
                    milne_y_i_cell.textContent = '-';
                } else {
                    milne_y_i_cell.textContent = milne_y_i.toFixed(TABLE_FRACTION_COUNT);
                }
                row.appendChild(milne_y_i_cell);

                let y_i = milneExpectedY[i];
                if (y_i === undefined) {
                    y_i_cell.textContent = '-';
                } else {
                    y_i_cell.textContent = y_i.toFixed(TABLE_FRACTION_COUNT);
                }
                row.appendChild(y_i_cell);

                tableBody.appendChild(row);
            }

            tableElement.appendChild(tableBody);

            /**************** Графики ***************/

            /**************** График Эйлера ***************/

            const eulerData = {
                labels: eulerX,
                datasets: [
                    {
                        label: 'Эйлер',
                        data: [],
                        backgroundColor: 'rgba(255, 99, 132, 0.2)',
                        borderColor: 'rgba(255, 99, 132, 1)',
                        borderWidth: 3,
                    },
                    {
                        label: 'Функция',
                        data: [],
                        backgroundColor: 'rgba(12, 99, 132, 0.2)',
                        borderColor: 'rgba(12, 99, 132, 1)',
                        borderWidth: 8,
                        showLine: true
                    },
                ]
            };


            for (let i = 0; i < eulerX.length; i++) {
                eulerData.datasets[0].data.push({ x: eulerX[i], y: eulerY[i] });
            }

            for (let i = 0; i < eulerExpectedY.length; i++) {
                eulerData.datasets[1].data.push({ x: eulerX[i], y: eulerExpectedY[i] });
            }

            const eulerOptions = {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: false,
                            fontSize: 10,
                            max: Math.max(...eulerY),
                            min: Math.min(...eulerY)
                        }
                    }],
                    xAxes: [{
                        ticks: {
                            fontSize: 10,
                            max: Math.max(...eulerX),
                            min: Math.min(...eulerX)
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

            eulerChart.data = eulerData;
            eulerChart.options = eulerOptions;

            eulerChart.update();

            /**************** График Рунге-Кутта ***************/

            const rungeKuttaData = {
                labels: rungeKuttaX,
                datasets: [
                    {
                        label: 'Рунге-Кутта',
                        data: [],
                        backgroundColor: 'rgba(255, 99, 132, 0.2)',
                        borderColor: 'rgba(255, 99, 132, 1)',
                        borderWidth: 3,
                    },
                    {
                        label: 'Функция',
                        data: [],
                        backgroundColor: 'rgba(12, 99, 132, 0.2)',
                        borderColor: 'rgba(12, 99, 132, 1)',
                        borderWidth: 8,
                        showLine: true
                    },
                ]
            };


            for (let i = 0; i < rungeKuttaX.length; i++) {
                rungeKuttaData.datasets[0].data.push({ x: rungeKuttaX[i], y: rungeKuttaY[i] });
            }

            for (let i = 0; i < rungeKuttaExpectedY.length; i++) {
                rungeKuttaData.datasets[1].data.push({ x: rungeKuttaX[i], y: rungeKuttaExpectedY[i] });
            }

            const rungeKuttaOptions = {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: false,
                            fontSize: 10,
                            max: Math.max(...rungeKuttaY),
                            min: Math.min(...rungeKuttaY)
                        }
                    }],
                    xAxes: [{
                        ticks: {
                            fontSize: 10,
                            max: Math.max(...rungeKuttaX),
                            min: Math.min(...rungeKuttaX)
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

            ruKuChart.data = rungeKuttaData;
            ruKuChart.options = rungeKuttaOptions;

            ruKuChart.update();

            /**************** График Милна ***************/

            const milneData = {
                labels: milneX,
                datasets: [
                    {
                        label: 'Милн',
                        data: [],
                        backgroundColor: 'rgba(255, 99, 132, 0.2)',
                        borderColor: 'rgba(255, 99, 132, 1)',
                        borderWidth: 3,
                    },
                    {
                        label: 'Функция',
                        data: [],
                        backgroundColor: 'rgba(12, 99, 132, 0.2)',
                        borderColor: 'rgba(12, 99, 132, 1)',
                        borderWidth: 8,
                        showLine: true
                    },
                ]
            };


            for (let i = 0; i < milneX.length; i++) {
                milneData.datasets[0].data.push({ x: milneX[i], y: milneY[i] });
            }

            for (let i = 0; i < milneExpectedY.length; i++) {
                milneData.datasets[1].data.push({ x: milneX[i], y: milneExpectedY[i] });
            }

            const milneOptions = {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: false,
                            fontSize: 10,
                            max: Math.max(...milneY),
                            min: Math.min(...milneY)
                        }
                    }],
                    xAxes: [{
                        ticks: {
                            fontSize: 10,
                            max: Math.max(...milneX),
                            min: Math.min(...milneX)
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

            milneChart.data = milneData;
            milneChart.options = milneOptions;

            milneChart.update();

        },
        error: function (xhr, status, error) {
            console.log(error);
        }
    })

})

notificationButton.addEventListener("click", () => {
    submitHelper.style.display = "none";
})
