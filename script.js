const taskForm = document.getElementById('taskForm');
const filters = document.getElementById('filters-container');
const taskList= document.getElementById('task-List');
const taskInput = document.getElementById('task-input');

taskForm.addEventListener("submit", function(event) {
    event.preventDefault();
    const taskText = taskInput.value;
    
    if (taskText === "") return;

    const newLi = document.createElement("li");

    newLi.innerHTML = `
    <input type="checkbox" class="task-checkbox">
    <span class="task-text">${taskText}</span>
    <button class="delete-btn">Delete</button>
    `;
    taskList.appendChild(newLi);
    taskInput.value = "";
    
    saveData(); 
});

taskList.addEventListener("click", function(event) {
    if (event.target.classList.contains("delete-btn")) {
        const liItem = event.target.parentElement;
        liItem.remove();
        saveData();
    }
    

    if (event.target.classList.contains("task-checkbox")) {
        const liItem = event.target.parentElement;
        liItem.classList.toggle("completed");

        if (event.target.checked) {
            event.target.setAttribute("checked", "checked");
        } else {
            event.target.removeAttribute("checked"); 
        }
        
        saveData(); 
    }
});

function saveData() {
    localStorage.setItem("tasks", taskList.innerHTML);
}

function loadData() {
    if (localStorage.getItem("tasks")) {
        taskList.innerHTML = localStorage.getItem("tasks");
    }
}

loadData();

filters.addEventListener("click", function(event) { 

if (event.target.classList.contains("filter-btn")) {
    const currentActive = filters.querySelector(".filter-btn.active");
        if (currentActive) {
            currentActive.classList.remove("active");
        }
        event.target.classList.add("active");
        
    const filterValue = event.target.dataset.filter;
    const tasks = taskList.querySelectorAll("li");
    tasks.forEach(function(task) {
    
    const isCompleted = task.classList.contains("completed");
    switch (filterValue) {
        case "all": 
        task.style.display = "flex";
        break;
        case "active":
            if (isCompleted) {
                task.style.display = "none";
            } else {
                task.style.display = "flex";
            }
            break;
            case "completed":
                if (isCompleted) {
                    task.style.display = "flex"
                } else {
                    task.style.display = "none"
                }
                break;
            }
        });
    }
});
