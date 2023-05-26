//  created by Raj Manu on 21.05.2023

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

            console.log('server:', result);

        },
        error: function (xhr, status, error) {
            console.log(error);
        }
    })

})

notificationButton.addEventListener("click", () => {
    submitHelper.style.display = "none";
})
