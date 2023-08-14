window.addEventListener("load", solve);

function solve() {
    const form = document.querySelector("#newApply > form");

    const formInputs = {
        studentInput: document.getElementById("student"),
        universityInput: document.getElementById("university"),
        scoreInput: document.getElementById("score"),
    };

    const previewList = document.getElementById("preview-list");
    const candidatesList = document.getElementById("candidates-list");

    const nextBtn = document.getElementById("next-btn");
    nextBtn.addEventListener("click", nextBtnHandler);

    function nextBtnHandler(event) {
        if (event) {
            event.preventDefault();
        }
        let [student, university, score] = Object.values(formInputs).map((input) => input.value);
        if (!student || !university || !score) {
            return;
        }

        const li = generateElement("li", previewList, undefined, undefined, ["application"]);
        const article = generateElement("article", li);
        generateElement("h4", article, `${student}`);
        generateElement("p", article, `University: ${university}`);
        generateElement("p", article, `Score: ${score}`);

        const editBtn = generateElement("button", li, "edit", undefined, ["action-btn", "edit"]);
        editBtn.addEventListener("click", editBtnHandler);
        const applyBtn = generateElement("button", li, "apply", undefined, ["action-btn", "apply"]);
        applyBtn.addEventListener("click", applyBtnHandler);

        nextBtn.disabled = true;
        // form.reset();
        Object.values(formInputs).forEach((input) => (input.value = ""));
    }

    function editBtnHandler(event) {
        if (event) {
            event.preventDefault();
        }
        const li = event.target.parentElement;
        const article = li.querySelector("article");
        const student = article.querySelector("h4").textContent;
        const university = article.querySelector("p:nth-child(2)").textContent.split(": ")[1];
        const score = article.querySelector("p:nth-child(3)").textContent.split(": ")[1];

        formInputs.studentInput.value = student;
        formInputs.universityInput.value = university;
        formInputs.scoreInput.value = score;

        li.remove();

        nextBtn.disabled = false;
    }

    function applyBtnHandler(event) {
        if (event) {
            event.preventDefault();
        }
        const li = event.target.parentElement;
        li.querySelector(".edit").remove();
        li.querySelector(".apply").remove();
        candidatesList.appendChild(li);
        nextBtn.disabled = false;
    }

    function generateElement(type, parent, textContent, id, classesArray, attributesObj) {
        //"HTML-TAG"
        const element = document.createElement(type);

        //"text or value content"
        if (textContent) {
            if (type !== "input" && type !== "textarea") {
                element.textContent = textContent;
            } else {
                element.value = textContent;
            }
        }

        // "idName"
        if (id) {
            element.id = id;
        }

        // ["className1", "className2", ...]
        if (classesArray) {
            classesArray.forEach((className) => {
                element.classList.add(className);
            });
        }

        //{src: "link to img", href: "link to site", type: "checkbox", row: 20}
        if (attributesObj) {
            Object.entries(attributesObj).forEach(([key, value]) => {
                element.setAttribute(key, value);
            });
        }

        // append HTMLelement to HTMLparent
        if (parent) {
            parent.appendChild(element);
        }

        return element;
    }
}
