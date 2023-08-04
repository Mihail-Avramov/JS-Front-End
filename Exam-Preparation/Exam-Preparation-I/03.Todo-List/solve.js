// TODO
function attachEvents() {
    const API_URL = "http://localhost:3030/jsonstore/tasks/";

    const titleInput = document.getElementById("title");
    const addButton = document.getElementById("add-button");
    const loadButton = document.getElementById("load-button");
    const tasksList = document.getElementById("todo-list");

    loadButton.addEventListener("click", loadTasks);
    addButton.addEventListener("click", addTask);

    function addTask(e) {
        e.preventDefault();
        const name = titleInput.value;

        if (name === "") {
            return;
        }

        const task = {
            name,
        };

        fetch(API_URL, {
            method: "POST",
            body: JSON.stringify(task),
        })
            .then(() => {
                loadTasks(e);
            })
            .catch((err) => console.log(err));

        titleInput.value = "";
    }

    function loadTasks(e) {
        e.preventDefault();
        fetch(API_URL)
            .then((res) => res.json())
            .then((data) => {
                tasksList.innerHTML = "";
                Object.values(data).forEach((value) => {
                    const liElement = document.createElement("li");
                    liElement.dataset.id = value._id;
                    liElement.innerHTML = `<span>${value.name}</span><button>Remove</button><button>Edit</button>`;
                    tasksList.appendChild(liElement);

                    liElement.querySelector("button:nth-child(2)").addEventListener("click", deleteTask);
                    liElement.querySelector("button:nth-child(3)").addEventListener("click", editTask);
                });
            })
            .catch((err) => console.log(err));
    }

    function deleteTask(e) {
        e.preventDefault();
        const id = e.target.parentNode.dataset.id;
        fetch(API_URL + id, { method: "DELETE" })
            .then(() => loadTasks(e))
            .catch((err) => console.log(err));
    }

    function editTask(e) {
        e.preventDefault();
        const spanElement = e.target.parentNode.querySelector("span");
        const name = spanElement.textContent;
        const liElement = e.target.parentNode;
        liElement.innerHTML = `<input value = ${name}></input><button>Remove</button><button>Submit</button>`;
        liElement.querySelector("button:nth-child(2)").addEventListener("click", deleteTask);
        liElement.querySelector("button:nth-child(3)").addEventListener("click", saveTask);
    }

    function saveTask(e) {
        e.preventDefault();
        const id = e.target.parentNode.dataset.id;
        const inputElement = e.target.parentNode.querySelector("input");
        const name = inputElement.value;

        if (name === "") {
            return;
        }

        const task = {
            name,
            _id: id,
        };

        fetch(API_URL + id, {
            method: "PATCH",
            body: JSON.stringify(task),
        })
            .then(() => loadTasks(e))
            .catch((err) => console.log(err));
    }
}

attachEvents();
