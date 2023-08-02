function attachEvents() {
    const API_URL = "http://localhost:3030/jsonstore/tasks/";
    const form = document.querySelector("#form-section > form");

    const statusOrder = ["ToDo", "In Progress", "Code Review", "Done"];

    const buttonMapper = {
        ToDo: "Move to In Progress",
        "In Progress": "Move to Code Review",
        "Code Review": "Move to Done",
        Done: "Close",
    };

    const columnMapper = {
        ToDo: document.querySelector("#todo-section > ul"),
        "In Progress": document.querySelector("#in-progress-section > ul"),
        "Code Review": document.querySelector("#code-review-section > ul"),
        Done: document.querySelector("#done-section > ul"),
    };

    const loadBtn = document.getElementById("load-board-btn");
    const createBtn = document.getElementById("create-task-btn");

    const inputTitle = document.getElementById("title");
    const inputDescription = document.getElementById("description");

    loadBtn.addEventListener("click", loadTasks);
    createBtn.addEventListener("click", createTask);

    function createTask(e) {
        e.preventDefault();
        const title = inputTitle.value;
        const description = inputDescription.value;
        if (title === "" || description === "") {
            return;
        }
        const task = {
            title,
            description,
            status: "ToDo",
        };
        fetch(API_URL, {
            method: "POST",
            body: JSON.stringify(task),
        })
            .then((res) => res.json())
            .then((data) => {
                loadTasks;
            })
            .catch((err) => console.log(err));
        // inputTitle.value = "";
        // inputDescription.value = "";
        form.reset();
    }

    function loadTasks() {
        Object.values(columnMapper).forEach((ul) => (ul.innerHTML = ""));
        fetch(API_URL)
            .then((res) => res.json())
            .then((tasks) => {
                Object.values(tasks).forEach((task) => {
                    const parent = columnMapper[task.status];
                    const { title, description, status } = task;
                    const li = document.createElement("li");
                    li.classList.add("task");
                    li.setAttribute("data-id", task._id);
                    li.innerHTML = `<h3>${title}</h3><p>${description}</p><button>${buttonMapper[task.status]}</button>`;
                    li.querySelector("button").addEventListener("click", () => {
                        if (status === "Done") {
                            li.remove();
                            fetch(API_URL + task._id, {
                                method: "DELETE",
                            })
                                .then((res) => res.json())
                                .then((data) => {
                                    loadTasks;
                                })
                                .catch((err) => console.log(err));
                            return;
                        }
                        const nextStatus = { status: statusOrder[statusOrder.indexOf(status) + 1] };
                        fetch(API_URL + task._id, {
                            method: "PATCH",
                            body: JSON.stringify(nextStatus),
                        })
                            .then((res) => res.json())
                            .then((data) => {
                                li.remove();
                                loadTasks;
                            })
                            .catch((err) => console.log(err));
                    });
                    parent.appendChild(li);
                });
            })
            .catch((err) => console.log(err));
    }
}

attachEvents();
