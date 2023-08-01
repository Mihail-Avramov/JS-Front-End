window.addEventListener("load", solve);

function solve() {
    const formTaskInputs = {
        title: document.getElementById("task-title"),
        category: document.getElementById("task-category"),
        content: document.getElementById("task-content"),
    };

    const reviewList = document.getElementById("review-list");
    const publishedList = document.getElementById("published-list");
    const formTask = document.querySelector("#newPost > form");
    const publishBtn = document.getElementById("publish-btn");

    publishBtn.addEventListener("click", publishTaskHandler);



    function publishTaskHandler() {
        if (Object.values(formTaskInputs).some((input) => input.value === "")) {
            return;
        }

        const [title, category, content] = Object.values(formTaskInputs).map(
            (input) => input.value
        );

        const reviewLi = generateElement("li", reviewList, null, null, [
            "rpost",
        ]);
        const reviewArticle = generateElement("article", reviewLi);
        generateElement("h4", reviewArticle, title);
        generateElement("p", reviewArticle, `Category: ${category}`);
        generateElement("p", reviewArticle, `Content: ${content}`);
        const btnEdit = generateElement("button", reviewLi, "Edit", null, [
            "action-btn",
            "edit",
        ]);
        const btnPost = generateElement("button", reviewLi, "Post", null, [
            "action-btn",
            "post",
        ]);

        btnEdit.addEventListener("click", () => {
            formTaskInputs.title.value = title;
            formTaskInputs.category.value = category;
            formTaskInputs.content.value = content;
            reviewLi.remove();
        });

        btnPost.addEventListener("click", () => {
            publishedList.appendChild(reviewLi);
            btnEdit.remove();
            btnPost.remove();
        });

        formTask.reset();
    }

    function generateElement(
        type,
        parent,
        textContent,
        id,
        classesArray,
        attributesObj
    ) {
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
