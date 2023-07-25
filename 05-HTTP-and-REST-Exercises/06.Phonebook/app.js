function attachEvents() {
    const API_URL = "http://localhost:3030/jsonstore/phonebook/";

    const btnLoad = document.getElementById("btnLoad");
    btnLoad.addEventListener("click", loadPhoneBook);
    const ulPhoneBook = document.getElementById("phonebook");

    const inputPersonName = document.getElementById("person");
    const inputPhoneNumber = document.getElementById("phone");

    const btnCreate = document.getElementById("btnCreate");
    btnCreate.addEventListener("click", createContact);

    async function loadPhoneBook() {
        try {
            const response = await fetch(API_URL);
            const data = await response.json();
            ulPhoneBook.innerHTML = "";
            Object.entries(data).forEach(([key, value]) => {
                const li = document.createElement("li");
                li.textContent = `${value.person}: ${value.phone}`;
                const btnDelete = document.createElement("button");
                btnDelete.textContent = "Delete";
                btnDelete.value = value._id;
                btnDelete.addEventListener("click", deleteContact);
                li.appendChild(btnDelete);
                ulPhoneBook.appendChild(li);
            });
        } catch (error) {
            console.log(error);
        }
    }

    async function deleteContact(e) {
        try {
            const response = await fetch(API_URL + e.target.value, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
            });
            const data = await response.json();
            loadPhoneBook();
        } catch (error) {
            console.log(error);
        }
    }

    async function createContact() {
        try {
            if (inputPersonName.value === "" || inputPhoneNumber.value === "") {
                return;
            }
            const response = await fetch(API_URL, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    person: inputPersonName.value,
                    phone: inputPhoneNumber.value,
                }),
            });
            const data = await response.json();
            loadPhoneBook();
            inputPersonName.value = "";
            inputPhoneNumber.value = "";
        } catch (error) {
            console.log(error);
        }
    }
}

attachEvents();
