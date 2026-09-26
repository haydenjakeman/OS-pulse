let windows = {};
let windowNumber = 0;

/* BOOT */

setTimeout(() => {

  document.getElementById("boot").style.display = "none";
  document.getElementById("desktop").style.display = "block";

}, 1800);


/* LAUNCHER */

function toggleLauncher() {

  const launcher = document.getElementById("launcher");

  launcher.style.display =
    launcher.style.display === "block"
      ? "none"
      : "block";

}


/* WINDOW SYSTEM */

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

  document.getElementById("windows").appendChild(win);

  windows[name] = win;

  win.querySelector(".close").onclick = () => {

    win.remove();

    delete windows[name];

    const task = document.querySelector(
      `[data-task="${name}"]`
    );

    if (task) task.remove();

  };

  const task = document.createElement("button");

  task.className = "task";

  task.dataset.task = name;

  task.innerHTML = `${icon} ${title}`;

  task.onclick = () => {

    win.style.zIndex = ++windowNumber;

  };

  document.getElementById("tasks").appendChild(task);

}


/* BROWSER */

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


/* BROWSER NAVIGATION */

function goBrowser() {

  const input =
    document.getElementById("browserAddress");

  let address = input.value.trim();

  if (!address.startsWith("http://") &&
      !address.startsWith("https://")) {

    address =
      "https://www.google.com/search?q=" +
      encodeURIComponent(address);

  }

  document.getElementById("browserFrame").src =
    address;

}


/* FILE MANAGER */

function openFiles() {

  toggleLauncher();

  createWindow(
    "files",
    "Files",
    "📁",

    `

    <h2>Pulse Files</h2>

    <p>
      Files created by Pulse OS are stored in this
      browser's local storage.
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

      Create test file

    </button>

    `

  );

}


function createTestFile() {

  const blob =
    new Blob(
      ["Welcome to Pulse OS!"],
      {type:"text/plain"}
    );

  const url =
    URL.createObjectURL(blob);

  const a =
    document.createElement("a");

  a.href = url;

  a.download =
    "Pulse-Welcome.txt";

  a.click();

  URL.revokeObjectURL(url);

}


/* APP STORE */

function openStore() {

  toggleLauncher();

  createWindow(
    "store",
    "Pulse App Store",
    "🛍️",

    `

    <h2>Pulse App Store</h2>

    <p>
      Web apps you can launch inside Pulse OS.
    </p>

    <div class="storeItem">

      🧮

      <div>
        <b>Calculator</b>
        <br>
        <small>Simple calculator</small>
      </div>

      <button
        class="primary"
        onclick="alert('Calculator coming soon!')">

        Open

      </button>

    </div>

    <div class="storeItem">

      📝

      <div>
        <b>Notes</b>
        <br>
        <small>Write notes</small>
      </div>

      <button
        class="primary"
        onclick="alert('Notes coming soon!')">

        Open

      </button>

    </div>

    <div class="storeItem">

      🎨

      <div>
        <b>Paint</b>
        <br>
        <small>Draw pictures</small>
      </div>

      <button
        class="primary"
        onclick="alert('Paint coming soon!')">

        Open

      </button>

    </div>

    `

  );

}


/* SETTINGS */

function openSettings() {

  toggleLauncher();

  createWindow(
    "settings",
    "Settings",
    "⚙️",

    `

    <h2>Settings</h2>

    <div class="setting">

      <span>Dark Mode</span>

      <button
        class="primary"
        onclick="toggleDark()">

        Toggle

      </button>

    </div>

    <div class="setting">

      <span>Change wallpaper</span>

      <button
        class="primary"
        onclick="changeWallpaper()">

        Change

      </button>

    </div>

    <div class="setting">

      <span>Reset Pulse OS</span>

      <button
        class="primary"
        onclick="location.reload()">

        Restart

      </button>

    </div>

    `

  );

}


/* WALLPAPER */

function changeWallpaper() {

  document.getElementById("wallpaper").style.background =
    "linear-gradient(135deg,#30135e,#053d52,#111)";

}


/* ABOUT */

function openAbout() {

  toggleLauncher();

  createWindow(
    "about",
    "About Pulse OS",
    "💻",

    `

    <h1>Pulse OS</h1>

    <p>
      Version 1.0
    </p>

    <p>
      A browser-based operating system
      made with HTML, CSS and JavaScript.
    </p>

    <p>
      This project is designed to run on
      GitHub Pages.
    </p>

    `

  );

}


/* CLOCK */

function updateClock() {

  const now = new Date();

  document.getElementById("clock")
    .textContent =
    now.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit"
    });

}

setInterval(updateClock, 1000);

updateClock();


/* APP SEARCH */

document
  .getElementById("searchApps")
  .addEventListener("input", function() {

    const search =
      this.value.toLowerCase();

    document
      .querySelectorAll(".apps button")
      .forEach(button => {

        button.style.display =
          button.textContent
            .toLowerCase()
            .includes(search)
              ? "block"
              : "none";

      });

  });
