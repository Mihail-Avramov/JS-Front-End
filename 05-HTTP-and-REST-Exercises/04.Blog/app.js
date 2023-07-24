function attachEvents() {
    const POSTS_URL = "http://localhost:3030/jsonstore/blog/posts";
    const COMMENTS_URL = "http://localhost:3030/jsonstore/blog/comments";

    const btnLoadPosts = document.getElementById("btnLoadPosts");
    const posts = document.getElementById("posts");
    const btnViewPost = document.getElementById("btnViewPost");
    const postTitle = document.getElementById("post-title");
    const postBody = document.getElementById("post-body");
    const postComments = document.getElementById("post-comments");

    btnLoadPosts.addEventListener("click", loadPosts);
    btnViewPost.addEventListener("click", viewPost);

    let postsBodyData = {};

    function loadPosts() {
        fetch(POSTS_URL)
            .then((res) => res.json())
            .then((postsData) => {
                Object.entries(postsData).forEach(([key, { body, _id, title }]) => {
                    const optionElement = document.createElement("option");
                    optionElement.value = key;
                    optionElement.textContent = title;
                    posts.appendChild(optionElement);
                    postsBodyData[key] = body;
                });
            })
            .catch((err) => {
                console.log(err);
            });
    }

    function viewPost() {
        const postId = posts.value;
        postTitle.textContent = posts.options[posts.selectedIndex].text;
        postBody.textContent = postsBodyData[postId];
        postComments.innerHTML = "";

        fetch(COMMENTS_URL)
            .then((res) => res.json())
            .then((commentsData) => {
                Object.values(commentsData)
                    .filter((v) => v.postId === postId)
                    .forEach((comment) => {
                        const li = document.createElement("li");
                        li.textContent = comment.text;
                        postComments.appendChild(li);
                    });
            })
            .catch((err) => {
                console.log(err);
            });
    }
}

attachEvents();
