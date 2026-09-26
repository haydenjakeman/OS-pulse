let windows = {};
let windowNumber = 100;


/* =========================
   START PULSE OS
========================= */

window.addEventListener("load", function () {

    setTimeout(function () {

        const boot = document.getElementById("boot");
        const desktop = document.getElementById("desktop");

        if (boot) {
            boot.style.display = "none";
        }

        if (desktop) {
            desktop.style.display = "block";
        }

    }, 1800);

});


/* =========================
   START MENU
========================= */

function toggleLauncher() {

    const launcher = document.getElementById("launcher");

    if (launcher.style.display === "block") {
        launcher.style.display = "none";
    } else {
        launcher.style.display = "block";
    }

}


/* =========================
   CREATE WINDOWS
========================= */

function createWindow(name, title, icon, content) {

    if (windows[name]) {

        windows[name].style.zIndex = ++windowNumber;

        return;

    }

    const win = document.createElement("div");

    win.className = "window";

    win.style.zIndex = ++windowNumber;

    win.innerHTML = `

        <div class="titlebar">

            <span>${icon}</span>

            <b>${title}</b>

            <button class="close">×</button>

        </div>

        <div class="windowBody">

            ${content}

        </div>

    `;


    document
        .getElementById("windows")
        .appendChild(win);


    windows[name] = win;


    /* CLOSE BUTTON */

    win.querySelector(".close").onclick = function () {

        win.remove();

        delete windows[name];

        const task =
            document.querySelector(
                '[data-task="' + name + '"]'
            );

        if (task) {
            task.remove();
        }

    };


    /* TASKBAR BUTTON */

    const task =
        document.createElement("button");

    task.className = "task";

    task.dataset.task = name;

    task.innerHTML =
        icon + " " + title;


    task.onclick = function () {

        win.style.zIndex = ++windowNumber;

    };


    document
        .getElementById("tasks")
        .appendChild(task);

}


/* =========================
   BROWSER
========================= */

function openBrowser() {

    toggleLauncher();

    createWindow(

        "browser",

        "Pulse Browser",

        "🌐",

        `

        <div class="browserBar">

            <input
                id="browserAddress"
                value="https://www.google.com"
                placeholder="Search Google or enter a website..."
            >

            <button onclick="goBrowser()">
                Go
            </button>

        </div>


        <iframe
            id="browserFrame"
            class="browserFrame"
            src="https://www.google.com"
        ></iframe>

        `

    );

}


/* =========================
   BROWSER SEARCH
========================= */

function goBrowser() {

    const input =
        document.getElementById(
            "browserAddress"
        );

    if (!input) return;


    let address =
        input.value.trim();


    if (
        !address.startsWith("http://") &&
        !address.startsWith("https://")
    ) {

        address =
            "https://www.google.com/search?q=" +
            encodeURIComponent(address);

    }


    const frame =
        document.getElementById(
            "browserFrame"
        );

    if (frame) {
        frame.src = address;
    }

}


/* =========================
   FILE MANAGER
========================= */

function openFiles() {

    toggleLauncher();

    createWindow(

        "files",

        "Files",

        "📁",

        `

        <h2>📁 Pulse Files</h2>

        <p>
            Welcome to your Pulse OS file manager.
        </p>

        <div class="file">
            📄 Welcome.txt
        </div>

        <div class="file">
            📁 Downloads
        </div>

        <br>

        <button
            class="primary"
            onclick="createTestFile()">

            Create Test File

        </button>

        `

    );

}


/* =========================
   CREATE DOWNLOAD
========================= */

function createTestFile() {

    const text =
        "Welcome to Pulse OS!";

    const blob =
        new Blob(
            [text],
            {
                type: "text/plain"
            }
        );


    const url =
        URL.createObjectURL(blob);


    const link =
        document.createElement("a");


    link.href = url;

    link.download =
        "Pulse-Welcome.txt";


    document.body.appendChild(link);

    link.click();

    document.body.removeChild(link);


    URL.revokeObjectURL(url);

}


/* =========================
   APP STORE
========================= */

function openStore() {

    toggleLauncher();

    createWindow(

        "store",

        "Pulse App Store",

        "🛍️",

        `

        <h2>🛍️ Pulse App Store</h2>

        <p>
            Download and open apps for Pulse OS.
        </p>


        <div class="storeItem">

            🧮

            <div>

                <b>Calculator</b>

                <br>

                <small>
                    A simple calculator.
                </small>

            </div>

            <button
                class="primary"
                onclick="openCalculator()">

                Open

            </button>

        </div>


        <div class="storeItem">

            📝

            <div>

                <b>Notes</b>

                <br>

                <small>
                    Write and save notes.
                </small>

            </div>

            <button
                class="primary"
                onclick="openNotes()">

                Open

            </button>

        </div>


        `

    );

}


/* =========================
   CALCULATOR
========================= */

function openCalculator() {

    createWindow(

        "calculator",

        "Calculator",

        "🧮",

        `

        <input
            id="calcInput"
            style="
                width:100%;
                padding:15px;
                background:#20222c;
                color:white;
                border:1px solid #444;
                border-radius:10px;
                font-size:22px;
            "
            placeholder="Example: 25 + 25"
        >

        <br><br>

        <button
            class="primary"
            onclick="calculate()">

            Calculate

        </button>

        <h2 id="calcResult"></h2>

        `

    );

}


function calculate() {

    const input =
        document.getElementById(
            "calcInput"
        );

    const result =
        document.getElementById(
            "calcResult"
        );


    try {

        result.textContent =
            Function(
                '"use strict"; return (' +
                input.value +
                ')'
            )();

    } catch {

        result.textContent =
            "Invalid calculation";

    }

}


/* =========================
   NOTES
========================= */

function openNotes() {

    createWindow(

        "notes",

        "Notes",

        "📝",

        `

        <h2>📝 Notes</h2>

        <textarea
            id="notesArea"
            style="
                width:100%;
                height:300px;
                background:#20222c;
                color:white;
                border:1px solid #444;
                border-radius:10px;
                padding:15px;
                resize:none;
            "
            placeholder="Write something..."
        ></textarea>

        <br><br>

        <button
            class="primary"
            onclick="saveNotes()">

            Save Notes

        </button>

        `

    );


    const saved =
        localStorage.getItem(
            "pulseNotes"
        );


    if (saved) {

        document.getElementById(
            "notesArea"
        ).value = saved;

    }

}


function saveNotes() {

    const text =
        document.getElementById(
            "notesArea"
        ).value;


    localStorage.setItem(
        "pulseNotes",
        text
    );


    alert("Notes saved!");

}


/* =========================
   SETTINGS
========================= */

function openSettings() {

    toggleLauncher();

    createWindow(

        "settings",

        "Settings",

        "⚙️",

        `

        <h2>⚙️ Settings</h2>


        <div class="setting">

            <span>
                Change wallpaper
            </span>

            <button
                class="primary"
                onclick="changeWallpaper()">

                Change

            </button>

        </div>


        <div class="setting">

            <span>
                Restart Pulse OS
            </span>

            <button
                class="primary"
                onclick="location.reload()">

                Restart

            </button>

        </div>

        `

    );

}


/* =========================
   CHANGE WALLPAPER
========================= */

function changeWallpaper() {

    document.getElementById(
        "wallpaper"
    ).style.background =
        "linear-gradient(135deg,#35115e,#063f54,#080910)";

}


/* =========================
   ABOUT
========================= */

function openAbout() {

    toggleLauncher();

    createWindow(

        "about",

        "About Pulse OS",

        "💻",

        `

        <h1>Pulse OS</h1>

        <h3>Version 1.0</h3>

        <p>
            A browser-based operating system
            built with HTML, CSS and JavaScript.
        </p>

        <p>
            Made to run through GitHub Pages.
        </p>

        `

    );

}


/* =========================
   CLOCK
========================= */

function updateClock() {

    const clock =
        document.getElementById(
            "clock"
        );


    if (!clock) return;


    const now =
        new Date();


    clock.textContent =
        now.toLocaleTimeString(
            [],
            {
                hour: "2-digit",
                minute: "2-digit"
            }
        );

}


setInterval(
    updateClock,
    1000
);

updateClock();


/* =========================
   APP SEARCH
========================= */

const search =
    document.getElementById(
        "searchApps"
    );


if (search) {

    search.addEventListener(
        "input",
        function () {

            const value =
                this.value.toLowerCase();


            document
                .querySelectorAll(
                    ".apps button"
                )
                .forEach(function (button) {

                    if (
                        button.textContent
                            .toLowerCase()
                            .includes(value)
                    ) {

                        button.style.display =
                            "block";

                    } else {

                        button.style.display =
                            "none";

                    }

                });

        }
    );

}
