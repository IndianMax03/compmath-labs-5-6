//  created by Raj Manu on 21.05.2023

//todo: остановился на том, что вешаю слушаелей на ячейки таблицы, чтобы избавиться от повторов x и в принципе невалидных значений
const updateRowListeners = () => {
    let firstRowElements = mutableTable.querySelectorAll('tbody tr > *:first-child');
    console.log("updated")

    firstRowElements.forEach((element) => {

        element.addEventListener('change', (event) => {
            const value = event.target.value;
            console.log(value)
        });
    });
};

updateRowListeners();

