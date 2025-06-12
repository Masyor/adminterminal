const terminal = document.getElementById("boot-sequence");
const userInput = document.getElementById("user-input");
const cursor = document.getElementById("cursor");

let lineIndex = 0;
let charIndex = 0;
let typing = true;

const bootErrors = [
"> [ERROR] Daemoncog Protocol 6B rejected bribe. Retrying...",
"> [WARNING] Intrusion Spirit Ligma-4 is losing cohesion.",
"> [ERROR] Auto-sanctioned counter-rite initiated. Deflecting...",
"> [LOG] Cogitator override successful. Administrative sublayer exposed.",
"> [ERROR] Lexmechanic checksum mismatch: Holy Algorithm unsatisfied.",
"> [WARNING] Forbidden Archive Node detected. Invocation bypass engaged.",
"> [INFO] Cipher-chant successful. Ritual subaccess attained.",
"> [ALERT] Memory-ghosts interfering with process queue. PURGING",
"> [ERROR] Machine Spirit is displeased. Bribing with toaster picts.",
"> [WARNING] Null entropy surge detected. Running scrap-code prayers..."
];

const simpleLogo = `
> LOADING INTERFACE . . .
> ADEPTUS ADMINISTRATUM OPERATIONAL COGITATOR CLUSTER 7-ALPHA ONLINE.
`;


const asciiLogo = `
> LOADING INTERFACE . . .

###############
 @@@@@@@@@@@@@           
   @@@@@@@@@               
    @@@@@@@               
  @@...@...@@             
 @......@@*.:@            
@@.:@@@...*..@@        _    ____  _____ ____ _____ _   _ ____   
@@.@@......@.@@       / \\  |  _ \\| ____|  _ \\_   _| | | / ___|    
 @::@%.@..#.#@       / _ \\ | | | |  _| | |_) || | | | | \\___ \\      
  @@.......@@       / ___ \\| |_| | |___|  __/ | | | |_| |___) |  
    @@@@@@@        /_/   \\_\\____/|_____|_|    |_|  \\___/|____/
    @@@@@@@            _    ____  __  __ ___ _   _ ___ ____ _____ ____      _  _____ _   _ __  __
    @@@@@@@           / \\  |  _ \\|  \\/  |_ _| \\ | |_ _/ ___|_   _|  _ \\    / \\|_   _| | | |  \\/  |
    @@@@@@@          / _ \\ | | | | |\\/| || ||  \\| || |\\___ \\ | | | |_) |  / _ \\ | | | | | | |\\/| | 
    @@@@@@@         / ___ \\| |_| | |  | || || |\\  || | ___) || | |  _ <  / ___ \\| | | |_| | |  | |  
   @@@@@@@@@       /_/   \\_\\____/|_|  |_|___|_| \\_|___|____/ |_| |_| \\_\\/_/   \\_\\_|  \\___/|_|  |_|         
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
  const isMobile = window.innerWidth < 1000;

  if (isMobile) {
    typeText(simpleLogo, () => {
      terminal.innerHTML += "\nType 'help' for available commands.\n";
      scrollToBottom();
      typing = false;
      enableInput();
    });
  } else {
    const lines = asciiLogo.trim().split("\n");
    typeLines(lines, {
      delay: 100,
      callback: () => {
        terminal.innerHTML += "\nType 'help' for available commands.\n";
        scrollToBottom();
        typing = false;
        enableInput();
      }
    });
  }
}



function typeLines(lines, options = {}) {
  const {
    delay = 100,
    callback = null,
    isHTML = false
  } = options;

  let index = 0;

  function typeNext() {
    if (index < lines.length) {
      if (isHTML && lines[index] instanceof HTMLElement) {
        terminal.appendChild(lines[index]);
      } else {
        terminal.innerHTML += lines[index];
      }
      terminal.innerHTML += "\n";
      scrollToBottom();
      index++;
      setTimeout(typeNext, delay);
    } else if (callback) {
      callback();
    }
  }

  typeNext();
}


// Enable command input
let inputEnabled = false;

async function handleKeydown(e) {
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
}

function enableInput() {
  if (inputEnabled) return; // 🛡 Prevent multiple listeners
  inputEnabled = true;
  document.addEventListener("keydown", handleKeydown);
}

function disableInput() {
  document.removeEventListener("keydown", handleKeydown);
  inputEnabled = false;
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
  const tokens = cmd.trim().split(/\s+/);

  if (tokens[0] === "open" && tokens.length === 3) {
    const folder = tokens[1].toLowerCase();
    const filename = tokens[2];
    const validFolders = ["dossier", "report", "info"];

    if (!validFolders.includes(folder)) {
      terminal.innerHTML += `\nERROR: Unknown type '${folder}'. Valid types are: dossier, report, info.\n`;
      scrollToBottom();
      return;
    }

    await loadContent(`${folder}/${filename}`, true, folder); // pass folder for error message
    return;
  }

  // Fallback for old/simple commands
  switch (cmd) {
    case "help":
      terminal.innerHTML += "\nAvailable Commands:\n- open [folder] [filename]\n- list files\n- main\n- reboot\n";
      scrollToBottom();
      break;

    case "list files":
      terminal.innerHTML += "\nAvailable Files:\n- dossier\n- report\n- info\n- main\n- archive\n";
      scrollToBottom();
      break;

    case "open archive":
      openLink("https://archive.imperium.gov/data/872-M41");
      break;

    case "main":
      await loadContent("main");
      break;

    case "reboot":
      rebootTerminal();
      break;

    default:
      terminal.innerHTML += `Unknown command: ${cmd}\n`;
      scrollToBottom();
  }
}

// Fetch HTML content
async function loadContent(name, type = true, folderName = null) {
  try {
    const response = await fetch(`content/${name}.html`);
    const html = await response.text();
    const header = `\nLOADING ${name.toUpperCase()}...\n\n`;

    setTimeout(() => {
      typeText(header, () => {
        if (type) {
          const tempDiv = document.createElement("div");
          tempDiv.innerHTML = html;
          const lines = extractDisplayLines(tempDiv);
          typeLines(lines, { isHTML: true, delay: 100, callback: enableInput });
        } else {
          const lines = stripHTML(html).split("\n");
          typeLines(lines, { delay: 100, callback: enableInput });
        }
      });
    }, 1000);
  } catch (e) {
    typeText(
  `\nERROR: ${name.split("/").pop()}.html NOT FOUND in ${folderName || 'content'}\n` +
  (folderName ? `SUGGESTION: Type 'list ${folderName}s' to view available entries.\n` : ""),
  enableInput
);
  }
}

function extractDisplayLines(container) {
  const lines = [];

  container.childNodes.forEach(node => {
    if (node.nodeType === Node.TEXT_NODE) {
      const textLines = node.textContent.split("\n");
      textLines.forEach(line => {
        const span = document.createElement("span");
        span.textContent = line;
        lines.push(span);
      });
    } else if (node.nodeType === Node.ELEMENT_NODE) {
      lines.push(node);
    }
  });

  return lines;
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
