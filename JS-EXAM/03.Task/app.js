const API_URL = "http://localhost:3030/jsonstore/tasks/";

const form = document.querySelector("#form > form");
const vacationsList = document.getElementById("list");

const formInputs = {
    nameInput: document.getElementById("name"),
    numDaysInput: document.getElementById("num-days"),
    dateInput: document.getElementById("from-date"),
};

const btnLoadVacations = document.getElementById("load-vacations");
btnLoadVacations.addEventListener("click", loadVacationsHandler);

const btnAddVacation = document.getElementById("add-vacation");
btnAddVacation.addEventListener("click", addVacationHandler);

const btnEditVacation = document.getElementById("edit-vacation");
btnEditVacation.addEventListener("click", editVacationHandler);

function addVacationHandler(event) {
    if (event) {
        event.preventDefault();
    }
    let [name, days, date] = Object.values(formInputs).map((input) => input.value);

    if (!name || !days || !date) {
        return;
    }

    const newVacation = {
        name,
        days,
        date,
    };

    fetch(API_URL, {
        method: "POST",
        body: JSON.stringify(newVacation),
    })
        .then((res) => res.json())
        .then((data) => {
            loadVacationsHandler();
        })
        .catch((err) => console.log(err));

    form.reset();
}

function loadVacationsHandler(event) {
    if (event) {
        event.preventDefault();
    }
    vacationsList.innerHTML = "";
    fetch(API_URL)
        .then((res) => res.json())
        .then((data) => {
            Object.values(data).forEach(({ name, days, date, _id }) => {
                const div = generateElement("div", vacationsList, undefined, undefined, ["container"], { id: _id });
                generateElement("h2", div, name);
                generateElement("h3", div, date);
                generateElement("h3", div, days);
                const btnChange = generateElement("button", div, "Change", undefined, ["change-btn"]);
                btnChange.addEventListener("click", changeBtnHandler);
                const btnDone = generateElement("button", div, "Done", undefined, ["done-btn"]);
                btnDone.addEventListener("click", doneBtnHandler);
            });
        })
        .catch((err) => console.log(err));
}

function changeBtnHandler(event) {
    if (event) {
        event.preventDefault();
    }
    const id = event.target.parentElement.id;
    const name = event.target.parentElement.querySelector("h2").textContent;
    const date = event.target.parentElement.querySelector("h3:nth-child(2)").textContent;
    const days = event.target.parentElement.querySelector("h3:nth-child(3)").textContent;

    event.target.parentElement.remove();

    formInputs.nameInput.value = name;
    formInputs.numDaysInput.value = days;
    formInputs.dateInput.value = date;

    btnAddVacation.disabled = true;
    btnEditVacation.disabled = false;

    btnEditVacation.setAttribute("data-id", id);
}

function editVacationHandler(event) {
    const id = event.target.getAttribute("data-id");
    if (event) {
        event.preventDefault();
    }

    let [name, days, date] = Object.values(formInputs).map((input) => input.value);

    if (!name || !days || !date || !id) {
        return;
    }

    const vacationEdited = {
        name,
        days,
        date,
        _id: id,
    };

    fetch(API_URL + id, {
        method: "PUT",
        body: JSON.stringify(vacationEdited),
    })
        .then((res) => res.json())
        .then((data) => {
            loadVacationsHandler();
        })
        .catch((err) => console.log(err));

    form.reset();
    btnAddVacation.disabled = false;
    btnEditVacation.disabled = true;
}

function doneBtnHandler(event) {
    if (event) {
        event.preventDefault();
    }
    const id = event.target.parentElement.id;
    fetch(API_URL + id, {
        method: "DELETE",
    })
        .then((res) => res.json())
        .then((data) => {
            loadVacationsHandler();
        })
        .catch((err) => console.log(err));
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
