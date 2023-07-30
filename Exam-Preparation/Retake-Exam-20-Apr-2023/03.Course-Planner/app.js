const API_URL = "http://localhost:3030/jsonstore/tasks/";

const loadBtn = document.getElementById("load-course");
loadBtn.addEventListener("click", loadCoursesHandler);

const formInputs = {
    title: document.getElementById("course-name"),
    type: document.getElementById("course-type"),
    description: document.getElementById("description"),
    teacher: document.getElementById("teacher-name"),
};

const formContainer = document.querySelector("#form > form");
const addCourseButton = document.getElementById("add-course");
const editCourseButton = document.getElementById("edit-course");

addCourseButton.addEventListener("click", addCourseHandler);

editCourseButton.addEventListener("click", editCourseHandler);

function addCourseHandler(event) {
    if (event) {
        event.preventDefault();
    }

    if (Object.values(formInputs).some((input) => input.value === "")) {
        return;
    }

    const newCourse = Object.entries(formInputs).reduce((acc, input) => {
        acc[input[0]] = input[1].value;
        return acc;
    }, {});

    fetch(API_URL, {
        method: "POST",
        body: JSON.stringify(newCourse),
    })
        .then((response) => response.json())
        .then((data) => loadCoursesHandler())
        .catch((err) => console.log(err));

    formContainer.reset();
}

function editCourseHandler(event) {
    const id = event.target.getAttribute("data-id");

    if (event) {
        event.preventDefault();
    }

    if (Object.values(formInputs).some((input) => input.value === "")) {
        return;
    }

    const editedCourse = Object.entries(formInputs).reduce(
        (acc, input) => {
            acc[input[0]] = input[1].value;
            return acc;
        },
        { _id: id }
    );

    fetch(API_URL + id, {
        method: "PUT",
        body: JSON.stringify(editedCourse),
    })
        .then((response) => response.json())
        .then((data) => {
            loadCoursesHandler();
            addCourseButton.removeAttribute("disabled");
            editCourseButton.setAttribute("disabled", true);
            editCourseButton.removeAttribute("data-id");
        })
        .catch((err) => console.log(err));

    formContainer.reset();
}

function loadCoursesHandler() {
    const coursesContainer = document.getElementById("list");
    coursesContainer.innerHTML = "";
    fetch(API_URL)
        .then((res) => res.json())
        .then((coursesData) => {
            Object.entries(coursesData).forEach(
                ([key, { title, type, description, teacher, _id }]) => {
                    const container = generateElement(
                        "div",
                        coursesContainer,
                        null,
                        null,
                        ["container"]
                    );
                    generateElement("h2", container, title);
                    generateElement("h3", container, teacher);
                    generateElement("h3", container, type);
                    generateElement("h4", container, description);
                    const editBtn = generateElement(
                        "button",
                        container,
                        "Edit Course",
                        null,
                        ["edit-btn"]
                    );
                    const finishBtn = generateElement(
                        "button",
                        container,
                        "Finish Course",
                        null,
                        ["finish-btn"]
                    );

                    editBtn.addEventListener("click", (event) => {
                        if (event) {
                            event.preventDefault();
                        }
                        formInputs.title.value = title;
                        formInputs.teacher.value = teacher;
                        formInputs.type.value = type;
                        formInputs.description.value = description;
                        addCourseButton.setAttribute("disabled", true);
                        editCourseButton.removeAttribute("disabled");
                        editCourseButton.setAttribute("data-id", _id);
                        event.target.parentNode.remove();
                    });

                    finishBtn.addEventListener("click", (event) => {
                        const id = _id;
                        if (event) {
                            event.preventDefault();
                        }

                        fetch(API_URL + id, {
                            method: "DELETE",
                        })
                            .then((res) => res.json())
                            .then((data) => {
                                loadCoursesHandler();
                            })
                            .catch((err) => console.log(err));
                    });
                }
            );
        })
        .catch((err) => console.log(err));
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
