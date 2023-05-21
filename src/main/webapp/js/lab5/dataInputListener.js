//  created by Raj Manu on 21.05.2023

const dataSelection = document.getElementById("data");
const fileDiv = document.getElementById("file");
const functionDiv = document.getElementById("function");
const functionParamsDiv = document.getElementById("functionParams");
const immutableTableDiv = document.getElementById("immutableTable");
const mutableTableDiv = document.getElementById("mutableTable");

fileDiv.style.display = 'block'
functionDiv.style.display = 'none'
immutableTableDiv.style.display = 'none'
mutableTableDiv.style.display = 'block'

dataSelection.addEventListener('change', (event) => {
    const type = event.target.value;
    switch (type) {
        case "table":
            fileDiv.style.display = 'none'
            functionDiv.style.display = 'none'
            functionParamsDiv.style.display = 'none'
            immutableTableDiv.style.display = 'none'
            mutableTableDiv.style.display = 'block'
            break
        case "file" :
            fileDiv.style.display = 'block'
            functionDiv.style.display = 'none'
            functionParamsDiv.style.display = 'none'
            immutableTableDiv.style.display = 'none'
            mutableTableDiv.style.display = 'block'
            break
        case "function":
            fileDiv.style.display = 'none'
            functionDiv.style.display = 'block'
            functionParamsDiv.style.display = 'block'
            immutableTableDiv.style.display = 'block'
            mutableTableDiv.style.display = 'none'
            break
    }
    validateX();
})
