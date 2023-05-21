//  created by Raj Manu on 21.05.2023

const submitButton = document.getElementById("submitButton");
const notificationButton = document.getElementById("notificationButton");
const submitHelper = document.getElementById("submitHelper");

submitButton.addEventListener('click', (event) => {
    event.preventDefault();
    let isValid  = false;

    const type = dataSelection.value;
    if (type === "function") {
        //todo в зависимости от выбранных входных данных осуществлять валидацию полей перед отправкой
    } else {

    }

    if (!isValid) {
        submitHelper.style.display = "block";
        return;
    } else {
        submitHelper.style.display = "none";
    }

})

notificationButton.addEventListener("click", () => {
    submitHelper.style.display = "none";
})
