function addItem() {
    const newItemTextInput = document.querySelector("#newItemText");
    const newItemValueInput = document.querySelector("#newItemValue");

    if (newItemTextInput.value === "" || newItemValueInput.value === "") {
        return;
    }

    let select = document.querySelector("#menu");
    let option = document.createElement("option");
    option.text = newItemTextInput.value;
    option.value = newItemValueInput.value;
    select.appendChild(option);

    newItemTextInput.value = "";
    newItemValueInput.value = "";
    newItemTextInput.focus();
}
