function create(words) {
    const divContent = document.querySelector("#content");
    words.forEach((word) => {
        let newDiv = document.createElement("div");
        let newParagraph = document.createElement("p");
        newParagraph.textContent = word;
        newParagraph.style.display = "none";
        newDiv.appendChild(newParagraph);
        newDiv.addEventListener("click", clickHandler);
        divContent.appendChild(newDiv);
    });

    function clickHandler(e) {
        e.currentTarget.querySelector("p").style.display = "block";
    }
}
