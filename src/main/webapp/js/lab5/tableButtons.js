//  created by Raj Manu on 21.05.2023

const MIN_ROW_COUNT = 2
const MAX_ROW_COUNT = 20
const FRACTION_DIGIT_COUNT = 12
const fillButton = document.getElementById("fill")
const clearButton = document.getElementById("clear")
const addButton = document.getElementById("add")
const removeButton = document.getElementById("remove")
const mutableTable = document.getElementById("mutableTable")

clearButton.addEventListener('click', (event) => {
    const inputElements = mutableTable.querySelectorAll('input[type="text"]');
    inputElements.forEach((input) => {
        input.value = "";
    });
    validateX()
})

fillButton.addEventListener('click', (event) => {

    const xValues = document.querySelectorAll('#mutableTable .xColumn')
    const yValues = document.querySelectorAll('#mutableTable .yColumn')

    xValues.forEach((input, index) => {
        input.value = (index+1);
    })

    yValues.forEach((input) => {
        input.value = input.value !== "" ? input.value : (Math.random() * 100 - 50).toFixed(FRACTION_DIGIT_COUNT);
    });
    validateX()
})

addButton.addEventListener('click', (event) => {
    const table = document.getElementById("mutableTable").querySelector("table")
    const rows = table.querySelectorAll("tr");
    if (rows.length === MAX_ROW_COUNT + 1) {
        return;
    }
    const newRow = document.createElement("tr");
    const cell1 = document.createElement("td");
    const cell2 = document.createElement("td");
    const input1 = document.createElement("input");
    const input2 = document.createElement("input");

    input1.setAttribute("type", "text");
    input2.setAttribute("type", "text");

    input1.classList.add("xColumn")
    input2.classList.add("yColumn")

    cell1.appendChild(input1);
    cell2.appendChild(input2);

    newRow.appendChild(cell1);
    newRow.appendChild(cell2);

    table.appendChild(newRow);
    updateRowListeners();
})

removeButton.addEventListener('click', (event) => {
    const table = document.getElementById("mutableTable").querySelector("table")
    const rows = table.querySelectorAll("tr");

    if (rows.length > MIN_ROW_COUNT) {
        table.removeChild(rows[rows.length - 1]);
    }

});

