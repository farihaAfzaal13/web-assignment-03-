document.addEventListener("DOMContentLoaded", function () {
    const apiUrl = "https://jsonplaceholder.typicode.com/posts";
    const postList = document.getElementById("post-list");
    const createPostButton = document.getElementById("create-post");
    const postTitleInput = document.getElementById("post-title");
    const postBodyInput = document.getElementById("post-body");

    function fetchPosts() {
        postList.innerHTML = '';

        fetch(apiUrl)
            .then(response => response.json())
            .then(posts => {
                posts.forEach(post => {
                    const listItem = document.createElement("li");
                    listItem.innerHTML = `
                        <span>${post.title}</span>
                        <button class="edit-post" data-id="${post.id}">Edit</button>
                        <button class="delete-post" data-id="${post.id}">Delete</button>
                    `;
                    postList.appendChild(listItem);
                });
            })
            .catch(error => console.error("Error fetching posts:", error));
    }

    createPostButton.addEventListener("click", function () {
        const title = postTitleInput.value;
        const body = postBodyInput.value;

        fetch(apiUrl, {
            method: 'POST',
            body: JSON.stringify({ title, body }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        })
        .then(response => {
            if (response.ok) {
                postTitleInput.value = '';
                postBodyInput.value = '';
                fetchPosts();
            } else {
                console.error("Error creating the post.");
            }
        })
        .catch(error => console.error("Error creating the post:", error));
    });

    postList.addEventListener("click", function (e) {
        if (e.target.classList.contains("edit-post")) {
            const postId = e.target.getAttribute("data-id");
            const listItem = e.target.parentElement;
            const postTitle = listItem.querySelector("span");
            const newTitle = prompt("Edit post title:", postTitle.textContent);

            if (newTitle !== null) {
                fetch(`${apiUrl}/${postId}`, {
                    method: 'PUT',
                    body: JSON.stringify({ title: newTitle }),
                    headers: {
                        'Content-type': 'application/json; charset=UTF-8',
                    },
                })
                .then(response => {
                    if (response.ok) {
                        postTitle.textContent = newTitle;
                    } else {
                        console.error("Error updating the post.");
                    }
                })
                .catch(error => console.error("Error updating the post:", error));
            }
        }

        if (e.target.classList.contains("delete-post")) {
            const postId = e.target.getAttribute("data-id");
            const listItem = e.target.parentElement;

            fetch(`${apiUrl}/${postId}`, {
                method: 'DELETE',
            })
            .then(response => {
                if (response.ok) {
                    listItem.remove();
                } else {
                    console.error("Error deleting the post.");
                }
            })
            .catch(error => console.error("Error deleting the post:", error));
        }
    });

    fetchPosts();
});
