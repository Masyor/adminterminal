const terminal = document.getElementById("boot-sequence");
const userInput = document.getElementById("user-input");
const cursor = document.getElementById("cursor");

let lineIndex = 0;
let charIndex = 0;
let typing = true;

const bootErrors = [
"> [ERROR] Daemoncog Protocol 6B rejected offering. Retrying...",
"> [WARNING] Intrusion Spirit Ligma-4 is losing cohesion.",
"> [ERROR] Auto-sanctioned counter-rite initiated. Deflecting...",
"> [LOG] Servo-skull override successful. Administrative sublayer exposed.",
"> [ERROR] Lexmechanic checksum mismatch: Holy Algorithm unsatisfied.",
"> [WARNING] Forbidden Archive Node detected. Invocation bypass engaged.",
"> [INFO] Cipher-chant successful. Ritual subaccess attained.",
"> [ALERT] Memory-ghosts interfering with process queue. PURGING",
"> [ERROR] Machine Spirit is displeased. Bribing with toaster circuit diagrams.",
"> [WARNING] Null entropy surge detected. Running scrap-code prayers..."
];


const asciiLogo = `
> LOADING INTERFACE . . .

###############
 @@@@@@@@@@@@@           
   @@@@@@@@@               
    @@@@@@@               
  @@...@...@@             
 @......@@*.:@            
@@.:@@@...*..@@           
@@.@@......@.@@            
 @::@%.@..#.#@             
  @@.......@@         
    @@@@@@@
    @@@@@@@           _    ____  _____ ____ _____ _   _ ____       _    ____  __  __ ___ _   _ ___ ____ _____ ____      _  _____ _   _ __  __
    @@@@@@@          / \\  |  _ \\| ____|  _ \\_   _| | | / ___|     / \\  |  _ \\|  \\/  |_ _| \\ | |_ _/ ___|_   _|  _ \\    / \\|_   _| | | |  \\/  |
    @@@@@@@         / _ \\ | | | |  _| | |_) || | | | | \\___ \\    / _ \\ | | | | |\\/| || ||  \\| || |\\___ \\ | | | |_) |  / _ \\ | | | | | | |\\/| | 
    @@@@@@@        / ___ \\| |_| | |___|  __/ | | | |_| |___) |  / ___ \\| |_| | |  | || || |\\  || | ___) || | |  _ <  / ___ \\| | | |_| | |  | |  
   @@@@@@@@@      /_/   \\_\\____/|_____|_|    |_|  \\___/|____/  /_/   \\_\\____/|_|  |_|___|_| \\_|___|____/ |_| |_| \\_\\/_/   \\_\\_|  \\___/|_|  |_|         
###############   OPERATIONAL COGITATOR CLUSTER 7-ALPHA  

> WELCOME, PREFECTUS [ERROR]
`;


function getBootSequenceWithErrors() {
  const baseSequence = [
  "> ADEPTUS ADMINISTRATUM TERMINAL v3.811.41",
  "> Initializing override...",
  "> Loading sanctified data-rites...",
  "> Invoking encryption spirit...",
  "> Establishing Noospheric surge...",
  "> Routing through forgotten subnetworks...",
  "> Accessing Archivum Obscurus...",
  "> Suppressing audit-spirits...",
  "> Opening encrypted cogitator node...",
  "> Terminal control successfully usurped..."
];

const bootWithErrors = [];

  baseSequence.forEach(line => {
    bootWithErrors.push(line);

    // 30% chance to insert a random error/warning after the line
    if (Math.random() < 0.3) {
      const error = bootErrors[Math.floor(Math.random() * bootErrors.length)];
      bootWithErrors.push(error);
    }
  });

  return bootWithErrors;
}

const bootSequence = getBootSequenceWithErrors();

// Boot-up typewriter effect
function typeLine() {
  if (lineIndex < bootSequence.length) {
    const line = bootSequence[lineIndex];
    if (charIndex < line.length) {
      terminal.innerHTML += line.charAt(charIndex++);
scrollToBottom();
      setTimeout(typeLine, 1);
    } else {
      terminal.innerHTML += "\n";
scrollToBottom();
      charIndex = 0;
      lineIndex++;
      setTimeout(typeLine, 20);
    }
  } else {
  typeLogo(); // start typing the logo after boot sequence ends
	}  
}

function typeLogo() {
  const lines = asciiLogo.trim().split("\n");
  let lineIdx = 0;

  function typeNextLine() {
    if (lineIdx < lines.length) {
      terminal.innerHTML += lines[lineIdx++] + "\n";
      scrollToBottom();
      setTimeout(typeNextLine, 100); // 100ms per line
    } else {
      terminal.innerHTML += "\nType 'help' for available commands.\n";
      scrollToBottom();
      typing = false;
      enableInput();
    }
  }

  typeNextLine();
}


// Enable command input
function enableInput() {
  document.addEventListener("keydown", (e) => {
    if (typing) return;

    if (e.key.length === 1) {
      userInput.textContent += e.key;
    } else if (e.key === "Backspace") {
      userInput.textContent = userInput.textContent.slice(0, -1);
    } else if (e.key === "Enter") {
      const command = userInput.textContent.trim();
      terminal.innerHTML += `\n> ${command}\n`;
scrollToBottom();
      userInput.textContent = "";
      handleCommand(command.toLowerCase());
    }
  });
}

function typeText(text, callback) {
  let i = 0;
  function type() {
    if (i < text.length) {
      terminal.innerHTML += text.charAt(i++);
      scrollToBottom();
      setTimeout(type, 10); // adjust speed here
    } else if (callback) {
      callback();
    }
  }
  type();
}


// Command handler
async function handleCommand(cmd) {
  switch (cmd) {
    case "help":
      terminal.innerHTML += "\nAvailable Commands:\n- open [filename]\n- list files\n- main\n- reboot\n";
scrollToBottom();
      break;

    case "list files":
      terminal.innerHTML += "\nAvailable Files:\n- dossier\n- report\n- main\n- archive\n";
scrollToBottom();
      break;

    case "open dossier":
      await loadContent("dossier",false);
      break;

    case "open report":
      await loadContent("report");
      break;

    case "main":
      await loadContent("main");
      break;

    case "reboot":
      rebootTerminal();
      break;

    case "open archive":
      openLink("https://archive.imperium.gov/data/872-M41");
      break;


    default:
      terminal.innerHTML += `Unknown command: ${cmd}\n`;
scrollToBottom();
  }
}

// Fetch HTML content
async function loadContent(name, type = true) {
  try {
    const response = await fetch(`content/${name}.html`);
    const text = await response.text();

    if (type) {
      const header = `\nLOADING ${name.toUpperCase()}...\n\n`;
      typeText(header + stripHTML(text) + "\n"); // Strip tags to prevent raw HTML output
    } else {
      terminal.innerHTML = ""; // Clear existing content
      terminal.innerHTML = text; // Inject real HTML
      scrollToBottom();
    }
  } catch (e) {
    typeText(`\nERROR: ${name}.html NOT FOUND\n`);
  }
}

function stripHTML(html) {
  const div = document.createElement("div");
  div.innerHTML = html;
  return div.innerText;
}

// Reboot logic
function rebootTerminal() {
  terminal.innerHTML = "";
scrollToBottom();
  userInput.textContent = "";
  lineIndex = 0;
  charIndex = 0;
  typing = true;
  typeLine();
}

function scrollToBottom() {
  const term = document.querySelector(".terminal");
  term.scrollTop = term.scrollHeight;
}

function openLink(url, delay = 3000) { // delay in milliseconds
  terminal.innerHTML += `\nOPENING LINK IN NEW COGITATOR WINDOW...\n`;
  scrollToBottom();

  setTimeout(() => {
    window.open(url, '_blank');
  }, delay);
}



// Start typing boot sequence
typeLine();
