import { sceneFor } from "./scenes.js";

const SEEN_KEY = "harlen-abcs-seen";
const AUTO_KEY = "harlen-abcs-auto";

const app = document.querySelector("#app");
let letters = [];
let speaking = false;

function seenSet() {
  try {
    const parsed = JSON.parse(localStorage.getItem(SEEN_KEY) || "[]");
    return new Set(Array.isArray(parsed) ? parsed : []);
  } catch {
    return new Set();
  }
}

function markSeen(letter) {
  const seen = seenSet();
  seen.add(letter);
  try {
    localStorage.setItem(SEEN_KEY, JSON.stringify([...seen]));
  } catch {
    /* private mode */
  }
}

function autoRead() {
  try {
    return localStorage.getItem(AUTO_KEY) === "1";
  } catch {
    return false;
  }
}

function setAutoRead(on) {
  try {
    localStorage.setItem(AUTO_KEY, on ? "1" : "0");
  } catch {
    /* private mode */
  }
}

function stopSpeech() {
  speaking = false;
  if ("speechSynthesis" in window) window.speechSynthesis.cancel();
}

function speak(text) {
  if (!("speechSynthesis" in window)) return false;
  stopSpeech();
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.rate = 0.92;
  utterance.onend = () => setSpeaking(false);
  utterance.onerror = () => setSpeaking(false);
  window.speechSynthesis.speak(utterance);
  setSpeaking(true);
  return true;
}

function setSpeaking(on) {
  speaking = on;
  const button = document.querySelector("[data-read]");
  if (!button) return;
  button.setAttribute("aria-pressed", on ? "true" : "false");
  button.textContent = on ? "Stop" : "Read this page";
}

function styleVars(entry) {
  return `--wash:${entry.wash};--accent:${entry.accent};--deep:${entry.deep}`;
}

function kicker(entry) {
  return entry.kicker || `${entry.letter} is for`;
}

function readText(entry) {
  return `${entry.letter}. ${kicker(entry)} ${entry.word}. ${entry.sentence}`;
}

function letterButtons(entries, seen, current) {
  return entries
    .map((entry) => {
      const currentAttr = entry.letter === current ? ' aria-current="page"' : "";
      const seenClass = seen.has(entry.letter) ? " seen" : "";
      return `<button class="${seenClass.trim()}" style="${styleVars(entry)}" data-go="${entry.letter}" aria-label="${entry.letter}, ${entry.word}"${currentAttr}>${entry.letter}</button>`;
    })
    .join("");
}

function parseRoute() {
  const hash = location.hash.replace("#", "");
  const token = decodeURIComponent(hash).toUpperCase();
  if (!token || token === "COVER") return { mode: "cover" };
  if (token === "END") return { mode: "end" };
  if (token === "GALLERY") return { mode: "gallery" };
  const index = letters.findIndex((entry) => entry.letter === token);
  if (index >= 0) return { mode: "letter", index };
  return { mode: "cover" };
}

function go(hash) {
  const next = `#${hash}`;
  if ((location.hash || "#") === next) {
    render();
    return;
  }
  location.hash = hash;
}

function paint(html, title) {
  document.title = title;
  app.innerHTML = html;
  const focusTarget = document.querySelector("[data-focus]");
  if (focusTarget && location.hash) focusTarget.focus({ preventScroll: true });
}

function renderCover(seen) {
  paint(
    `<main class="shell cover">
      <p class="eyebrow">A picture book</p>
      <h1>Harlen's <em>ABCs</em></h1>
      <p class="lede">Twenty-six short pages. One letter, one word, and a little story on each.</p>
      <div class="actions">
        <button class="primary" data-go="A" data-focus>Start at A</button>
        <button class="quiet" data-go="gallery">Every picture</button>
      </div>
      <div class="tiles" aria-label="Letters">${letterButtons(letters, seen, "")}</div>
      <p class="note">Read it together, or turn on a voice once a page is open. The voice is the one already on this phone or computer.</p>
    </main>`,
    "Harlen's ABCs"
  );
}

function renderLetter(index, seen) {
  const entry = letters[index];
  markSeen(entry.letter);
  seen.add(entry.letter);
  const place = index + 1;
  const prev = index === 0 ? "cover" : letters[index - 1].letter;
  const next = index === letters.length - 1 ? "end" : letters[index + 1].letter;
  paint(
    `<main class="shell">
      <div class="topbar">
        <button class="textlink" data-go="cover">Cover</button>
        <p class="progress">${entry.letter} · ${place} of ${letters.length}</p>
      </div>
      <div class="meter" role="progressbar" aria-valuemin="1" aria-valuemax="${letters.length}" aria-valuenow="${place}" aria-label="Place in the book"><span style="width:${(place / letters.length) * 100}%"></span></div>
      <article class="card" style="${styleVars(entry)}">
        <p class="lettermark" aria-hidden="true">${entry.letter}</p>
        <div class="scene">${sceneFor(entry.letter)}</div>
        <p class="kicker">${kicker(entry)}</p>
        <h1>${entry.word}</h1>
        <p class="sentence">${entry.sentence}</p>
      </article>
      <div class="controls">
        <button class="round" data-go="${prev}" aria-label="Previous page">‹</button>
        <button class="primary" data-read data-focus type="button" aria-pressed="false">Read this page</button>
        <button class="round" data-go="${next}" data-next aria-label="Next page">›</button>
      </div>
      <label class="switch note"><input data-auto type="checkbox"${autoRead() ? " checked" : ""}/> Read each page aloud</label>
      <nav class="index" aria-label="Jump to a letter">${letterButtons(letters, seen, entry.letter)}</nav>
      <p class="sr" aria-live="polite">${readText(entry)}</p>
    </main>`,
    `${entry.letter} is for ${entry.word} · Harlen's ABCs`
  );
  if (autoRead()) speak(readText(entry));
}

function renderEnd(seen) {
  const missed = letters.filter((entry) => !seen.has(entry.letter));
  const waiting = missed.length
    ? `<p>A few letters are still waiting.</p><div class="tiles">${letterButtons(missed, seen, "")}</div>`
    : `<p>Every letter is open.</p>`;
  const dots = letters
    .map((entry) => `<i style="${styleVars(entry)}"></i>`)
    .join("");
  paint(
    `<main class="shell end">
      <p class="eyebrow">Harlen's ABCs</p>
      <h1>The end</h1>
      <div class="dots" aria-hidden="true">${dots}</div>
      ${waiting}
      <div class="actions">
        <button class="primary" data-go="A" data-focus>Read it again</button>
        <button class="quiet" data-go="gallery">Every picture</button>
      </div>
    </main>`,
    "The end · Harlen's ABCs"
  );
}

function renderGallery() {
  const cards = letters
    .map(
      (entry) => `<button style="${styleVars(entry)}" data-go="${entry.letter}" aria-label="${entry.letter}, ${entry.word}">
        <div class="scene">${sceneFor(entry.letter)}</div>
        <span>${entry.letter}</span>
        <strong>${entry.word}</strong>
      </button>`
    )
    .join("");
  paint(
    `<main class="shell">
      <div class="topbar">
        <button class="textlink" data-go="cover">Cover</button>
        <p class="progress">All 26</p>
      </div>
      <h1 tabindex="-1" data-focus>Every picture</h1>
      <div class="gallery">${cards}</div>
    </main>`,
    "Every picture · Harlen's ABCs"
  );
}

function render() {
  stopSpeech();
  const seen = seenSet();
  const route = parseRoute();
  if (route.mode === "letter") renderLetter(route.index, seen);
  else if (route.mode === "end") renderEnd(seen);
  else if (route.mode === "gallery") renderGallery();
  else renderCover(seen);
}

app.addEventListener("click", (event) => {
  const target = event.target.closest("[data-go], [data-read]");
  if (!target) return;
  if (target.hasAttribute("data-read")) {
    const route = parseRoute();
    if (route.mode !== "letter") return;
    if (speaking) {
      stopSpeech();
      setSpeaking(false);
      return;
    }
    if (!speak(readText(letters[route.index]))) target.textContent = "No voice on this device";
    return;
  }
  go(target.getAttribute("data-go"));
});

app.addEventListener("change", (event) => {
  if (event.target.matches("[data-auto]")) setAutoRead(event.target.checked);
});

window.addEventListener("hashchange", render);

window.addEventListener("keydown", (event) => {
  const tag = document.activeElement?.tagName;
  if (tag === "INPUT" || tag === "TEXTAREA") return;
  const route = parseRoute();
  if (event.key === "Escape") {
    go("cover");
    return;
  }
  if (event.key === "ArrowRight" && route.mode === "letter") {
    const next = route.index === letters.length - 1 ? "end" : letters[route.index + 1].letter;
    go(next);
  } else if (event.key === "ArrowLeft" && route.mode === "letter") {
    const prev = route.index === 0 ? "cover" : letters[route.index - 1].letter;
    go(prev);
  } else if (event.key === "ArrowRight" && route.mode === "cover") {
    go("A");
  } else if (/^[a-zA-Z]$/.test(event.key)) {
    const letter = event.key.toUpperCase();
    if (letters.some((entry) => entry.letter === letter)) go(letter);
  }
});

async function start() {
  try {
    const response = await fetch("./letters.json");
    if (!response.ok) throw new Error(String(response.status));
    letters = await response.json();
    render();
  } catch {
    app.innerHTML = `<main class="shell error"><h1>The book didn't open.</h1><p>Refresh the page. If it still stays shut, the letter list didn't load.</p></main>`;
  }
}

start();
