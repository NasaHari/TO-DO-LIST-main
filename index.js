// Get elements
const taskInput = document.getElementById('taskInput');
const taskList = document.getElementById('taskList');

// Get tasks from local storage or set an empty array
const tasks = JSON.parse(localStorage.getItem('tasks')) || [];

// Render tasks from local storage
function renderTasks() {
    taskList.innerHTML = ''; // Clear existing task list content

    tasks.forEach(function(task, index) {
        // Create <li> element for the task
        const taskItem = document.createElement('li');
        taskItem.innerHTML = `
            <div class="task-info">
                <input type="checkbox" ${task.completed ? 'checked' : ''} onchange="toggleTask(${index})">
                <span class="${task.completed ? 'completed' : ''}">${task.text}</span>
            </div>
            <div class="task-actions">
            <button onclick="editTask(${index})" style=;">Edit</button>
            <button onclick="deleteTask(${index})" style="margin: 0px 0px 0px 15px ;">Delete</button>
            </div>
        `;

        // Append the task <li> element to the task list <ul>
        if (task.completed) {
            // If the task is completed, append it at the end of the list
            taskList.appendChild(taskItem);
        } else {
            // If the task is incomplete, append it at the beginning of the list
            taskList.prepend(taskItem);
        }
    });
}

// Add a new task
function addTask() {
    const text = taskInput.value.trim();
    if (text !== '') {
        tasks.push({ text, completed: false });
        taskInput.value = '';
        saveTasks();
    }
}

// Toggle task completion status
function toggleTask(index) {
    tasks[index].completed = !tasks[index].completed;
    saveTasks();
}

// Edit a task
function editTask(index) {
    const newText = prompt('Edit task:', tasks[index].text);
    if (newText !== null) {
        tasks[index].text = newText.trim();
        saveTasks();
    }
}

// Delete a task
function deleteTask(index) {
    tasks.splice(index, 1);
    saveTasks();
}

// Save tasks to local storage
function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
    renderTasks();
}

// Initial render
renderTasks();
