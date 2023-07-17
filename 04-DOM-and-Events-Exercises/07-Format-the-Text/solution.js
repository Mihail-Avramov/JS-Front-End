function solve() {
    const input = document
        .querySelector("#input")
        .value.split(".")
        .filter((element) => element && element !== "\n" && element.length > 1)
        .map((element) => (element = element.trim() + "."));

    console.log(input);

    const container = document.querySelector("#output");

    while (input.length > 0) {
        const p = document.createElement("p");
        p.textContent = input.splice(0, 3).join(" ");
        container.appendChild(p);
    }
}
