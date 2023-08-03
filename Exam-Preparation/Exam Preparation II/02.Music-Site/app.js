window.addEventListener("load", solve);

function solve() {
    let likesCounter = 0;
    const form = document.querySelector("div.container-text > form");
    const formInputs = {
        genre: document.getElementById("genre"),
        name: document.getElementById("name"),
        author: document.getElementById("author"),
        date: document.getElementById("date"),
    };
    const songsCollection = document.querySelector("#all-hits > div");
    const savedSongs = document.querySelector("#saved-hits > div");
    const counterElement = document.querySelector("#total-likes > div > p");
    const addBtn = document.getElementById("add-btn");

    addBtn.addEventListener("click", addSong);

    function addSong(e) {
        e.preventDefault();

        let [genre, name, author, date] = Object.values(formInputs).map((x) => x.value);

        if (genre !== "" && name !== "" && author !== "" && date !== "") {
            const song = createSong(genre, name, author, date);
            songsCollection.appendChild(song);
        }

        form.reset();
    }

    function createSong(genre, name, author, date) {
        const songDiv = document.createElement("div");
        songDiv.classList.add("hits-info");

        const songImg = document.createElement("img");
        songImg.src = "./static/img/img.png";
        songDiv.appendChild(songImg);

        const songGenre = document.createElement("h2");
        songGenre.textContent = `Genre: ${genre}`;
        songDiv.appendChild(songGenre);

        const songName = document.createElement("h2");
        songName.textContent = `Name: ${name}`;
        songDiv.appendChild(songName);

        const songAuthor = document.createElement("h2");
        songAuthor.textContent = `Author: ${author}`;
        songDiv.appendChild(songAuthor);

        const songDate = document.createElement("h3");
        songDate.textContent = `Date: ${date}`;
        songDiv.appendChild(songDate);

        const saveBtn = document.createElement("button");
        saveBtn.classList.add("save-btn");
        saveBtn.textContent = "Save song";
        songDiv.appendChild(saveBtn);

        saveBtn.addEventListener("click", saveSong);

        const likeBtn = document.createElement("button");
        likeBtn.classList.add("like-btn");
        likeBtn.textContent = "Like song";
        songDiv.appendChild(likeBtn);

        likeBtn.addEventListener("click", likeSong);

        const deleteBtn = document.createElement("button");
        deleteBtn.classList.add("delete-btn");
        deleteBtn.textContent = "Delete";
        songDiv.appendChild(deleteBtn);

        deleteBtn.addEventListener("click", deleteSong);

        return songDiv;
    }

    function saveSong(e) {
        e.preventDefault();
        const song = e.target.parentElement;

        savedSongs.appendChild(song);
        song.querySelector("button.save-btn").remove();
        song.querySelector("button.like-btn").remove();
    }

    function deleteSong(e) {
        e.preventDefault();
        const song = e.target.parentElement;

        song.remove();
    }

    function likeSong(e) {
        e.preventDefault();
        const song = e.target.parentElement;
        const likeBtn = song.querySelector("button.like-btn");

        likeBtn.disabled = true;
        likesCounter++;
        counterElement.textContent = `Total Likes: ${likesCounter}`;
    }
}
