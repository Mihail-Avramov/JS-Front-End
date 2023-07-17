function lockedProfile() {
    let buttons = Array.from(document.querySelectorAll("button"));

    buttons.forEach((button) => {
        button.addEventListener("click", () => {
            if (button.parentElement.querySelector("input").checked) {
                return;
            }
            if (button.innerText === "Show more") {
                button.innerText = "Hide it";
                button.parentElement.querySelector("div").style.display = "block";
            } else {
                button.innerText = "Show more";
                button.parentElement.querySelector("div").style.display = "none";
            }
        });
    });
}
