window.addEventListener("load", solve);

function solve() {
    const form = document.querySelector("#main > div.form-wrapper > form");
    const previewList = document.getElementById("preview-list");

    const imputeElements = {
        firstName: document.getElementById("first-name"),
        lastName: document.getElementById("last-name"),
        age: document.getElementById("age"),
        storyTitle: document.getElementById("story-title"),
        genre: document.getElementById("genre"),
        story: document.getElementById("story"),
    };

    const publishBtn = document.getElementById("form-btn");
    publishBtn.addEventListener("click", publishStory);

    function publishStory(e) {
        e.preventDefault();

        let [firstName, lastName, age, storyTitle, genre, story] = Object.values(imputeElements).map((el) => el.value);

        if (Object.values(imputeElements).some((el) => el.value === "")) {
            return;
        }

        const liElement = document.createElement("li");
        liElement.classList.add("story-info");

        const articleElement = document.createElement("article");
        liElement.appendChild(articleElement);

        const h4Element = document.createElement("h4");
        h4Element.textContent = `Name: ${firstName} ${lastName}`;
        articleElement.appendChild(h4Element);

        const pElement = document.createElement("p");
        pElement.textContent = `Age: ${age}`;
        articleElement.appendChild(pElement);

        const pElement2 = document.createElement("p");
        pElement2.textContent = `Title: ${storyTitle}`;
        articleElement.appendChild(pElement2);

        const pElement3 = document.createElement("p");
        pElement3.textContent = `Genre: ${genre}`;
        articleElement.appendChild(pElement3);

        const pElement4 = document.createElement("p");
        pElement4.textContent = `${story}`;
        articleElement.appendChild(pElement4);

        const saveBtn = document.createElement("button");
        saveBtn.classList.add("save-btn");
        saveBtn.textContent = "Save Story";
        saveBtn.addEventListener("click", saveStory);
        liElement.appendChild(saveBtn);

        const editBtn = document.createElement("button");
        editBtn.classList.add("edit-btn");
        editBtn.textContent = "Edit Story";
        editBtn.addEventListener("click", editStory);
        liElement.appendChild(editBtn);

        const deleteBtn = document.createElement("button");
        deleteBtn.classList.add("delete-btn");
        deleteBtn.textContent = "Delete Story";
        deleteBtn.addEventListener("click", deleteStory);
        liElement.appendChild(deleteBtn);

        previewList.appendChild(liElement);

        form.reset();
        publishBtn.disabled = true;
    }

    function saveStory(e) {
        const mainElement = document.getElementById("main");
        mainElement.innerHTML = "";
        const h1Element = document.createElement("h1");
        h1Element.textContent = "Your scary story is saved!";
        mainElement.appendChild(h1Element);
    }

    function editStory(e) {
        const articleElement = e.target.parentElement.querySelector("article");
        const [h4Element, pElement, pElement2, pElement3, pElement4] = Array.from(articleElement.children);

        imputeElements.firstName.value = h4Element.textContent.split(": ")[1].split(" ")[0];
        imputeElements.lastName.value = h4Element.textContent.split(": ")[1].split(" ")[1];
        imputeElements.age.value = pElement.textContent.split(": ")[1];
        imputeElements.storyTitle.value = pElement2.textContent.split(": ")[1];
        imputeElements.genre.value = pElement3.textContent.split(": ")[1];
        imputeElements.story.value = pElement4.textContent;

        articleElement.parentElement.remove();

        publishBtn.disabled = false;
    }

    function deleteStory(e) {
        e.target.parentElement.remove();
        publishBtn.disabled = false;
    }
}
