function subtract() {
    const num1 = Number(document.querySelector("#firstNumber").value);
    const num2 = Number(document.querySelector("#secondNumber").value);
    let newParagraph = document.createElement("p");
    newParagraph.textContent = num1 - num2;
    document.querySelector("#result").appendChild(newParagraph);
}
