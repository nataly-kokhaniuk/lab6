// script.js

let taskList = [];
let order

function loadTasks() {
    if (localStorage.getItem("taskList")) {
        taskList = JSON.parse(localStorage.getItem("taskList"));
    }

    renderTaskList();
}

function saveTasks() {
    localStorage.setItem("taskList", JSON.stringify(taskList));
}

function addItem() {
    let newItem = document.getElementById("newItem").value;

    if (newItem) {
        taskList.push({
            text: newItem,
            completed: false,
            dateCreated: Date.now(),
        });

        saveTasks();
        renderTaskList();

        document.getElementById("newItem").value = "";
    }
}

function toggleTaskCompletion(index) {
    taskList[index].completed = !taskList[index].completed;

    saveTasks();
    renderTaskList();
}

function removeTask(index) {
    taskList.splice(index, 1);

    saveTasks();
    renderTaskList();
}

function editTask(index) {
    let task = taskList[index];

    
    document.getElementById(`editTask${index}`).value = task.text;
    document.getElementById(`editTask${index}`).focus();
    document.getElementById(`task${index}`).classList.add("editing");


}

function saveEdit(index) {
    let task = taskList[index];
    let newText = document.getElementById(`editTask${index}`).value;

    task.text = newText;

    saveTasks();
    renderTaskList();
}

function sortTasksByDate(order = "asc") {
  if (order === "asc") {
      taskList.sort((a, b) => a.dateCreated - b.dateCreated);
  } else {
      taskList.sort((a, b) => b.dateCreated - a.dateCreated);
  }

  renderTaskList();
}

function sortTasksByCompletion(order = "asc") {
  if (order === "asc") {
      taskList.sort((a, b) => (a.completed === b.completed) ? 0 : a.completed ? -1 : 1);
  } else {
      taskList.sort((b, a) => (a.completed === b.completed) ? 0 : a.completed ? -1 : 1);
  }

  renderTaskList();
}


function renderTaskList() {
    let taskListHTML = "";

    for (let i = 0; i < taskList.length; i++) {
        let task = taskList[i];

        taskListHTML += `
            <li id="task${i}"" class="${task.completed ? "completed" : ""}">
                <input type="checkbox" ${task.completed ? "checked" : ""}>
                <label for="editTask${i}">${task.text}</label>
                <input class="editTask" type="text" id="editTask${i}" value="${
            task.text
        }">
                <button class="saveEditBtn" type="button" id="saveEditBtn${i}">Зберегти</button>
                <button class="editTaskBtn" type="button" id="editTaskBtn${i}">Редагувати</button>
                <button class="removeTaskBtn" type="button" id="removeTaskBtn${i}">Видалити</button>
            </li>
        `;
    }

    document.getElementById("taskList").innerHTML = taskListHTML;

    for (let i = 0; i < taskList.length; i++) {
        document.getElementById(`task${i}`).addEventListener("click", (e) => {
          toggleTaskCompletion(i);
        });
        document.getElementById(`editTask${i}`).addEventListener("click", (e) => {
          e.stopPropagation();
        })
        document
            .getElementById(`editTaskBtn${i}`)
            .addEventListener("click", (e) => {
                e.stopPropagation();
                editTask(i);
            });
        document
            .getElementById(`saveEditBtn${i}`)
            .addEventListener("click", (e) => {
                e.stopPropagation();
                saveEdit(i);
            });
        document
            .getElementById(`removeTaskBtn${i}`)
            .addEventListener("click", (e) => {
                e.stopPropagation();
                removeTask(i);
            });
    }
}

loadTasks();
