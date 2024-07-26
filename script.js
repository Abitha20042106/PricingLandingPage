document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('todo-form');
    const input = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');
  
    // Get tasks from local storage
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  
    // Render tasks
    function renderTasks() {
      taskList.innerHTML = '';
      tasks.forEach(function(task, index) {
        const li = document.createElement('li');
        li.innerHTML = `
          <span class="${task.completed ? 'completed' : ''}">${task.title}</span>
          <br>
          <button class="edit-btn" data-index="${index}">Edit</button>
          <button class="delete-btn" data-index="${index}">Delete</button>
        `;
        taskList.appendChild(li);
      });
    }
  
    renderTasks();
  
    // Add new task
    form.addEventListener('submit', function(event) {
      event.preventDefault();
      const title = input.value.trim();
      if (title !== '') {
        tasks.push({ title, completed: false });
        input.value = '';
        renderTasks();
        updateLocalStorage();
      }
    });
  
    // Edit or Delete task
    taskList.addEventListener('click', function(event) {
      if (event.target.classList.contains('edit-btn')) {
        const index = event.target.getAttribute('data-index');
        const newTitle = prompt('Edit task:', tasks[index].title);
        if (newTitle !== null) {
          tasks[index].title = newTitle.trim();
          renderTasks();
          updateLocalStorage();
        }
      } else if (event.target.classList.contains('delete-btn')) {
        const index = event.target.getAttribute('data-index');
        tasks.splice(index, 1);
        renderTasks();
        updateLocalStorage();
      }
    });
  
    // Mark task as completed
    taskList.addEventListener('click', function(event) {
      if (event.target.tagName === 'SPAN') {
        const index = event.target.parentElement.getAttribute('data-index');
        tasks[index].completed = !tasks[index].completed;
        renderTasks();
        updateLocalStorage();
      }
    });
  
    // Update local storage
    function updateLocalStorage() {
      localStorage.setItem('tasks', JSON.stringify(tasks));
    }
  });
  