function solve() {
    document.querySelector("#searchField").addEventListener("keydown", function (e) {
        console.log(e.code);
        if (e.code === "Enter" || e.code === "NumpadEnter") {
            onClick();
        }
    });

    document.querySelector("#searchBtn").addEventListener("click", onClick);

    function onClick() {
        const input = document.querySelector("#searchField");
        const cells = Array.from(document.querySelectorAll("tbody td"));
        const selectedRows = Array.from(document.querySelectorAll("tbody tr.select"));

        selectedRows.forEach((row) => {
            row.classList.remove("select");
        });

        if (input.value === "") {
            return;
        }

        cells.forEach((cell) => {
            if (cell.textContent.includes(input.value)) {
                cell.parentElement.classList.add("select");
            }
        });

        input.value = "";
        input.focus();
    }
}
