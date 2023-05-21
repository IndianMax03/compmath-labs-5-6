//  created by Raj Manu on 21.05.2023

const aInput = document.getElementById("a");
const bInput = document.getElementById("b");
const nInput = document.getElementById("n");


const funcParamsListener = (event) => {
    const valueLine = event.target.value.replaceAll(" ", "");
    const value = valueLine !== "" ? Number(valueLine.replaceAll(",", ".")) : NaN;
    if (isNaN(value)) {
        event.target.classList.add("is-danger");
        return;
    } else {
        event.target.classList.remove("is-danger");
    }

    let aLine = aInput.value.replaceAll(" ", "");
    let aValue = aLine !== "" ? Number(aLine.replaceAll(",", ".")) : NaN;
    let bLine = bInput.value.replaceAll(" ", "");
    let bValue = bLine !== "" ? Number(bLine.replaceAll(",", ".")) : NaN;
    let nLine = nInput.value.replaceAll(" ", "");
    let nValue = nLine !== "" ? Number(nLine.replaceAll(",", ".")) : NaN;

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

    for (let i = 0; i < nValue; i++) {
        const newRow = document.createElement("tr");

        const xCell = document.createElement("th");
        const xValue = 1; // todo
        xCell.textContent = xValue;
        xCell.classList.add("xColumn");
        newRow.appendChild(xCell);

        const yCell = document.createElement("th");
        const yValue = 1;  // todo
        yCell.textContent = yValue;
        yCell.classList.add("yColumn");
        newRow.appendChild(yCell);

        tbody.appendChild(newRow);
    }



}


aInput.addEventListener('input', funcParamsListener)
bInput.addEventListener('input', funcParamsListener)
nInput.addEventListener('input', funcParamsListener)
