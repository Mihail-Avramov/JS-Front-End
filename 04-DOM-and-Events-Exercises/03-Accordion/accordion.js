function toggle() {
    const btn = document.querySelector("span.button");
    const content = document.querySelector("#extra");

    if (btn.textContent === "More") {
        content.style.display = "block";
        btn.textContent = "Less";
    } else {
        content.style.display = "none";
        btn.textContent = "More";
    }
}

// function toggle() {
//     const content = document.querySelector("#extra");
//     const button = document.querySelector("span.button");

//     content.style.display = content.style.display === "block" ? "none" : "block";
//     button.textContent = button.textContent === "More" ? "Less" : "More";
// }
