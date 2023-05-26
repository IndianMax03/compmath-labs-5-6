//  created by Raj Manu on 21.05.2023

const aInput = document.getElementById("a");
const bInput = document.getElementById("b");
const nInput = document.getElementById("n");
const polynomialEquationRadio = document.getElementById("polynomialEquation");
const sinusEquationRadio = document.getElementById("sinusEquation");


const funcParamsListener = (event) => {
    const valueLine = event.target.value.replaceAll(" ", "");
    const value = valueLine !== "" ? Number(valueLine.replaceAll(",", ".")) : NaN;
    if (isNaN(value)) {
        event.target.classList.add("is-danger");
        return;
    } else {
        event.target.classList.remove("is-danger");
    }

    validateAndFillTable();

}

const validateAndFillTable = () => {
    let aLine = aInput.value.replaceAll(" ", "");
    let aValue = aLine !== "" ? Number(aLine.replaceAll(",", ".")) : NaN;
    let bLine = bInput.value.replaceAll(" ", "");
    let bValue = bLine !== "" ? Number(bLine.replaceAll(",", ".")) : NaN;
    let nLine = nInput.value.replaceAll(" ", "");
    let nValue = nLine !== "" ? Number(nLine.replaceAll(",", ".")) : NaN;

    if (nLine.includes('.') || nLine.includes(',')) {
        nInput.classList.add("is-danger");
        return;
    } else {
        nInput.classList.remove("is-danger");
    }

    if (bValue <= aValue) {
        bInput.classList.add("is-danger");
        aInput.classList.add("is-danger");
        return;
    } else {
        bInput.classList.remove("is-danger");
        aInput.classList.remove("is-danger");
    }

    if (nValue < MIN_ROW_COUNT || nValue > MAX_ROW_COUNT) {
        nInput.classList.add("is-danger");
        return;
    } else {
        nInput.classList.remove("is-danger");
    }

    const table = document.getElementById("immutableTable").querySelector("table");
    const tbody = table.querySelector("tbody");
    while (tbody.firstChild) {
        tbody.removeChild(tbody.firstChild);
    }

    let func;
    if (document.getElementById("polynomialEquation").checked) {
        func = (x) => {
            return (Math.pow(x, 4) - 3 * Math.pow(x, 3) - 7 * Math.pow(x, 2) + 2).toFixed(FRACTION_DIGIT_COUNT);
        }
    } else {
        func = (x) => {
            return (Math.sin(x)).toFixed(FRACTION_DIGIT_COUNT);
        }
    }

    for (let i = 0; i < nValue; i++) {
        const newRow = document.createElement("tr");

        const xCell = document.createElement("th");
        const xValue = aValue + (bValue - aValue) / (nValue - 1) * i;
        xCell.textContent = xValue.toFixed(FRACTION_DIGIT_COUNT);
        xCell.classList.add("xColumn");
        newRow.appendChild(xCell);

        const yCell = document.createElement("th");
        const yValue = func(xValue);
        yCell.textContent = yValue;
        yCell.classList.add("yColumn");
        newRow.appendChild(yCell);

        tbody.appendChild(newRow);
    }
    validateX()
}


aInput.addEventListener('input', funcParamsListener)
bInput.addEventListener('input', funcParamsListener)
nInput.addEventListener('input', funcParamsListener)

polynomialEquationRadio.addEventListener("change", validateAndFillTable);
sinusEquationRadio.addEventListener("change", validateAndFillTable);
