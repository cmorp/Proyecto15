
let tasks = [];
const localStorageSave = () => {
    if (!localStorage.getItem("tasksLS")) {
        localStorage.setItem("tasksLS", JSON.stringify(tasks));
    } else {
        localStorage.removeItem("tasksLS");
        localStorage.setItem("tasksLS", JSON.stringify(tasks));
    }
};

const addTask = () => {
    let taskObj = {
        id: 0,
        task: "",
        status: true // TRUE = TAREA PENDIENTE; FALSE = TAREA REALIZADA
    }
    let task = document.querySelector('#newTask').value;
    if (task != "") {
        document.querySelector('#newTask').value = "";
        (tasks.length === 0) ? taskObj.id = 1 : taskObj.id = tasks[tasks.length - 1].id + 1;
        taskObj.task = task;
        tasks.push(taskObj);
        localStorageSave();
        printTasks();
    }
}

const printTasks = () => {
    let tasksList = ``;
    let countTasks = 0;
    let okTasks = 0;
    tasks.forEach(task => {
        countTasks++;
        tasksList += `
        <div class="tarea">
            <div class="idTask">
                <p>${task.id}</p>
                <p id="bodyTask">${task.task}</p>
            </div>
            <div class="taskActions">
                <span><i class="fa-solid fa-thumbs-up fa-2xl" id="ok${task.id}" onclick="doneTask(${task.id})"></i></span>
                <span><i class="fa-solid fa-trash fa-2xl" id="del${task.id}" onclick="deleteTask(${task.id})"></i></span>
            </div>
        </div>
    `;
        if (!task.status) {
            okTasks++;
        }
    })
    document.querySelector('.tareas').innerHTML = tasksList;
    document.querySelector('#totalTask').textContent = countTasks;
    document.querySelector('#okTask').textContent = okTasks;
    paintDone();
}

const paintDone = () => {
    tasks.forEach(task => {
        if (task.status === false) {
            document.querySelector('#ok' + task.id).style.color = 'palegreen';
        }
    }
    )
}

const deleteTask = (delTask) => {
    const index = tasks.findIndex((task) => task.id === delTask);
    if (index === -1) return;
    tasks.splice(index, 1);
    localStorageSave();
    printTasks();
};

const doneTask = (taskId) => {
    const index = tasks.findIndex(task => task.id === taskId);
    tasks[index].status = false;
    localStorageSave();
    printTasks();
}

const newTaskBtn = document.querySelector('#addTask');
const newTaskInput = document.querySelector('#newTask');
newTaskBtn.addEventListener('click', addTask);
newTaskInput.addEventListener('keypress', event =>
    (event.keyCode === 13) ? addTask() : false
);
if (localStorage.getItem("tasksLS")) {
    tasks = JSON.parse(localStorage.getItem("tasksLS"));
    printTasks();
};

// TAREAS INICIALES
tasks = [
    {
        id: 1,
        task: "Hacer deporte",
        status: true,
    },
    {
        id: 2,
        task: "Estudiar",
        status: true,
    },
    {
        id: 3,
        task: "Regar las plantas",
        status: true,
    },
];

// LLAMAR A LA FUNCIÓN PARA MOSTRAR LAS TAREAS AL CARGAR LA PÁGINA
printTasks();