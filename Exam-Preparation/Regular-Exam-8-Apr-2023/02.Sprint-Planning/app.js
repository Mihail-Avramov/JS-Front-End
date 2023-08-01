window.addEventListener("load", solve);

function solve() {
    const tasksCollection = {};
    let taskCounter = 1;

    const formContainer = document.getElementById("create-task-form");
    const tasksSection = document.getElementById("tasks-section");
    const pointsCounter = document.getElementById("total-sprint-points");

    const specialSymbols = {
        Feature: "⊡",
        "Low Priority Bug": "☉",
        "High Priority Bug": "⚠",
    };

    const priorityClass = {
        Feature: "feature",
        "Low Priority Bug": "low-priority",
        "High Priority Bug": "high-priority",
    };

    const formInputs = {
        taskIdInput: document.getElementById("task-id"),
        titleInput: document.getElementById("title"),
        descriptionInput: document.getElementById("description"),
        labelSelect: document.getElementById("label"),
        estimatedPointsInput: document.getElementById("points"),
        assigneeInput: document.getElementById("assignee"),
    };

    const createTaskBtn = document.getElementById("create-task-btn");
    createTaskBtn.addEventListener("click", createTaskHandler);
    const deleteTaskBtn = document.getElementById("delete-task-btn");
    deleteTaskBtn.addEventListener("click", deleteTaskHandler);

    function changePointsCounter() {
        const counter = Object.values(tasksCollection).reduce((acc, curr) => {
            return acc + curr.estimatedPoints;
        }, 0);

        pointsCounter.innerText = `Total Points ${counter}pts`;
    }

    function createTaskHandler(event) {
        if (event) {
            event.preventDefault();
        }

        formInputs.taskIdInput.value = `task-${taskCounter}`;

        if (Object.values(formInputs).some((input) => input.value === "")) {
            return;
        }

        let [taskId, title, description, label, estimatedPoints, assignee] = Object.values(formInputs).map((input) => input.value);
        tasksCollection[taskId] = { title, description, label, estimatedPoints: Number(estimatedPoints), assignee };
        taskCounter++;
        formContainer.reset();

        changePointsCounter();

        const article = generateElement("article", null, tasksSection, `${taskId}`, ["task-card"]);
        const testDiv = generateElement("div", `${label} ${specialSymbols[label]}`, article, null, ["task-card-label", `${priorityClass[label]}`]);
        generateElement("h3", title, article, null, ["task-card-title"]);
        generateElement("p", description, article, null, ["task-card-description"]);
        generateElement("div", `Estimated at ${estimatedPoints} pts`, article, null, ["task-card-points"]);
        generateElement("div", `Assigned to: ${assignee}`, article, null, ["task-card-assignee"]);
        const buttonContainer = generateElement("div", null, article, null, ["task-card-actions"]);
        const deleteBtn = generateElement("button", "Delete", buttonContainer);
        deleteBtn.addEventListener("click", loadConfirmDeleteHandler);
    }

    function loadConfirmDeleteHandler(event) {
        let taskId = event.target.parentElement.parentElement.id;
        let [title, description, label, estimatedPoints, assignee] = Object.values(tasksCollection[taskId]);

        Object.values(formInputs).map((input) => input.setAttribute("disabled", true));

        formInputs.taskIdInput.value = taskId;
        formInputs.titleInput.value = title;
        formInputs.descriptionInput.value = description;
        formInputs.labelSelect.value = label;
        formInputs.estimatedPointsInput.value = estimatedPoints;
        formInputs.assigneeInput.value = assignee;

        deleteTaskBtn.removeAttribute("disabled");
        createTaskBtn.setAttribute("disabled", true);
    }

    function deleteTaskHandler() {
        const currentId = formInputs.taskIdInput.value;
        delete tasksCollection[currentId];
        document.getElementById(currentId).remove();
        Object.values(formContainer).map((input) => input.removeAttribute("disabled"));
        formContainer.reset();
        formInputs.taskIdInput.value = `task-${taskCounter}`;
        createTaskBtn.removeAttribute("disabled");
        deleteTaskBtn.setAttribute("disabled", true);
        changePointsCounter();
    }

    function generateElement(type, textContent, parent, id, classesArray, attributesObj) {
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
