//  created by Raj Manu on 21.05.2023

document.getElementById('dataFile').addEventListener('change', (event) => {

    let file = event.target.files[event.target.files.length - 1];
    let reader = new FileReader();
    reader.onload = function (e) {

        const data = JSON.parse(e.target.result);
        const xArray = data.x
        const yArray = data.y

        if (xArray.length < MIN_ROW_COUNT || yArray.length < MIN_ROW_COUNT || xArray.length !== yArray.length) {
            console.log("точки невалидны")
            return;
        }

        let xCounter = 0;
        xArray.forEach((element) => {
            let elementLine = element.toString().replaceAll(" ", "");
            element = elementLine !== "" ? Number(elementLine.replaceAll(",", ".")) : NaN;
            if (isNaN(element)) {
                return;
            } else {
                xArray[xCounter] = element;
                xCounter++;
            }
        })

        let yCounter = 0;
        yArray.forEach((element) => {
            let elementLine = element.toString().replaceAll(" ", "");
            element = elementLine !== "" ? Number(elementLine.replaceAll(",", ".")) : NaN;
            if (isNaN(element)) {
                return;
            } else {
                yArray[yCounter] = element;
                yCounter++;
            }
        })

        let inputElements = mutableTable.querySelectorAll('input[type="text"]');

        if (inputElements.length / 2 < xArray.length) {
            while (inputElements.length / 2 < xArray.length) {
                addButton.click();
                inputElements = mutableTable.querySelectorAll('input[type="text"]');
            }
        }
        if (inputElements.length / 2 > xArray.length) {
            while (inputElements.length / 2 > xArray.length) {
                removeButton.click();
                inputElements = mutableTable.querySelectorAll('input[type="text"]');
            }
        }

        let counter = 0;
        inputElements.forEach((input, index) => {
            if (index % 2 === 0) {
                input.value = xArray[counter];
            } else {
                input.value = yArray[counter];
                counter++;
            }
        });


    };
    reader.readAsText(file);
});
