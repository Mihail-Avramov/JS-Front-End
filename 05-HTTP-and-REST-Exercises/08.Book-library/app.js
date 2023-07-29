function attachEvents() {
    const API_URL = "http://localhost:3030/jsonstore/collections/books/";
    const btnLoadBooks = document.getElementById("loadBooks");
    btnLoadBooks.addEventListener("click", loadBooks);

    const formElements = {
        formTitle: document.querySelector("#form > h3"),
        inputTitle: document.querySelector("#form > input[name=title]"),
        inputAuthor: document.querySelector("#form > input[name=author]"),
        formBtn: document.querySelector("#form > button"),
    };

    formElements.formBtn.addEventListener("click", formBtnHandler);

    function loadBooks() {
        formElements.inputAuthor.value = "";
        formElements.inputTitle.value = "";
        formElements.formTitle.textContent = "FORM";
        formElements.formBtn.textContent = "Submit";
        formElements.formBtn.removeAttribute("data-id");
        const tbody = document.querySelector("body > table > tbody");
        tbody.innerHTML = "";
        fetch(API_URL)
            .then((res) => res.json())
            .then((books) => {
                Object.entries(books).forEach(([key, value]) => {
                    const tr = generateElement("tr", null, tbody);
                    generateElement("td", value.title, tr);
                    generateElement("td", value.author, tr);
                    const tdButons = generateElement("td", null, tr);
                    const editBtn = generateElement(
                        "button",
                        "Edit",
                        tdButons,
                        "",
                        [],
                        { "data-id": key }
                    );
                    editBtn.addEventListener("click", editBook);
                    const deleteBtn = generateElement(
                        "button",
                        "Delete",
                        tdButons,
                        "",
                        [],
                        { "data-id": key }
                    );
                    deleteBtn.addEventListener("click", deleteBook);
                });
            })
            .catch((err) => console.log(err));
    }

    function editBook(event) {
        const id = event.target.getAttribute("data-id");
        fetch(API_URL + id)
            .then((res) => res.json())
            .then((data) => {
                formElements.inputTitle.value = data.title;
                formElements.inputAuthor.value = data.author;
                formElements.formTitle.textContent = "Edit FORM";
                formElements.formBtn.textContent = "Save";
                formElements.formBtn.setAttribute("data-id", id);
            })
            .catch((err) => console.log(err));
    }

    function formBtnHandler(event) {
        event.preventDefault();
        const title = formElements.inputTitle.value;
        const author = formElements.inputAuthor.value;
        const id = formElements.formBtn.getAttribute("data-id");
        if (!title || !author) {
            return;
        }
        const book = {
            title,
            author,
        };
        if (formElements.formBtn.textContent === "Submit") {
            fetch(API_URL, {
                method: "POST",
                body: JSON.stringify(book),
            })
                .then((res) => res.json())
                .then((data) => loadBooks())
                .catch((err) => console.log(err));
        } else if (formElements.formBtn.textContent === "Save") {
            fetch(API_URL + id, {
                method: "PUT",
                body: JSON.stringify(book),
            })
                .then((res) => res.json())
                .then((data) => loadBooks())
                .catch((err) => console.log(err));
        }
    }

    function deleteBook(event) {
        const id = event.target.getAttribute("data-id");
        fetch(API_URL + id, {
            method: "DELETE",
        })
            .then((res) => res.json())
            .then((data) => loadBooks())
            .catch((err) => console.log(err));
    }

    function generateElement(
        type,
        textContent,
        parent,
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

attachEvents();
