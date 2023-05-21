//  created by Raj Manu on 21.05.2023

const updateRowListeners = () => {
    let xInputs = mutableTable.querySelectorAll('.xColumn');
    let yInputs = mutableTable.querySelectorAll('.yColumn');

    xInputs.forEach((element) => {
        element.removeEventListener('input', inputListener);
        element.removeEventListener('change', inputListener);
        element.addEventListener('input', inputListener);
        element.addEventListener('change', inputListener);
    });

    yInputs.forEach((element) => {
        element.removeEventListener('input', inputListener);
        element.removeEventListener('change', inputListener);
        element.addEventListener('input', inputListener);
        element.addEventListener('change', inputListener);
    });
};

const inputListener = (event) => {
    const valueLine = event.target.value.replaceAll(" ", "");
    const value = valueLine !== "" ? Number(valueLine.replaceAll(",", ".")) : NaN;
    if (isNaN(value)) {
        event.target.parentElement.classList.add("is-danger");
    } else {
        event.target.parentElement.classList.remove("is-danger");
    }
}

updateRowListeners();

