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
const darkModeToggle =
    document.getElementById("darkModeToggle");
/* =========================
   LOAD DATA
========================= */
let tasks =
    JSON.parse(
        localStorage.getItem("tasks")
    ) || [];
let username =
    localStorage.getItem("username") || "";
let primaryColor =
    localStorage.getItem("primaryColor")
    || "#007AFF";
let darkMode =
    localStorage.getItem("darkMode")
    === "true";
/* =========================
   INITIAL SETTINGS
========================= */
document.documentElement.style.setProperty(
    "--primary",
    primaryColor
);
if (darkMode) {
    document.body.classList.add("dark");
    darkModeToggle.classList.add("active");
}
/* =========================
   WELCOME
========================= */
function updateWelcome() {
    if (username) {
        welcome.textContent =
            `Welcome, ${username} 👋`;
        profileBtn.textContent =
            username
                .charAt(0)
                .toUpperCase();
    }
    else {
        welcome.textContent =
            "Welcome 👋";
    }
}
/* =========================
   PROFILE
========================= */
profileBtn.addEventListener(
    "click",
    function() {
        nameInput.value =
            username;
        profileModal.classList.remove(
            "hidden"
        );
    }
);
closeModal.addEventListener(
    "click",
    function() {
        profileModal.classList.add(
            "hidden"
        );
    }
);
profileModal.addEventListener(
    "click",
    function(event) {
        if (
            event.target ===
            profileModal
        ) {
            profileModal.classList.add(
                "hidden"
            );
        }
    }
);
/* =========================
   DARK MODE
========================= */
darkModeToggle.addEventListener(
    "click",
    function() {
        darkMode =
            !darkMode;
        document.body.classList.toggle(
            "dark",
            darkMode
        );
        darkModeToggle.classList.toggle(
            "active",
            darkMode
        );
    }
);
/* =========================
   COLORS
========================= */
document
    .querySelectorAll(".color")
    .forEach(function(button) {
        if (
            button.dataset.color ===
            primaryColor
        ) {
            button.classList.add(
                "selected"
            );
        }
        button.addEventListener(
            "click",
            function() {
                primaryColor =
                    button.dataset.color;
                document.documentElement.style.setProperty(
                    "--primary",
                    primaryColor
                );
                document
                    .querySelectorAll(".color")
                    .forEach(function(item) {
                        item.classList.remove(
                            "selected"
                        );
                    });
                button.classList.add(
                    "selected"
                );
            }
        );
    });
/* =========================
   SAVE PROFILE
========================= */
saveProfile.addEventListener(
    "click",
    function() {
        const name =
            nameInput.value.trim();
        if (name !== "") {
            username =
                name;
            localStorage.setItem(
                "username",
                username
            );
        }
        localStorage.setItem(
            "primaryColor",
            primaryColor
        );
        localStorage.setItem(
            "darkMode",
            darkMode
        );
        updateWelcome();
        profileModal.classList.add(
            "hidden"
        );
    }
);
/* =========================
   ADD TASK
========================= */
function addTask() {
    const text =
        input.value.trim();
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
addBtn.addEventListener(
    "click",
    addTask
);
input.addEventListener(
    "keydown",
    function(event) {
        if (
            event.key ===
            "Enter"
        ) {
            addTask();
        }
    }
);
/* =========================
   RENDER TASKS
========================= */
function renderTasks() {
    taskList.innerHTML = "";
    tasks.forEach(
        function(task) {
            const container =
                document.createElement(
                    "div"
                );
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
                <div class="task">
                    <button class="check">
                        ${
                            task.completed
                            ? "✓"
                            : ""
                        }
                    </button>
                    <div class="task-content">
                        <p>
                            ${escapeHTML(task.text)}
                        </p>
                        <span>
                            ${
                                task.completed
                                ? "Completed"
                                : "Today"
                            }
                        </span>
                    </div>
                    <div class="actions">
                        <button
                            class="edit"
                            aria-label="Edit task"
                        >
                            <svg
                                viewBox="0 0 24 24"
                            >
                                <path
                                    d="
                                    M12 20h9
                                    M16.5 3.5
                                    a2.121 2.121 0 0 1 3 3
                                    L7 19
                                    l-4 1
                                    1-4Z
                                    "
                                />
                            </svg>
                        </button>
                        <button
                            class="delete"
                            aria-label="Delete task"
                        >
                            <svg
                                viewBox="0 0 24 24"
                            >
                                <polyline
                                    points="
                                    3 6 5 6 21 6
                                    "
                                />
                                <path
                                    d="
                                    M19 6
                                    v14
                                    a2 2 0 0 1-2 2H7
                                    a2 2 0 0 1-2-2V6
                                    m3 0V4
                                    a2 2 0 0 1 2-2h4
                                    a2 2 0 0 1 2 2v2
                                    "
                                />
                            </svg>
                        </button>
                    </div>
                </div>
            `;
            const taskElement =
                container.querySelector(
                    ".task"
                );
            /* =====================
               COMPLETE
            ===================== */
            taskElement
                .querySelector(".check")
                .addEventListener(
                    "click",
                    function() {
                        task.completed =
                            !task.completed;
                        saveTasks();
                        renderTasks();
                    }
                );
            /* =====================
               EDIT
            ===================== */
            taskElement
                .querySelector(".edit")
                .addEventListener(
                    "click",
                    function() {
                        const newText =
                            prompt(
                                "Edit task:",
                                task.text
                            );
                        if (
                            newText !== null
                            &&
                            newText.trim() !== ""
                        ) {
                            task.text =
                                newText.trim();
                            saveTasks();
                            renderTasks();
                        }
                    }
                );
            /* =====================
               DELETE
            ===================== */
            taskElement
                .querySelector(".delete")
                .addEventListener(
                    "click",
                    function() {
                        deleteTask(
                            task.id
                        );
                    }
                );
            /* =====================
               SWIPE
            ===================== */
            addSwipe(
                taskElement,
                task
            );
            taskList.appendChild(
                container
            );
        }
    );
    updateFooter();
}
/* =========================
   DELETE TASK
========================= */
function deleteTask(id) {
    tasks =
        tasks.filter(
            function(task) {
                return task.id !== id;
            }
        );
    saveTasks();
    renderTasks();
}
/* =========================
   SWIPE
========================= */
function addSwipe(
    element,
    task
) {
    let startX = 0;
    let currentX = 0;
    let dragging = false;
    element.addEventListener(
        "touchstart",
        function(event) {
            startX =
                event.touches[0]
                    .clientX;
            currentX =
                startX;
            dragging = true;
            element.style.transition =
                "none";
        },
        {
            passive: true
        }
    );
    element.addEventListener(
        "touchmove",
        function(event) {
            if (!dragging) {
                return;
            }
            currentX =
                event.touches[0]
                    .clientX;
            let distance =
                currentX - startX;
            /*
                Limit the movement
            */
            if (distance > 130) {
                distance = 130;
            }
            if (distance < -130) {
                distance = -130;
            }
            element.style.transform =
                `translateX(${distance}px)`;
        },
        {
            passive: true
        }
    );
    element.addEventListener(
        "touchend",
        function() {
            if (!dragging) {
                return;
            }
            dragging = false;
            const distance =
                currentX - startX;
            element.style.transition =
                "transform 0.2s ease";
            /*
                Swipe RIGHT
                Complete
            */
            if (distance > 90) {
                element.style.transform =
                    "translateX(100%)";
                setTimeout(
                    function() {
                        task.completed =
                            !task.completed;
                        saveTasks();
                        renderTasks();
                    },
                    180
                );
            }
            /*
                Swipe LEFT
                Delete
            */
            else if (
                distance < -90
            ) {
                element.style.transform =
                    "translateX(-100%)";
                setTimeout(
                    function() {
                        deleteTask(
                            task.id
                        );
                    },
                    180
                );
            }
            /*
                Not enough
                movement
            */
            else {
                element.style.transform =
                    "translateX(0)";
            }
        }
    );
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
    const total =
        tasks.length;
    const completed =
        tasks.filter(
            function(task) {
                return task.completed;
            }
        ).length;
    taskCount.textContent =
        `${total} tasks • ${completed} completed`;
    if (total === 0) {
        emptyState.style.display =
            "block";
    }
    else {
        emptyState.style.display =
            "none";
    }
}
/* =========================
   SECURITY
========================= */
function escapeHTML(text) {
    const div =
        document.createElement(
            "div"
        );
    div.textContent =
        text;
    return div.innerHTML;
}
/* =========================
   START
========================= */
updateWelcome();
renderTasks();
