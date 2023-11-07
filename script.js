document.addEventListener("DOMContentLoaded", function () {
    const baseUrl = "https://jsonplaceholder.typicode.com/todos";
    const todoList = document.getElementById("todo-list");
    const addTodoButton = document.getElementById("add-todo");
    const todoTitleInput = document.getElementById("todo-title");

    async function fetchTodos() {
        todoList.innerHTML = '';

        try {
            const response = await fetch(baseUrl);
            const data = await response.json();

            data.forEach(todo => {
                const listItem = document.createElement("li");
                listItem.textContent = todo.title;
                todoList.appendChild(listItem);
            });
        } catch (error) {
            console.error("Error fetching todos:", error);
        }
    }
    
    addTodoButton.addEventListener("click", async function () {
        const title = todoTitleInput.value;

        try {
            const response = await fetch(baseUrl, {
                method: 'POST',
                body: JSON.stringify({ title, completed: false }),
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                },
            });

            if (response.ok) {
                await fetchTodos();
                todoTitleInput.value = '';
            } else {
                console.error("Error creating the todo.");
            }
        } catch (error) {
            console.error("Error creating the todo:", error);
        }
    });
});
