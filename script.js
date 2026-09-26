let windows = {};
let windowLevel = 100;


/* =========================
   START PULSE OS
========================= */

window.addEventListener("load", function () {

    setTimeout(function () {

        document.getElementById("boot").style.display = "none";

        document.getElementById("desktop").style.display = "block";

    }, 2000);

});


/* =========================
   START MENU
========================= */

function toggleStart() {

    const menu =
        document.getElementById("startMenu");

    if (menu.style.display === "block") {

        menu.style.display = "none";

    } else {

        menu.style.display = "block";

    }

}


/* =========================
   WINDOW CREATOR
========================= */

function createWindow(
    name,
    title,
    icon,
    content
) {

    if (windows[name]) {

        windows[name].style.zIndex =
            ++windowLevel;

        return;

    }


    const win =
        document.createElement("div");


    win.className = "window";

    win.style.zIndex =
        ++windowLevel;


    win.innerHTML = `

        <div class="titlebar">

            <span>${icon}</span>

            <b>${title}</b>

            <button class="close">
                ×
            </button>

        </div>

        <div class="windowBody">

            ${content}

        </div>

    `;


    document
        .getElementById("windows")
        .appendChild(win);


    windows[name] = win;


    win.querySelector(".close")
        .onclick = function () {

            win.remove();

            delete windows[name];


            const task =
                document.querySelector(
                    '[data-task="' +
                    name +
                    '"]'
                );


            if (task) {
                task.remove();
            }

        };


    const task =
        document.createElement("button");


    task.className = "task";

    task.dataset.task = name;

    task.textContent =
        icon + " " + title;


    task.onclick = function () {

        win.style.zIndex =
            ++windowLevel;

    };


    document
        .getElementById("tasks")
        .appendChild(task);

}


/* =========================
   BROWSER
========================= */

function openBrowser() {

    toggleStart();


    createWindow(

        "browser",

        "Pulse Browser",

        "🌐",

        `

        <div class="browserBar">

            <input
                id="address"
                value="https://www.google.com"
                placeholder="Search Google..."
            >

            <button onclick="go()">
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


function go() {

    const input =
        document.getElementById("address");

    if (!input) return;


    let address =
        input.value.trim();


    if (
        !address.startsWith("https://") &&
        !address.startsWith("http://")
    ) {

        address =
            "https://www.google.com/search?q=" +
            encodeURIComponent(address);

    }


    document
        .getElementById("browserFrame")
        .src = address;

}


/* =========================
   FILES
========================= */

function openFiles() {

    toggleStart();


    createWindow(

        "files",

        "Files",

        "📁",

        `

        <h2>📁 Pulse Files</h2>

        <div class="file">
            📄 Welcome.txt
        </div>

        <div class="file">
            📁 Downloads
        </div>

        <br>

        <button
            class="primary"
            onclick="downloadTest()">

            Create Test File

        </button>

        `

    );

}


function downloadTest() {

    const blob =
        new Blob(
            ["Welcome to Pulse OS!"],
            {
                type:
                    "text/plain"
            }
        );


    const url =
        URL.createObjectURL(blob);


    const link =
        document.createElement("a");


    link.href = url;

    link.download =
        "Pulse-Welcome.txt";


    link.click();


    URL.revokeObjectURL(url);

}


/* =========================
   APP STORE
========================= */

function openStore() {

    toggleStart();


    createWindow(

        "store",

        "Pulse App Store",

        "🛍️",

        `

        <h2>🛍️ Pulse App Store</h2>

        <div class="storeItem">

            🧮

            <div>

                <b>Calculator</b>

                <br>

                <small>
                    Calculator app
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
                    Notes app
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
            id="calculatorInput"
            style="
                width:100%;
                padding:15px;
                background:#20222d;
                color:white;
                border:1px solid #444;
                border-radius:10px;
                font-size:20px;
            "
            placeholder="Example: 10 + 5"
        >

        <br><br>

        <button
            class="primary"
            onclick="calculate()">

            Calculate

        </button>

        <h2 id="calculatorResult"></h2>

        `

    );

}


function calculate() {

    const input =
        document.getElementById(
            "calculatorInput"
        );

    const result =
        document.getElementById(
            "calculatorResult"
        );


    try {

        result.textContent =
            Function(
                '"use strict";return (' +
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
            id="notes"
            style="
                width:100%;
                height:300px;
                background:#20222d;
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

            Save

        </button>

        `

    );


    const saved =
        localStorage.getItem(
            "pulseNotes"
        );


    if (saved) {

        document.getElementById(
            "notes"
        ).value = saved;

    }

}


function saveNotes() {

    localStorage.setItem(

        "pulseNotes",

        document.getElementById(
            "notes"
        ).value

    );

    alert("Saved!");

}


/* =========================
   SETTINGS
========================= */

function openSettings() {

    toggleStart();


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


function changeWallpaper() {

    document.querySelector(
        ".background"
    ).style.background =
        "linear-gradient(135deg,#38105d,#06445a,#08090f)";

}


/* =========================
   ABOUT
========================= */

function openAbout() {

    toggleStart();


    createWindow(

        "about",

        "About Pulse OS",

        "💻",

        `

        <h1>Pulse OS</h1>

        <h3>Version 1.0</h3>

        <p>
            A browser-based operating system.
        </p>

        <p>
            Built using HTML, CSS and JavaScript.
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


    clock.textContent =
        new Date().toLocaleTimeString(
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
        "appSearch"
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
                .forEach(
                    function(button) {

                        button.style.display =
                            button.textContent
                                .toLowerCase()
                                .includes(value)
                                ? "block"
                                : "none";

                    }
                );

        }
    );

}
