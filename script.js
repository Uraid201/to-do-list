const input = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");
const taskCount = document.getElementById("taskCount");
const emptyState = document.getElementById("emptyState");

const welcome = document.getElementById("welcome");
const profileBtn = document.getElementById("profileBtn");

const profileModal = document.getElementById("profileModal");
const closeModal = document.getElementById("closeModal");

const nameInput = document.getElementById("nameInput");
const saveProfile = document.getElementById("saveProfile");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

let username = localStorage.getItem("username") || "";

let primaryColor =
    localStorage.getItem("primaryColor") || "#007AFF";


document.documentElement.style.setProperty(
    "--primary",
    primaryColor
);


/* =========================
   USER NAME
========================= */

function updateWelcome() {

    if (username) {

        welcome.textContent = `Welcome, ${username} 👋`;

        profileBtn.textContent =
            username.charAt(0).toUpperCase();

    } else {

        welcome.textContent = "Welcome 👋";

    }

}


/* =========================
   SHOW PROFILE
========================= */

profileBtn.addEventListener("click", function() {

    nameInput.value = username;

    profileModal.classList.remove("hidden");

});


closeModal.addEventListener("click", function() {

    profileModal.classList.add("hidden");

});


/* =========================
   SAVE PROFILE
========================= */

saveProfile.addEventListener("click", function() {

    const name = nameInput.value.trim();

    if (name !== "") {

        username = name;

        localStorage.setItem(
            "username",
            username
        );

    }

    localStorage.setItem(
        "primaryColor",
        primaryColor
    );

    updateWelcome();

    profileModal.classList.add("hidden");

});


/* =========================
   COLORS
========================= */

document.querySelectorAll(".color").forEach(function(colorButton) {

    colorButton.addEventListener("click", function() {

        primaryColor =
            colorButton.dataset.color;

        document.documentElement.style.setProperty(
            "--primary",
            primaryColor
        );

        document.querySelectorAll(".color").forEach(function(button) {

            button.classList.remove("selected");

        });

        colorButton.classList.add("selected");

    });

});


/* =========================
   ADD TASK
========================= */

function addTask() {

    const text = input.value.trim();

    if (text === "") {
        return;
    }

    const task = {

        id: Date.now(),

        text: text,

        completed: false

    };

    tasks.push(task);

    saveTasks();

    input.value = "";

    renderTasks();

}


addBtn.addEventListener("click", addTask);


input.addEventListener("keydown", function(event) {

    if (event.key === "Enter") {

        addTask();

    }

});


/* =========================
   RENDER
========================= */

function renderTasks() {

    taskList.innerHTML = "";

    tasks.forEach(function(task) {

        const element = document.createElement("div");

        element.className = "task";

        if (task.completed) {

            element.classList.add("completed");

        }

        element.innerHTML = `

            <button class="check">
                ${task.completed ? "✓" : ""}
            </button>

            <div class="task-content">

                <p>${task.text}</p>

                <span>
                    ${task.completed ? "Completed" : "Today"}
                </span>

            </div>

            <div class="actions">

                <button class="edit">✎</button>

                <button class="delete">×</button>

            </div>
        `;


        /* Complete */

        element
            .querySelector(".check")
            .addEventListener("click", function() {

                task.completed =
                    !task.completed;

                saveTasks();

                renderTasks();

            });


        /* Edit */

        element
            .querySelector(".edit")
            .addEventListener("click", function() {

                const newText =
                    prompt("Edit task:", task.text);

                if (
                    newText !== null &&
                    newText.trim() !== ""
                ) {

                    task.text =
                        newText.trim();

                    saveTasks();

                    renderTasks();

                }

            });


        /* Delete */

        element
            .querySelector(".delete")
            .addEventListener("click", function() {

                tasks = tasks.filter(function(item) {

                    return item.id !== task.id;

                });

                saveTasks();

                renderTasks();

            });


        /* Swipe */

        addSwipe(element, task);


        taskList.appendChild(element);

    });


    updateFooter();

}


/* =========================
   SWIPE
========================= */

function addSwipe(element, task) {

    let startX = 0;

    let endX = 0;


    element.addEventListener("touchstart", function(event) {

        startX =
            event.touches[0].clientX;

    });


    element.addEventListener("touchend", function(event) {

        endX =
            event.changedTouches[0].clientX;

        const distance =
            endX - startX;


        /* Right = Complete */

        if (distance > 100) {

            task.completed =
                !task.completed;

            saveTasks();

            renderTasks();

        }


        /* Left = Delete */

        if (distance < -100) {

            tasks = tasks.filter(function(item) {

                return item.id !== task.id;

            });

            saveTasks();

            renderTasks();

        }

    });

}


/* =========================
   LOCAL STORAGE
========================= */

function saveTasks() {

    localStorage.setItem(
        "tasks",
        JSON.stringify(tasks)
    );

}


/* =========================
   FOOTER
========================= */

function updateFooter() {

    const total = tasks.length;

    const completed =
        tasks.filter(function(task) {

            return task.completed;

        }).length;


    taskCount.textContent =
        `${total} tasks • ${completed} completed`;


    if (total === 0) {

        emptyState.style.display = "block";

    } else {

        emptyState.style.display = "none";

    }

}


/* =========================
   START APP
========================= */

updateWelcome();

renderTasks();