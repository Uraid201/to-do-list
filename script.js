// =========================
// ELEMENTS
// =========================

const input =
    document.getElementById("taskInput");

const addBtn =
    document.getElementById("addBtn");

const taskList =
    document.getElementById("taskList");

const taskCount =
    document.getElementById("taskCount");

const emptyState =
    document.getElementById("emptyState");

const welcome =
    document.getElementById("welcome");

const profileBtn =
    document.getElementById("profileBtn");

const darkModeBtn =
    document.getElementById("darkModeBtn");

const profileModal =
    document.getElementById("profileModal");
const profileFields = document.getElementById("profileFields");
const themeFields = document.getElementById("themeFields");
const profileModalTitle = document.getElementById("profileModalTitle");

const closeModal =
    document.getElementById("closeModal");

const nameInput =
    document.getElementById("nameInput");

const saveProfile =
    document.getElementById("saveProfile");

const sortBtn =
    document.getElementById("sortBtn");

const trashBtn =
    document.getElementById("trashBtn");

const groupButtons =
    document.querySelectorAll(".group-btn");


const groupsContainer =
    document.querySelector(".groups");

const createGroupBtn =
    document.getElementById("createGroupBtn");

const groupModal =
    document.getElementById("groupModal");

const groupNameInput =
    document.getElementById("groupName");

const groupEmojiInput =
    document.getElementById("groupEmoji");

const saveGroupBtn =
    document.getElementById("saveGroupBtn");

const groupModalClose =
    document.getElementById("groupModalClose");


const menuBtn =
    document.getElementById("menuBtn");

const appDrawer =
    document.getElementById("appDrawer");

const drawerOverlay =
    document.getElementById("drawerOverlay");

const drawerClose =
    document.getElementById("drawerClose");

const drawerContent = document.querySelector(".drawer-content");

const themesBtn =
    document.getElementById("themesBtn");

const languageBtn =
    document.getElementById("languageBtn");

const darkModeText =
    document.getElementById("darkModeText");
// =========================
function openDrawer() {
    appDrawer.classList.add("open");
    drawerOverlay.classList.add("open");
}

function closeDrawer() {
    appDrawer.classList.remove("open");
    drawerOverlay.classList.remove("open");
}
function closeDrawer() {
    appDrawer.classList.remove("open");
    drawerOverlay.classList.remove("open");
}

function updateDrawerMode() {
    const icon = trashBtn.querySelector(".drawer-icon");
    const text = trashBtn.querySelector(".drawer-text");

    if (trashMode) {
        icon.textContent = "📋";
        text.textContent = language === "ar" ? "المهام" : "Tasks";

        trashBtn.classList.remove("danger-item");

        drawerContent.insertBefore(
            trashBtn,
            drawerContent.firstElementChild
        );

        groupsContainer.style.display = "none";
    } else {
        icon.textContent = "🗑️";
        text.textContent = t("trash");

        trashBtn.classList.add("danger-item");

        drawerContent.appendChild(trashBtn);
        groupsContainer.style.display = "";
    }
}


menuBtn.addEventListener("click", openDrawer);

drawerClose.addEventListener("click", closeDrawer);

drawerOverlay.addEventListener("click", closeDrawer);


// =========================
// DATA
// =========================

let tasks =
    JSON.parse(localStorage.getItem("tasks")) || [];

let username =
    localStorage.getItem("username") || "";

let primaryColor =
    localStorage.getItem("primaryColor") || "#007AFF";

let pendingPrimaryColor = primaryColor;

let darkMode =
    localStorage.getItem("darkMode") === "true";

let newestFirst = true;


// =========================
// GROUP / VIEW
// =========================
let language =
    localStorage.getItem("language") || "en";

let selectedGroup = "unassigned";

let trashMode = false;


let customGroups = [];

try {
    const savedGroups = JSON.parse(
        localStorage.getItem("customGroups") || "[]"
    );

    if (Array.isArray(savedGroups)) {
        customGroups = savedGroups.filter(function (group) {
            return (
                group &&
                typeof group.id === "string" &&
                typeof group.name === "string" &&
                typeof group.emoji === "string"
            );
        }).slice(0, 15);
    }
} catch (error) {
    customGroups = [];
}




// =========================
// APP DRAWER
// =========================
/*/
function openDrawer() {

    appDrawer.classList.add("open");

    drawerOverlay.classList.add("open");

}


function closeDrawer() {

    appDrawer.classList.remove("open");

    drawerOverlay.classList.remove("open");

}


menuBtn.addEventListener(
    "click",
    openDrawer
);


drawerClose.addEventListener(
    "click",
    closeDrawer
);


drawerOverlay.addEventListener(
    "click",
    closeDrawer
);

/*/

// =========================
// THEMES
// =========================


themesBtn.addEventListener("click", function () {
    closeDrawer();
    
    pendingPrimaryColor = primaryColor; 

    profileFields.classList.add("hidden");
    themeFields.classList.remove("hidden");
    profileModalTitle.textContent = t("themes");

    profileModal.classList.remove("hidden");
});

// =========================
// LANGUAGE
// =========================

const translations = {

    en: {

        menu: "Menu",

        profile: "Profile",

        themes: "Themes",

        darkMode: "Dark Mode",

        lightMode: "Light Mode",

        sort: "Sort Tasks",

        language: "Language",

        trash: "Trash",

        welcome: "Welcome 👋",

        title: "My Tasks",

        placeholder:
            "What needs to be done?",

        unassigned: "Unassigned",

        work: "💼 Work",

        study: "📚 Study",

        family: "👨‍👩‍👧 Family",

        personal: "👤 Personal",

        noTasks: "No tasks yet",

        addFirst:
            "Add your first task.",

        activeTasks:
            "Active Tasks",

        completed:
            "Completed",

        deletedTasks:
            "Deleted Tasks",

        trashEmpty:
            "Trash is empty",

        trashEmptyText:
            "Deleted tasks will appear here.",

        tasks: "tasks",

        deleted: "deleted",

        completedCount: "completed",

        profileTitle:
            "Your Profile",

        yourName:
            "Your name",

        namePlaceholder:
            "Enter your name",

        themeColor:
            "Theme Color",

        save: "Save",

        editTask:
            "Edit task:",

        complete:
            "✓ Complete",

        delete:
            "Delete 🗑",

        deleteAll:
            "Delete All Permanently",

        deleteAllConfirm:
            "Delete all deleted tasks permanently?",

        deleteConfirm:
            "Delete this task permanently?",

        importantLimit:
            "You can have up to 3 important tasks.",

        restore:
            "Restore task",

        important:
            "Important"

    },


    ar: {

        menu: "القائمة",

        profile: "الملف الشخصي",

        themes: "المظهر",

        darkMode: "الوضع الداكن",

        lightMode: "الوضع الفاتح",

        sort: "ترتيب المهام",

        language: "اللغة",

        trash: "سلة المهملات",

        welcome: "مرحباً 👋",

        title: "مهامي",

        placeholder:
            "ما الذي تريد إنجازه؟",

        unassigned: "غير مصنفة",

        work: "💼 العمل",

        study: "📚 الدراسة",

        family: "👨‍👩‍👧 العائلة",

        personal: "👤 شخصي",

        noTasks: "لا توجد مهام بعد",

        addFirst:
            "أضف أول مهمة لك.",

        activeTasks:
            "المهام الحالية",

        completed:
            "المكتملة",

        deletedTasks:
            "المهام المحذوفة",

        trashEmpty:
            "سلة المهملات فارغة",

        trashEmptyText:
            "المهام المحذوفة ستظهر هنا.",

        tasks: "مهام",

        deleted: "محذوفة",

        completedCount: "مكتملة",

        profileTitle:
            "ملفك الشخصي",

        yourName:
            "اسمك",

        namePlaceholder:
            "اكتب اسمك",

        themeColor:
            "لون المظهر",

        save: "حفظ",

        editTask:
            "تعديل المهمة:",

        complete:
            "✓ إكمال",

        delete:
            "حذف 🗑",

        deleteAll:
            "حذف الكل نهائياً",

        deleteAllConfirm:
            "هل تريد حذف جميع المهام المحذوفة نهائياً؟",

        deleteConfirm:
            "هل تريد حذف هذه المهمة نهائياً؟",

        importantLimit:
            "يمكنك اختيار 3 مهام مهمة كحد أقصى.",

        restore:
            "استعادة المهمة",

        important:
            "مهمة مهمة"

    }

};


function t(key) {

    return translations[language][key] ||
        translations.en[key] ||
        key;

}


function applyLanguage() {

    document.documentElement.lang =
        language;

    document.documentElement.dir =
        language === "ar"
            ? "rtl"
            : "ltr";


    document.querySelector(
        ".drawer-header h2"
    ).textContent =
        t("menu");


    document.querySelector(
        ".drawer-small"
    ).textContent =
        t("title");


    document.querySelector(
        ".header h1"
    ).textContent =
        t("title");


    document.querySelector(
        "#taskInput"
    ).placeholder =
        t("placeholder");


    document.querySelector(
        "#profileBtn .drawer-text"
    ).textContent =
        t("profile");


    document.querySelector(
        "#themesBtn .drawer-text"
    ).textContent =
        t("themes");


    document.querySelector(
        "#sortBtn .drawer-text"
    ).textContent =
        t("sort");


    document.querySelector("#languageBtn .drawer-text").textContent =
    language === "ar"
        ? "التغيير إلى الإنجليزية"
        : "Switch to Arabic";

    document.querySelector(
        "#trashBtn .drawer-text"
    ).textContent =
        t("trash");


    darkModeText.textContent =
        darkMode
            ? t("lightMode")
            : t("darkMode");


    const groupMap = {

        unassigned: t("unassigned"),

        work: t("work"),

        study: t("study"),

        family: t("family"),

        personal: t("personal")

    };


document.querySelectorAll(".group-btn").forEach(
    function (button) {
        const group = button.dataset.group;

        if (groupMap[group]) {
            button.textContent = groupMap[group];
        } else {
            const customGroup = customGroups.find(
                function (item) {
                    return item.id === group;
                }
            );

            if (customGroup) {
                button.textContent =
                    `${customGroup.emoji} ${customGroup.name}`;
            }
        }
    }
);



    document.querySelector(
        ".modal-box h2"
    ).textContent =
        t("profileTitle");


    document.querySelector(
        ".modal-box label"
    ).textContent =
        t("yourName");


    nameInput.placeholder =
        t("namePlaceholder");


    document.querySelector(
        ".modal-box h3"
    ).textContent =
        t("themeColor");


    saveProfile.textContent =
        t("save");

    updateWelcome();

    renderTasks();

}

languageBtn.addEventListener(
    "click",
    function () {

        language =
            language === "en"
                ? "ar"
                : "en";

        localStorage.setItem(
            "language",
            language
        );

        applyLanguage();

        closeDrawer();

    }
);

// =========================
// MIGRATE OLD TASKS
// =========================

tasks = tasks.map(function (task) {

    return {

        ...task,

        group:
            task.group || null,

        important:
            task.important === true,

        deleted:
            task.deleted === true

    };

});

saveTasks();


// =========================
// SETTINGS
// =========================

document.documentElement.style.setProperty(
    "--primary",
    primaryColor
);

if (darkMode) {

    document.body.classList.add("dark");

darkModeBtn.querySelector(".drawer-icon").textContent = "☀️";
}


// =========================
// WELCOME
// =========================


function updateWelcome() {
    welcome.textContent = username
        ? (language === "ar"
            ? `مرحباً، ${username} 👋`
            : `Welcome, ${username} 👋`)
        : t("welcome");
}

// =========================
// DARK MODE
// =========================

darkModeBtn.addEventListener(
    "click",
    function () {

        darkMode = !darkMode;

        document.body.classList.toggle(
            "dark",
            darkMode
        );

        darkModeBtn.querySelector(
            ".drawer-icon"
        ).textContent =
            darkMode
                ? "☀️"
                : "🌙";

        darkModeText.textContent =
            darkMode
                ? t("lightMode")
                : t("darkMode");

        localStorage.setItem(
            "darkMode",
            darkMode
        );

    }
);

// =========================
// SORT
// =========================
sortBtn.addEventListener("click", function () {
    closeDrawer();

    const visibleTasks = getFilteredTasks();

    if (visibleTasks.length === 0) {
        alert(
            language === "ar"
                ? "لا توجد مهام لترتيبها."
                : "No tasks to sort."
        );
        return;
    }

    newestFirst = !newestFirst;
    renderTasks();
});

// =========================
// GROUP SELECT & CUSTOM GROUPS
// =========================

   
function renderCustomGroups() {
    document.querySelectorAll(".custom-group-btn").forEach(
        function (button) {
            button.remove();
        }
    );

    customGroups.forEach(function (group) {
        const button = document.createElement("button");

        button.className = "group-btn custom-group-btn";
        button.dataset.group = group.id;
        button.textContent = `${group.emoji} ${group.name}`;

        if (selectedGroup === group.id && !trashMode) {
            button.classList.add("active");
        }

        button.addEventListener("click", function () {
            trashMode = false;
            selectedGroup = group.id;

            document.querySelectorAll(".group-btn").forEach(
                function (item) {
                    item.classList.remove("active");
                }
            );

            button.classList.add("active");
            updateAddButton();
            renderTasks();
        });

        groupsContainer.insertBefore(button, createGroupBtn);
    });
}

groupButtons.forEach(function (button) {
    button.addEventListener("click", function () {
        trashMode = false;

        document.querySelectorAll(".group-btn").forEach(
            function (item) {
                item.classList.remove("active");
            }
        );

        button.classList.add("active");
        selectedGroup = button.dataset.group;

        updateAddButton();
        renderTasks();
    });
});
// =========================

createGroupBtn.addEventListener("click", function () {
    if (customGroups.length >= 15) {
        alert(language === "ar"
            ? "وصلت للحد الأقصى: 20 مجموعة."
            : "Maximum of 20 groups reached.");
        return;
    }

    groupNameInput.value = "";
    groupEmojiInput.value = "";
    groupModal.style.display = "flex";
    groupNameInput.focus();
});

groupModalClose.addEventListener("click", function () {
    groupModal.style.display = "none";
});

groupModal.addEventListener("click", function (event) {
    if (event.target === groupModal) {
        groupModal.style.display = "none";
    }
});

saveGroupBtn.addEventListener("click", function () {
    const name = groupNameInput.value.trim();
    const emoji = groupEmojiInput.value.trim() || "📁";

    if (!name) {
        alert(language === "ar"
            ? "اكتب اسم المجموعة أولاً."
            : "Please enter a group name.");
        groupNameInput.focus();
        return;
    }

    const duplicate = customGroups.some(function (group) {
        return group.name.toLowerCase() === name.toLowerCase();
    });

    if (duplicate) {
        alert(language === "ar"
            ? "هذا الاسم مستخدم بالفعل."
            : "This group name already exists.");
        return;
    }

    if (customGroups.length >= 15) {
        alert(language === "ar"
            ? "وصلت للحد الأقصى من المجموعات."
            : "Maximum of 20 groups reached.");
        groupModal.style.display = "none";
        return;
    }

    const group = {
        id: "custom_" + Date.now(),
        name: name,
        emoji: emoji
    };

    customGroups.push(group);

    localStorage.setItem(
        "customGroups",
        JSON.stringify(customGroups)
    );

    renderCustomGroups();

    groupModal.style.display = "none";
    groupNameInput.value = "";
    groupEmojiInput.value = "";
});




// =========================
// TRASH
// =========================
t
trashBtn.addEventListener("click", function () {
    trashMode = !trashMode;

    if (trashMode) {
        document.querySelectorAll(".group-btn").forEach(
            function (item) {
                item.classList.remove("active");
            }
        );
    } else {
        const selectedButton = document.querySelector(
            `.group-btn[data-group="${selectedGroup}"]`
        );

        if (selectedButton) {
            document.querySelectorAll(".group-btn").forEach(
                function (item) {
                    item.classList.remove("active");
                }
            );

            selectedButton.classList.add("active");
        }
    }

    updateDrawerMode();
    updateAddButton();
    closeDrawer();
    renderTasks();
});


// =========================
// ADD BUTTON TEXT
// =========================

function updateAddButton() {

    addBtn.textContent = "+";

}


// =========================
// PROFILE
// =========================


profileBtn.addEventListener("click", function () {
    closeDrawer();

    nameInput.value = username;

    profileFields.classList.remove("hidden");
    themeFields.classList.add("hidden");
    profileModalTitle.textContent = t("profileTitle");

    profileModal.classList.remove("hidden");
});



function closeProfileModal() {
    document.documentElement.style.setProperty(
        "--primary",
        primaryColor
    );

    pendingPrimaryColor = primaryColor;
    updateSelectedColor(primaryColor);

    profileModal.classList.add("hidden");
}

closeModal.addEventListener("click", closeProfileModal);

profileModal.addEventListener("click", function (event) {
    if (event.target === profileModal) {
        closeProfileModal();
    }
});

profileModal.addEventListener(
    "click",
    function (event) {

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


// =========================
// COLORS
// =========================

function updateSelectedColor(color) {
    document.querySelectorAll(".color").forEach(function (item) {
        item.classList.toggle(
            "selected",
            item.dataset.color === color
        );
    });
}

document.querySelectorAll(".color").forEach(function (button) {
    button.addEventListener("click", function () {
        pendingPrimaryColor = button.dataset.color;

        document.documentElement.style.setProperty(
            "--primary",
            pendingPrimaryColor
        );

        updateSelectedColor(pendingPrimaryColor);
    });
});
// =========================
// SAVE PROFILE
// =========================

saveProfile.addEventListener("click", function () {
    if (!themeFields.classList.contains("hidden")) {
        primaryColor = pendingPrimaryColor;

        localStorage.setItem("primaryColor", primaryColor);
    } else {
        const name = nameInput.value.trim();

        if (name) {
            username = name;
            localStorage.setItem("username", username);
        }

        updateWelcome();
    }

    profileModal.classList.add("hidden");
});


// =========================
// ADD TASK
// =========================

function addTask() {

    const text =
        input.value.trim();


    if (!text || trashMode) {

        return;

    }


    const task = {

        id: Date.now(),

        text: text,

        completed: false,

        group:
            selectedGroup === "unassigned"
                ? null
                : selectedGroup,

        important: false,

        deleted: false

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

        if (
            event.key === "Enter"
        ) {

            addTask();

        }

    }
);


// =========================
// FILTER TASKS
// =========================

function getFilteredTasks() {

    if (trashMode) {

        return tasks.filter(
            function (task) {

                return task.deleted === true;

            }
        );

    }


    return tasks.filter(
        function (task) {

            if (task.deleted) {

                return false;

            }


            if (
                selectedGroup ===
                "unassigned"
            ) {

                return !task.group;

            }


            return task.group ===
                selectedGroup;

        }
    );

}


// =========================
// RENDER TASKS
// =========================

function renderTasks() {

    taskList.innerHTML = "";


    const filteredTasks =
        getFilteredTasks();


    if (trashMode) {

        renderTrash(
            filteredTasks
        );

        updateFooter();

        return;

    }


    const activeTasks =
        filteredTasks.filter(
            function (task) {

                return !task.completed;

            }
        );


    const completedTasks =
        filteredTasks.filter(
            function (task) {

                return task.completed;

            }
        );


    activeTasks.sort(
        function (a, b) {

            return newestFirst
                ? b.id - a.id
                : a.id - b.id;

        }
    );


    completedTasks.sort(
        function (a, b) {

            return newestFirst
                ? b.id - a.id
                : a.id - b.id;

        }
    );


    if (
        activeTasks.length > 0
    ) {

        const title =
            document.createElement("h3");

        title.className =
            "section-title";

          title.textContent =
          t("activeTasks");

        taskList.appendChild(
            title
        );


        activeTasks.forEach(
            function (task) {

                taskList.appendChild(
                    createTaskElement(task)
                );

            }
        );

    }


    if (
        completedTasks.length > 0
    ) {

        const title =
            document.createElement("h3");

        title.className =
            "section-title";

        title.textContent =
        t("completed");

        taskList.appendChild(
            title
        );


        completedTasks.forEach(
            function (task) {

                taskList.appendChild(
                    createTaskElement(task)
                );

            }
        );

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
           <span>${t("complete")}</span>
        </div>


        <div class="
            swipe-background
            swipe-delete
        ">
            <span>${t("delete")}</span>
        </div>


        <div class="
            task
            ${task.completed ? "completed" : ""}
            ${task.important ? "important-task" : ""}
        ">

            <button
                class="check"
                aria-label="Complete task">

                ${task.completed ? "✓" : ""}

            </button>


            <div class="task-content">

                <p>
                    ${escapeHTML(task.text)}

                    ${
                        task.important
                            ? '<span class="important-star">⭐</span>'
                            : ""
                    }

                </p>

                <span>
                    ${
                        task.completed
                            ? t("completed")
                            : getGroupName(task.group)
                    }
                </span>

            </div>


            <div class="actions">

                <button
                    class="important-btn ${task.important ? "active" : ""}"
                    aria-label="Important"
                    title="${t("important")}">
                    ⭐
                </button>


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
        container.querySelector(
            ".task"
        );


    const completeBackground =
        container.querySelector(
            ".swipe-complete"
        );


    const deleteBackground =
        container.querySelector(
            ".swipe-delete"
        );


    // =========================
    // CHECK
    // =========================

    taskElement
        .querySelector(".check")
        .addEventListener(
            "click",
            function () {

                task.completed =
                    !task.completed;

                saveTasks();

                renderTasks();

            }
        );


    // =========================
    // IMPORTANT
    // =========================

    taskElement
        .querySelector(".important-btn")
        .addEventListener(
            "click",
            function () {

                toggleImportant(
                    task.id
                );

            }
        );


    // =========================
    // EDIT
    // =========================

    taskElement
        .querySelector(".edit")
        .addEventListener(
            "click",
            function () {

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

            }
        );


    // =========================
    // DELETE
    // =========================

    taskElement
        .querySelector(".delete")
        .addEventListener(
            "click",
            function () {

                deleteTask(
                    task.id
                );

            }
        );


    // =========================
    // SWIPE
    // =========================

    addSwipe(
        taskElement,
        task,
        completeBackground,
        deleteBackground
    );


    return container;

}


// =========================
// TRASH RENDER
// =========================

function renderTrash(tasksInTrash) {

    if (
        tasksInTrash.length === 0
    ) {

        return;

    }


    const title =
        document.createElement("h3");

    title.className =
        "section-title";

    title.textContent =
        t("deletedTasks");

    taskList.appendChild(
        title
    );


    tasksInTrash.sort(
        function (a, b) {

            return newestFirst
                ? b.id - a.id
                : a.id - b.id;

        }
    );


    tasksInTrash.forEach(
        function (task) {

            const container =
                document.createElement("div");

            container.className =
                "swipe-container";

 
            container.innerHTML = `

                <div class="task trash-task">
                    <div class="task-content">

                        <p>
                            ${escapeHTML(task.text)}

                            ${
                                task.important
                                    ? '<span class="important-star">⭐</span>'
                                    : ""
                            }

                        </p>

                        <span>
                            ${
                                getGroupName(task.group)
                            }
                        </span>

                    </div>


                    <div class="
                        actions
                        trash-actions
                    ">

                        <button
                            class="restore"
                            aria-label="Restore task">
                            ↩️
                        </button>

                        <button
                            class="permanent-delete"
                            aria-label="Delete permanently">
                            🗑️
                        </button>

                    </div>

                </div>
            `;


            const taskElement =
                container.querySelector(
                    ".task"
                );


            taskElement
                .querySelector(".restore")
                .addEventListener(
                    "click",
                    function () {

                        restoreTask(
                            task.id
                        );

                    }
                );


            taskElement
                .querySelector(".permanent-delete")
                .addEventListener(
                    "click",
                    function () {

                        permanentlyDeleteTask(
                            task.id
                        );

                    }
                );


            taskList.appendChild(
                container
            );

        }
    );


    const emptyTrash =
        document.createElement("button");

    emptyTrash.className =
        "empty-trash";

     emptyTrash.textContent =
     t("deleteAll");


    emptyTrash.addEventListener(
        "click",
        function () {

            if (
                tasksInTrash.length === 0
            ) {

                return;

            }


            const confirmed =
                confirm(
                    t("deleteAllConfirm")
                );


            if (!confirmed) {

                return;

            }


            tasks =
                tasks.filter(
                    function (task) {

                        return !task.deleted;

                    }
                );


            saveTasks();

            renderTasks();

        }
    );


    taskList.appendChild(
        emptyTrash
    );

}


// =========================
// GROUP NAME
// =========================

function getGroupName(group) {
    if (!group) {
        return t("unassigned");
    }

    const names = {
        work: t("work"),
        study: t("study"),
        family: t("family"),
        personal: t("personal")
    };

    if (names[group]) {
        return names[group];
    }

    const customGroup = customGroups.find(function (item) {
        return item.id === group;
    });

    return customGroup
        ? `${customGroup.emoji} ${customGroup.name}`
        : t("unassigned");
}

// =========================
// DELETE TO TRASH
// =========================

function deleteTask(id) {

    const task =
        tasks.find(
            function (item) {

                return item.id === id;

            }
        );


    if (!task) {

        return;

    }


    task.deleted = true;

    saveTasks();

    renderTasks();

}


// =========================
// RESTORE
// =========================

function restoreTask(id) {

    const task =
        tasks.find(
            function (item) {

                return item.id === id;

            }
        );


    if (!task) {

        return;

    }


    task.deleted = false;

    saveTasks();

    renderTasks();

}


// =========================
// PERMANENT DELETE
// =========================

function permanentlyDeleteTask(id) {

    const confirmed =
       confirm(
    t("deleteConfirm")
    );

    if (!confirmed) {

        return;

    }


    tasks =
        tasks.filter(
            function (task) {

                return task.id !== id;

            }
        );


    saveTasks();

    renderTasks();

}


// =========================
// IMPORTANT
// =========================

function toggleImportant(id) {

    const task =
        tasks.find(
            function (item) {

                return item.id === id;

            }
        );


    if (!task || task.deleted) {

        return;

    }


    if (!task.important) {

        const importantCount =
            tasks.filter(
                function (item) {

                    return (
                        item.important &&
                        !item.deleted
                    );

                }
            ).length;


        if (
            importantCount >= 3
        ) {

          alert(
    t("importantLimit")
           );

            return;

        }

    }


    task.important =
        !task.important;

    saveTasks();

    renderTasks();

}


// =========================
// SWIPE
// =========================

function addSwipe(
    element,
    task,
    completeBackground,
    deleteBackground
) {

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

            currentX =
                startX;

            dragging = true;

            element.style.transition =
                "none";

            completeBackground.style.opacity =
                "0";

            deleteBackground.style.opacity =
                "0";

        },
        {
            passive: true
        }
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

                element.style.transition =
                    "transform 0.22s ease";

                element.style.transform =
                    "translate3d(0,0,0)";

                completeBackground.style.opacity =
                    "0";

                deleteBackground.style.opacity =
                    "0";

                return;

            }


            currentX = x;


            let distance =
                currentX - startX;


            const maxDistance = 125;


            if (
                distance >
                maxDistance
            ) {

                distance =
                    maxDistance;

            }


            if (
                distance <
                -maxDistance
            ) {

                distance =
                    -maxDistance;

            }


            element.style.transform =
                `translate3d(${distance}px,0,0)`;


            if (
                distance > 10
            ) {

                completeBackground.style.opacity =
                    "1";

                deleteBackground.style.opacity =
                    "0";

            }


            else if (
                distance < -10
            ) {

                completeBackground.style.opacity =
                    "0";

                deleteBackground.style.opacity =
                    "1";

            }


            else {

                completeBackground.style.opacity =
                    "0";

                deleteBackground.style.opacity =
                    "0";

            }

        },
        {
            passive: true
        }
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


            if (
                distance > 90
            ) {

                completeBackground.style.opacity =
                    "1";

                deleteBackground.style.opacity =
                    "0";

                element.style.transform =
                    "translate3d(100%,0,0)";


                setTimeout(
                    function () {

                        task.completed =
                            !task.completed;

                        saveTasks();

                        renderTasks();

                    },
                    220
                );


                return;

            }


            if (
                distance < -90
            ) {

                completeBackground.style.opacity =
                    "0";

                deleteBackground.style.opacity =
                    "1";

                element.style.transform =
                    "translate3d(-100%,0,0)";


                setTimeout(
                    function () {

                        deleteTask(
                            task.id
                        );

                    },
                    220
                );


                return;

            }


            element.style.transform =
                "translate3d(0,0,0)";

            completeBackground.style.opacity =
                "0";

            deleteBackground.style.opacity =
                "0";

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

    const visibleTasks =
        getFilteredTasks();


    const total =
        visibleTasks.length;


    const completed =
        visibleTasks.filter(
            function (task) {

                return task.completed;

            }
        ).length;


    if (trashMode) {
     taskCount.textContent =
     `${total} ${t("deleted")}`;

    } else {

      taskCount.textContent =
    `${total} ${t("tasks")} • ${completed} ${t("completedCount")}`;

    }


    emptyState.style.display =
        total === 0
            ? "block"
            : "none";


    if (trashMode) {

        const title =
            emptyState.querySelector("h2");

        const paragraph =
            emptyState.querySelector("p");


        if (title) {

            title.textContent =
                t("trashEmpty");

        }


        if (paragraph) {

            paragraph.textContent =
                t("trashEmptyText");
        }

    } else {

        const title =
            emptyState.querySelector("h2");

        const paragraph =
            emptyState.querySelector("p");


        if (title) {

            title.textContent =
                t("noTasks");

        }


        if (paragraph) {

            paragraph.textContent =
                t("addFirst");

        }

    }

}


// =========================
// ESCAPE HTML
// =========================

function escapeHTML(text) {

    const div =
        document.createElement("div");

    div.textContent =
        text;

    return div.innerHTML;

}


// =========================
// INTRO
// =========================




(() => {
    const screen = document.getElementById("introScreen");
    const title = document.getElementById("introTitle");

    if (!screen || !title) return;

    title.textContent = "My Tasks";

    setTimeout(() => {
        screen.remove();
    }, 5300);
})();


// =========================

// START APP
// =========================

updateWelcome();

updateAddButton();

renderCustomGroups();

updateDrawerMode();

applyLanguage();

renderTasks();// =========================
// ELEMENTS
// =========================


const addBtn =
    document.getElementById("addBtn");

const taskList =
    document.getElementById("taskList");

const taskCount =
    document.getElementById("taskCount");

const emptyState =
    document.getElementById("emptyState");

const welcome =
    document.getElementById("welcome");

const profileBtn =
    document.getElementById("profileBtn");

const darkModeBtn =
    document.getElementById("darkModeBtn");

const profileModal =
    document.getElementById("profileModal");

const closeModal =
    document.getElementById("closeModal");

const nameInput =
    document.getElementById("nameInput");

const saveProfile =
    document.getElementById("saveProfile");

const sortBtn =
    document.getElementById("sortBtn");

const trashBtn =
    document.getElementById("trashBtn");

const groupButtons =
    document.querySelectorAll(".group-btn");


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

let newestFirst = true;


// =========================
// GROUP / VIEW
// =========================

let selectedGroup = "unassigned";

let trashMode = false;


// =========================
// MIGRATE OLD TASKS
// =========================

tasks = tasks.map(function (task) {

    return {

        ...task,

        group:
            task.group || null,

        important:
            task.important === true,

        deleted:
            task.deleted === true

    };

});

saveTasks();


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

        profileBtn.textContent =
            "O";

    }

}


// =========================
// DARK MODE
// =========================

darkModeBtn.addEventListener(
    "click",
    function () {

        darkMode = !darkMode;

        document.body.classList.toggle(
            "dark",
            darkMode
        );

        darkModeBtn.textContent =
            darkMode
                ? "☀️"
                : "🌙";

        localStorage.setItem(
            "darkMode",
            darkMode
        );

    }
);


// =========================
// SORT
// =========================

sortBtn.addEventListener(
    "click",
    function () {

        newestFirst =
            !newestFirst;

        renderTasks();

    }
);


// =========================
// GROUP SELECT
// =========================

groupButtons.forEach(
    function (button) {

        button.addEventListener(
            "click",
            function () {

                trashMode = false;

                groupButtons.forEach(
                    function (item) {

                        item.classList.remove(
                            "active"
                        );

                    }
                );

                button.classList.add(
                    "active"
                );

                selectedGroup =
                    button.dataset.group;

                updateAddButton();

                renderTasks();

            }
        );

    }
);


// =========================
// TRASH
// =========================

trashBtn.addEventListener(
    "click",
    function () {

        trashMode = true;

        groupButtons.forEach(
            function (item) {

                item.classList.remove(
                    "active"
                );

            }
        );

        renderTasks();

    }
);


// =========================
// ADD BUTTON TEXT
// =========================

function updateAddButton() {

    addBtn.textContent = "+";

}


// =========================
// PROFILE
// =========================

profileBtn.addEventListener(
    "click",
    function () {

        nameInput.value =
            username;

        profileModal.classList.remove(
            "hidden"
        );

    }
);


closeModal.addEventListener(
    "click",
    function () {

        profileModal.classList.add(
            "hidden"
        );

    }
);


profileModal.addEventListener(
    "click",
    function (event) {

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


// =========================
// COLORS
// =========================

document
    .querySelectorAll(".color")
    .forEach(
        function (button) {

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
                function () {

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
                        .forEach(
                            function (item) {

                                item.classList.remove(
                                    "selected"
                                );

                            }
                        );


                    button.classList.add(
                        "selected"
                    );

                }
            );

        }
    );


// =========================
// SAVE PROFILE
// =========================

saveProfile.addEventListener(
    "click",
    function () {

        const name =
            nameInput.value.trim();


        if (name) {

            username =
                name;

            localStorage.setItem(
                "username",
                username
            );

        }


        updateWelcome();

        profileModal.classList.add(
            "hidden"
        );

    }
);


// =========================
// ADD TASK
// =========================

function addTask() {

    const text =
        input.value.trim();


    if (!text || trashMode) {

        return;

    }


    const task = {

        id: Date.now(),

        text: text,

        completed: false,

        group:
            selectedGroup === "unassigned"
                ? null
                : selectedGroup,

        important: false,

        deleted: false

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

        if (
            event.key === "Enter"
        ) {

            addTask();

        }

    }
);


// =========================
// FILTER TASKS
// =========================

function getFilteredTasks() {

    if (trashMode) {

        return tasks.filter(
            function (task) {

                return task.deleted === true;

            }
        );

    }


    return tasks.filter(
        function (task) {

            if (task.deleted) {

                return false;

            }


            if (
                selectedGroup ===
                "unassigned"
            ) {

                return !task.group;

            }


            return task.group ===
                selectedGroup;

        }
    );

}


// =========================
// RENDER TASKS
// =========================

function renderTasks() {

    taskList.innerHTML = "";


    const filteredTasks =
        getFilteredTasks();


    if (trashMode) {

        renderTrash(
            filteredTasks
        );

        updateFooter();

        return;

    }


    const activeTasks =
        filteredTasks.filter(
            function (task) {

                return !task.completed;

            }
        );


    const completedTasks =
        filteredTasks.filter(
            function (task) {

                return task.completed;

            }
        );


    activeTasks.sort(
        function (a, b) {

            return newestFirst
                ? b.id - a.id
                : a.id - b.id;

        }
    );


    completedTasks.sort(
        function (a, b) {

            return newestFirst
                ? b.id - a.id
                : a.id - b.id;

        }
    );


    if (
        activeTasks.length > 0
    ) {

        const title =
            document.createElement("h3");

        title.className =
            "section-title";

        title.textContent =
            "Active Tasks";

        taskList.appendChild(
            title
        );


        activeTasks.forEach(
            function (task) {

                taskList.appendChild(
                    createTaskElement(task)
                );

            }
        );

    }


    if (
        completedTasks.length > 0
    ) {

        const title =
            document.createElement("h3");

        title.className =
            "section-title";

        title.textContent =
            "Completed";

        taskList.appendChild(
            title
        );


        completedTasks.forEach(
            function (task) {

                taskList.appendChild(
                    createTaskElement(task)
                );

            }
        );

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
        </div>


        <div class="
            swipe-background
            swipe-delete
        ">
            <span>Delete 🗑</span>
        </div>


        <div class="
            task
            ${task.completed ? "completed" : ""}
            ${task.important ? "important-task" : ""}
        ">

            <button
                class="check"
                aria-label="Complete task">

                ${task.completed ? "✓" : ""}

            </button>


            <div class="task-content">

                <p>
                    ${escapeHTML(task.text)}

                    ${
                        task.important
                            ? '<span class="important-star">⭐</span>'
                            : ""
                    }

                </p>

                <span>
                    ${
                        task.completed
                            ? "Completed"
                            : getGroupName(task.group)
                    }
                </span>

            </div>


            <div class="actions">

                <button
                    class="important-btn ${task.important ? "active" : ""}"
                    aria-label="Important"
                    title="Important">
                    ⭐
                </button>


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
        container.querySelector(
            ".task"
        );


    const completeBackground =
        container.querySelector(
            ".swipe-complete"
        );


    const deleteBackground =
        container.querySelector(
            ".swipe-delete"
        );


    // =========================
    // CHECK
    // =========================

    taskElement
        .querySelector(".check")
        .addEventListener(
            "click",
            function () {

                task.completed =
                    !task.completed;

                saveTasks();

                renderTasks();

            }
        );


    // =========================
    // IMPORTANT
    // =========================

    taskElement
        .querySelector(".important-btn")
        .addEventListener(
            "click",
            function () {

                toggleImportant(
                    task.id
                );

            }
        );


    // =========================
    // EDIT
    // =========================

    taskElement
        .querySelector(".edit")
        .addEventListener(
            "click",
            function () {

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

            }
        );


    // =========================
    // DELETE
    // =========================

    taskElement
        .querySelector(".delete")
        .addEventListener(
            "click",
            function () {

                deleteTask(
                    task.id
                );

            }
        );


    // =========================
    // SWIPE
    // =========================

    addSwipe(
        taskElement,
        task,
        completeBackground,
        deleteBackground
    );


    return container;

}


// =========================
// TRASH RENDER
// =========================

function renderTrash(tasksInTrash) {

    if (
        tasksInTrash.length === 0
    ) {

        return;

    }


    const title =
        document.createElement("h3");

    title.className =
        "section-title";

    title.textContent =
        "Deleted Tasks";

    taskList.appendChild(
        title
    );


    tasksInTrash.sort(
        function (a, b) {

            return newestFirst
                ? b.id - a.id
                : a.id - b.id;

        }
    );


    tasksInTrash.forEach(
        function (task) {

            const container =
                document.createElement("div");

            container.className =
                "swipe-container";


            container.innerHTML = `

                <div class="task">

                    <div class="task-content">

                        <p>
                            ${escapeHTML(task.text)}

                            ${
                                task.important
                                    ? '<span class="important-star">⭐</span>'
                                    : ""
                            }

                        </p>

                        <span>
                            ${
                                getGroupName(task.group)
                            }
                        </span>

                    </div>


                    <div class="
                        actions
                        trash-actions
                    ">

                        <button
                            class="restore"
                            aria-label="Restore task">
                            ↩️
                        </button>

                        <button
                            class="permanent-delete"
                            aria-label="Delete permanently">
                            🗑️
                        </button>

                    </div>

                </div>
            `;


            const taskElement =
                container.querySelector(
                    ".task"
                );


            taskElement
                .querySelector(".restore")
                .addEventListener(
                    "click",
                    function () {

                        restoreTask(
                            task.id
                        );

                    }
                );


            taskElement
                .querySelector(".permanent-delete")
                .addEventListener(
                    "click",
                    function () {

                        permanentlyDeleteTask(
                            task.id
                        );

                    }
                );


            taskList.appendChild(
                container
            );

        }
    );


    const emptyTrash =
        document.createElement("button");

    emptyTrash.className =
        "empty-trash";

    emptyTrash.textContent =
        "Delete All Permanently";


    emptyTrash.addEventListener(
        "click",
        function () {

            if (
                tasksInTrash.length === 0
            ) {

                return;

            }


            const confirmed =
                confirm(
                    "Delete all deleted tasks permanently?"
                );


            if (!confirmed) {

                return;

            }


            tasks =
                tasks.filter(
                    function (task) {

                        return !task.deleted;

                    }
                );


            saveTasks();

            renderTasks();

        }
    );


    taskList.appendChild(
        emptyTrash
    );

}


// =========================
// GROUP NAME
// =========================

function getGroupName(group) {

    if (!group) {

        return "Unassigned";

    }


    const names = {

        work: "💼 Work",

        study: "📚 Study",

        family: "👨‍👩‍👧 Family",

        personal: "👤 Personal"

    };


    return names[group] || "Unassigned";

}


// =========================
// DELETE TO TRASH
// =========================

function deleteTask(id) {

    const task =
        tasks.find(
            function (item) {

                return item.id === id;

            }
        );


    if (!task) {

        return;

    }


    task.deleted = true;

    saveTasks();

    renderTasks();

}


// =========================
// RESTORE
// =========================

function restoreTask(id) {

    const task =
        tasks.find(
            function (item) {

                return item.id === id;

            }
        );


    if (!task) {

        return;

    }


    task.deleted = false;

    saveTasks();

    renderTasks();

}


// =========================
// PERMANENT DELETE
// =========================

function permanentlyDeleteTask(id) {

    const confirmed =
        confirm(
            "Delete this task permanently?"
        );


    if (!confirmed) {

        return;

    }


    tasks =
        tasks.filter(
            function (task) {

                return task.id !== id;

            }
        );


    saveTasks();

    renderTasks();

}


// =========================
// IMPORTANT
// =========================

function toggleImportant(id) {

    const task =
        tasks.find(
            function (item) {

                return item.id === id;

            }
        );


    if (!task || task.deleted) {

        return;

    }


    if (!task.important) {

        const importantCount =
            tasks.filter(
                function (item) {

                    return (
                        item.important &&
                        !item.deleted
                    );

                }
            ).length;


        if (
            importantCount >= 3
        ) {

            alert(
                "You can have up to 3 important tasks."
            );

            return;

        }

    }


    task.important =
        !task.important;

    saveTasks();

    renderTasks();

}


// =========================
// SWIPE
// =========================

function addSwipe(
    element,
    task,
    completeBackground,
    deleteBackground
) {

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

            currentX =
                startX;

            dragging = true;

            element.style.transition =
                "none";

            completeBackground.style.opacity =
                "0";

            deleteBackground.style.opacity =
                "0";

        },
        {
            passive: true
        }
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

                element.style.transition =
                    "transform 0.22s ease";

                element.style.transform =
                    "translate3d(0,0,0)";

                completeBackground.style.opacity =
                    "0";

                deleteBackground.style.opacity =
                    "0";

                return;

            }


            currentX = x;


            let distance =
                currentX - startX;


            const maxDistance = 125;


            if (
                distance >
                maxDistance
            ) {

                distance =
                    maxDistance;

            }


            if (
                distance <
                -maxDistance
            ) {

                distance =
                    -maxDistance;

            }


            element.style.transform =
                `translate3d(${distance}px,0,0)`;


            if (
                distance > 10
            ) {

                completeBackground.style.opacity =
                    "1";

                deleteBackground.style.opacity =
                    "0";

            }


            else if (
                distance < -10
            ) {

                completeBackground.style.opacity =
                    "0";

                deleteBackground.style.opacity =
                    "1";

            }


            else {

                completeBackground.style.opacity =
                    "0";

                deleteBackground.style.opacity =
                    "0";

            }

        },
        {
            passive: true
        }
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


            if (
                distance > 90
            ) {

                completeBackground.style.opacity =
                    "1";

                deleteBackground.style.opacity =
                    "0";

                element.style.transform =
                    "translate3d(100%,0,0)";


                setTimeout(
                    function () {

                        task.completed =
                            !task.completed;

                        saveTasks();

                        renderTasks();

                    },
                    220
                );


                return;

            }


            if (
                distance < -90
            ) {

                completeBackground.style.opacity =
                    "0";

                deleteBackground.style.opacity =
                    "1";

                element.style.transform =
                    "translate3d(-100%,0,0)";


                setTimeout(
                    function () {

                        deleteTask(
                            task.id
                        );

                    },
                    220
                );


                return;

            }


            element.style.transform =
                "translate3d(0,0,0)";

            completeBackground.style.opacity =
                "0";

            deleteBackground.style.opacity =
                "0";

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

    const visibleTasks =
        getFilteredTasks();


    const total =
        visibleTasks.length;


    const completed =
        visibleTasks.filter(
            function (task) {

                return task.completed;

            }
        ).length;


    if (trashMode) {

        taskCount.textContent =
            `${total} deleted`;

    } else {

        taskCount.textContent =
            `${total} tasks • ${completed} completed`;

    }


    emptyState.style.display =
        total === 0
            ? "block"
            : "none";


    if (trashMode) {

        const title =
            emptyState.querySelector("h2");

        const paragraph =
            emptyState.querySelector("p");


        if (title) {

            title.textContent =
                "Trash is empty";

        }


        if (paragraph) {

            paragraph.textContent =
                "Deleted tasks will appear here.";

        }

    } else {

        const title =
            emptyState.querySelector("h2");

        const paragraph =
            emptyState.querySelector("p");


        if (title) {

            title.textContent =
                "No tasks yet";

        }


        if (paragraph) {

            paragraph.textContent =
                "Add your first task.";

        }

    }

}


// =========================
// ESCAPE HTML
// =========================

function escapeHTML(text) {

    const div =
        document.createElement("div");

    div.textContent =
        text;

    return div.innerHTML;

}


// =========================
// START APP
// =========================

updateWelcome();

updateAddButton();

renderTasks();
