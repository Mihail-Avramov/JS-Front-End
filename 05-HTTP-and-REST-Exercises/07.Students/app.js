const API_URL = "http://localhost:3030/jsonstore/collections/students";

function loadStudents() {
    const tbodyStudents = document.querySelector("#results > tbody");
    tbodyStudents.innerHTML = "";
    fetch(API_URL)
        .then((res) => res.json())
        .then((studentsData) => {
            Object.values(studentsData).forEach((student) => {
                const tr = document.createElement("tr");
                tr.innerHTML = `<td>${student.firstName}</td><td>${student.lastName}</td><td>${student.facultyNumber}</td></td><td>${student.grade}</td>`;
                tbodyStudents.appendChild(tr);
            });
        })
        .catch((err) => {
            console.log(err);
        });
}

function attachEvents() {
    loadStudents();
    const formElements = {
        firstName: document.querySelector("#form > div.inputs > input[name=firstName]"),
        lastName: document.querySelector("#form > div.inputs > input[name=lastName]"),
        facultyNumber: document.querySelector("#form > div.inputs > input[name=facultyNumber]"),
        grade: document.querySelector("#form > div.inputs > input[name=grade]"),
    };
    const btnSubmit = document.querySelector("#submit");
    btnSubmit.addEventListener("click", (e) => {
        e.preventDefault();
        const { firstName, lastName, facultyNumber, grade } = formElements;
        if (!firstName.value || !lastName.value || isNaN(facultyNumber.value) || isNaN(grade.value)) {
            firstName.focus();
            return;
        }
        fetch(API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                firstName: firstName.value,
                lastName: lastName.value,
                facultyNumber: facultyNumber.value,
                grade: grade.value,
            }),
        })
            .then((res) => res.json())
            .then(loadStudents())
            .catch((err) => console.log(err));
        firstName.value = "";
        lastName.value = "";
        facultyNumber.value = "";
        grade.value = "";
        firstName.focus();
    });
}

attachEvents();
