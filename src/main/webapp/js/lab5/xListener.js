//  created by Raj Manu on 21.05.2023

const xInput = document.getElementById("x");

xInput.addEventListener('input', (event) => {
    const valueLine = event.target.value.replaceAll(" ", "");
    const value = valueLine !== "" ? Number(valueLine.replaceAll(",", ".")) : NaN;
    if (isNaN(value)) {
        event.target.classList.add("is-danger");
        return;
    } else {
        event.target.classList.remove("is-danger");
    }
    validateX();
})

const validateX = () => {
    const type = dataSelection.value;
    let xLine = xInput.value.replaceAll(" ", "");
    let xValue = xLine !== "" ? Number(xLine.replaceAll(",", ".")) : NaN;

    if (isNaN(xValue)) {
        xInput.classList.add("is-danger");
        return;
    } else {
        xInput.classList.remove("is-danger");
    }
    let xColumnValues;

    if (type === "function") {
        xColumnValues = Array.from(document.querySelectorAll('#immutableTable .xColumn')).map(element => Number(element.textContent));
    } else {
         xColumnValues = Array.from(document.querySelectorAll('#mutableTable .xColumn')).map(element => Number(element.value));
    }
    const maxValue = Math.max(...xColumnValues)
    const minValue = Math.min(...xColumnValues)
    if (xValue > maxValue || xValue < minValue) {
        xInput.classList.add("is-danger");
        return;
    } else {
        xInput.classList.remove("is-danger");
    }
    if (xColumnValues.includes(xValue)) {
        xInput.classList.add("is-danger");
        return;
    } else {
        xInput.classList.remove("is-danger");
    }
}
