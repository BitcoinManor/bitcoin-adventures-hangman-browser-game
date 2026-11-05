// ---- Settings ----
const MAX_MISSES = 6;
const ALPHABET = "abcdefghijklmnopqrstuvwxyz".split("");

// ---- Grab the parts of the page we update ----
const bubbleEl = document.getElementById("bubble");
const coinsEl = document.getElementById("coins");
const wordEl = document.getElementById("word");
const hintEl = document.getElementById("hint");
const keyboardEl = document.getElementById("keyboard");
const playAgainEl = document.getElementById("play-again");

// ---- Game state ----
let current = null;      // the word object we're guessing
let guessed = new Set(); // letters the player has tried
let misses = 0;
let gameOver = false;

// What the character says
const LINES = {
  start: ["Hi friend! Can you guess my Bitcoin word?", "Ready for a new word? Let's go!", "Here's a tricky one. You can do it!"],
  right: ["Nice one!", "Yes! That letter is in there!", "Great guess!", "You're stacking letters like sats!"],
  wrong: ["Oops, not that one.", "Uh oh, a coin rolled away!", "Hmm, try another letter.", "Not quite. Keep going!"]
};

function pick(list) {
  return list[Math.floor(Math.random() * list.length)];
}

// Show a new line in the speech bubble, with a little pop animation
function say(text) {
  bubbleEl.textContent = text;
  bubbleEl.style.animation = "none";
  void bubbleEl.offsetWidth; // restart the animation
  bubbleEl.style.animation = "";
}

function startGame() {
  let next = pick(WORDS);
  // Avoid the same word twice in a row
  while (WORDS.length > 1 && current && next.word === current.word) {
    next = pick(WORDS);
  }
  current = next;
  guessed = new Set();
  misses = 0;
  gameOver = false;
  playAgainEl.hidden = true;

  hintEl.textContent = "Hint: " + current.hint;
  buildKeyboard();
  drawCoins();
  drawWord();
  say(pick(LINES.start));
}

function buildKeyboard() {
  keyboardEl.innerHTML = "";
  ALPHABET.forEach((letter) => {
    const key = document.createElement("button");
    key.className = "key";
    key.textContent = letter;
    key.dataset.letter = letter;
    key.addEventListener("click", () => guess(letter));
    keyboardEl.appendChild(key);
  });
}

function drawCoins() {
  coinsEl.innerHTML = "";
  for (let i = 0; i < MAX_MISSES; i++) {
    const coin = document.createElement("div");
    coin.className = "coin" + (i < misses ? " lost" : "");
    coin.textContent = "₿";
    coinsEl.appendChild(coin);
  }
}

function drawWord(reveal = false) {
  wordEl.innerHTML = "";
  current.word.split("").forEach((ch) => {
    const box = document.createElement("span");
    box.className = "letter";
    if (ch === " ") {
      box.classList.add("space");
    } else if (guessed.has(ch)) {
      box.textContent = ch;
    } else if (reveal) {
      box.textContent = ch;
      box.classList.add("missed");
    }
    wordEl.appendChild(box);
  });
}

function hasWon() {
  return current.word.split("").every((ch) => ch === " " || guessed.has(ch));
}

function guess(letter) {
  if (gameOver || guessed.has(letter)) return;
  guessed.add(letter);

  const key = keyboardEl.querySelector(`[data-letter="${letter}"]`);
  key.disabled = true;

  if (current.word.includes(letter)) {
    key.classList.add("right");
    drawWord();
    if (hasWon()) {
      endGame(true);
    } else {
      say(pick(LINES.right));
    }
  } else {
    key.classList.add("wrong");
    misses++;
    drawCoins();
    if (misses >= MAX_MISSES) {
      endGame(false);
    } else {
      say(pick(LINES.wrong));
    }
  }
}

function endGame(won) {
  gameOver = true;
  drawWord(!won);
  keyboardEl.querySelectorAll(".key").forEach((k) => (k.disabled = true));
  const word = current.word.toUpperCase();
  if (won) {
    say(`You got it: ${word}! ${current.meaning}`);
  } else {
    say(`The word was ${word}. ${current.meaning} Want to try another?`);
  }
  playAgainEl.hidden = false;
  playAgainEl.focus();
}

// Typing on a real keyboard works too
document.addEventListener("keydown", (e) => {
  const letter = e.key.toLowerCase();
  if (ALPHABET.includes(letter) && !e.ctrlKey && !e.metaKey && !e.altKey) {
    guess(letter);
  } else if (e.key === "Enter" && gameOver) {
    e.preventDefault();
    startGame();
  }
});

playAgainEl.addEventListener("click", startGame);

startGame();
