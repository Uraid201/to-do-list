// =========================
// ELEMENTS
// =========================

const input = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");

const taskList = document.getElementById("taskList");
const taskCount = document.getElementById("taskCount");
const emptyState = document.getElementById("emptyState");

const welcome = document.getElementById("welcome");
const profileBtn = document.getElementById("profileBtn");

const darkModeBtn = document.getElementById("darkModeBtn");

const profileModal = document.getElementById("profileModal");
const closeModal = document.getElementById("closeModal");

const nameInput = document.getElementById("nameInput");
const saveProfile = document.getElementById("saveProfile");


// =========================
// DATA
// =========================

let tasks =
    JSON.parse(localStorage.getItem("tasks")) || [];

let username =
    localStorage.getItem("username") || "";

let primaryColor =
    localStorage.getItem("primaryColor") || "#007AFF";

let darkMode =
    localStorage.getItem("darkMode") === "true";


// =========================
// SETTINGS
// =========================

document.documentElement.style.setProperty(
    "--primary",
    primaryColor
);

if (darkMode) {
    document.body.classList.add("dark");
    darkModeBtn.textContent = "☀️";
}


// =========================
// WELCOME
// =========================

function updateWelcome() {

    if (username) {

        welcome.textContent =
            `Welcome, ${username} 👋`;

        profileBtn.textContent =
            username.charAt(0).toUpperCase();

    } else {

        welcome.textContent =
            "Welcome 👋";

        profileBtn.textContent = "O";
    }
}


// =========================
// DARK MODE
// =========================

darkModeBtn.addEventListener("click", function () {

    darkMode = !darkMode;

    document.body.classList.toggle(
        "dark",
        darkMode
    );

    darkModeBtn.textContent =
        darkMode ? "☀️" : "🌙";

    localStorage.setItem(
        "darkMode",
        darkMode
    );
});


// =========================
// PROFILE
// =========================

profileBtn.addEventListener("click", function () {

    nameInput.value = username;

    profileModal.classList.remove("hidden");

});


closeModal.addEventListener("click", function () {

    profileModal.classList.add("hidden");

});


profileModal.addEventListener("click", function (event) {

    if (event.target === profileModal) {

        profileModal.classList.add("hidden");

    }

});


// =========================
// COLORS
// =========================

document.querySelectorAll(".color").forEach(function (button) {

    if (button.dataset.color === primaryColor) {

        button.classList.add("selected");

    }


    button.addEventListener("click", function () {

        primaryColor =
            button.dataset.color;

        document.documentElement.style.setProperty(
            "--primary",
            primaryColor
        );

        localStorage.setItem(
            "primaryColor",
            primaryColor
        );


        document
            .querySelectorAll(".color")
            .forEach(function (item) {

                item.classList.remove("selected");

            });


        button.classList.add("selected");

    });

});


// =========================
// SAVE PROFILE
// =========================

saveProfile.addEventListener("click", function () {

    const name =
        nameInput.value.trim();

    if (name) {

        username = name;

        localStorage.setItem(
            "username",
            username
        );

    }

    updateWelcome();

    profileModal.classList.add("hidden");

});


// =========================
// ADD TASK
// =========================

function addTask() {

    const text =
        input.value.trim();

    if (!text) {

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


addBtn.addEventListener(
    "click",
    addTask
);


input.addEventListener(
    "keydown",
    function (event) {

        if (event.key === "Enter") {

            addTask();

        }

    }
);


// =========================
// RENDER TASKS
// =========================

function renderTasks() {

    taskList.innerHTML = "";


    // Separate active and completed tasks

    const activeTasks =
        tasks.filter(function (task) {

            return !task.completed;

        });


    const completedTasks =
        tasks.filter(function (task) {

            return task.completed;

        });


    // =========================
    // ACTIVE TASKS
    // =========================

    if (activeTasks.length > 0) {

        const title =
            document.createElement("h3");

        title.className =
            "section-title";

        title.textContent =
            "Active Tasks";

        taskList.appendChild(title);


        activeTasks.forEach(function (task) {

            taskList.appendChild(
                createTaskElement(task)
            );

        });

    }


    // =========================
    // COMPLETED TASKS
    // =========================

    if (completedTasks.length > 0) {

        const title =
            document.createElement("h3");

        title.className =
            "section-title";

        title.textContent =
            "Completed";

        taskList.appendChild(title);


        completedTasks.forEach(function (task) {

            taskList.appendChild(
                createTaskElement(task)
            );

        });

    }


    updateFooter();

}


// =========================
// CREATE TASK
// =========================

function createTaskElement(task) {

    const container =
        document.createElement("div");

    container.className =
        "swipe-container";


    container.innerHTML = `

        <div class="
            swipe-background
            swipe-complete
        ">

            <span>✓ Complete</span>

            <span></span>

        </div>


        <div class="
            swipe-background
            swipe-delete
        ">

            <span></span>

            <span>Delete 🗑</span>

        </div>


        <div class="task ${task.completed ? "completed" : ""}">

            <button
                class="check"
                aria-label="Complete task">

                ${task.completed ? "✓" : ""}

            </button>


            <div class="task-content">

                <p>
                    ${escapeHTML(task.text)}
                </p>

                <span>
                    ${task.completed ? "Completed" : "Today"}
                </span>

            </div>


            <div class="actions">

                <button
                    class="edit"
                    aria-label="Edit task">

                    <svg viewBox="0 0 24 24">

                        <path d="
                            M12 20h9
                            M16.5 3.5
                            a2.121 2.121 0 0 1 3 3
                            L7 19
                            l-4 1
                            1-4Z
                        "></path>

                    </svg>

                </button>


                <button
                    class="delete"
                    aria-label="Delete task">

                    <svg viewBox="0 0 24 24">

                        <polyline points="
                            3 6
                            5 6
                            21 6
                        "></polyline>

                        <path d="
                            M19 6v14
                            a2 2 0 0 1-2 2H7
                            a2 2 0 0 1-2-2V6
                            m3 0V4
                            a2 2 0 0 1 2-2h4
                            a2 2 0 0 1 2 2v2
                        "></path>

                    </svg>

                </button>

            </div>

        </div>
    `;


    const taskElement =
        container.querySelector(".task");


    // =========================
    // COMPLETE
    // =========================

    taskElement
        .querySelector(".check")
        .addEventListener("click", function () {

            task.completed =
                !task.completed;

            saveTasks();

            renderTasks();

        });


    // =========================
    // EDIT
    // =========================

    taskElement
        .querySelector(".edit")
        .addEventListener("click", function () {

            const newText =
                prompt(
                    "Edit task:",
                    task.text
                );


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


    // =========================
    // DELETE
    // =========================

    taskElement
        .querySelector(".delete")
        .addEventListener("click", function () {

            deleteTask(task.id);

        });


    // =========================
    // SWIPE
    // =========================

    addSwipe(
        taskElement,
        task
    );


    return container;

}


// =========================
// DELETE TASK
// =========================

function deleteTask(id) {

    tasks =
        tasks.filter(function (task) {

            return task.id !== id;

        });


    saveTasks();

    renderTasks();

}


// =========================
// SWIPE
// =========================

function addSwipe(element, task) {

    let startX = 0;
    let startY = 0;

    let currentX = 0;

    let dragging = false;


    element.addEventListener(
        "touchstart",
        function (event) {

            startX =
                event.touches[0].clientX;

            startY =
                event.touches[0].clientY;

            currentX = startX;

            dragging = true;

            element.style.transition =
                "none";

        },
        { passive: true }
    );


    element.addEventListener(
        "touchmove",
        function (event) {

            if (!dragging) {

                return;

            }


            const x =
                event.touches[0].clientX;

            const y =
                event.touches[0].clientY;


            const deltaX =
                x - startX;

            const deltaY =
                y - startY;


            if (
                Math.abs(deltaY) >
                Math.abs(deltaX)
            ) {

                dragging = false;

                element.style.transform =
                    "translateX(0)";

                return;

            }


            currentX = x;


            let distance =
                currentX - startX;


            const maxDistance = 125;


            if (distance > maxDistance) {

                distance = maxDistance;

            }


            if (distance < -maxDistance) {

                distance = -maxDistance;

            }


            element.style.transform =
                `translateX(${distance}px)`;

        },
        { passive: true }
    );


    element.addEventListener(
        "touchend",
        function () {

            if (!dragging) {

                return;

            }


            dragging = false;


            const distance =
                currentX - startX;


            element.style.transition =
                "transform 0.22s ease";


            // Swipe right = Complete

            if (distance > 90) {

                element.style.transform =
                    "translateX(100%)";


                setTimeout(function () {

                    task.completed =
                        !task.completed;

                    saveTasks();

                    renderTasks();

                }, 200);

            }


            // Swipe left = Delete

            else if (distance < -90) {

                element.style.transform =
                    "translateX(-100%)";


                setTimeout(function () {

                    deleteTask(task.id);

                }, 200);

            }


            // Not enough movement

            else {

                element.style.transform =
                    "translateX(0)";

            }

        }
    );

}


// =========================
// LOCAL STORAGE
// =========================

function saveTasks() {

    localStorage.setItem(
        "tasks",
        JSON.stringify(tasks)
    );

}


// =========================
// FOOTER
// =========================

function updateFooter() {

    const total =
        tasks.length;


    const completed =
        tasks.filter(function (task) {

            return task.completed;

        }).length;


    taskCount.textContent =
        `${total} tasks • ${completed} completed`;


    emptyState.style.display =
        total === 0
            ? "block"
            : "none";

}


// =========================
// SECURITY
// =========================

function escapeHTML(text) {

    const div =
        document.createElement("div");

    div.textContent = text;

    return div.innerHTML;

}


// =========================
// START APP
// =========================

updateWelcome();

renderTasks();