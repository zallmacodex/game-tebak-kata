const words = [
    { word: "komputer", hint: "Perangkat elektronik untuk menjalankan program" },
    { word: "javascript", hint: "Bahasa pemrograman untuk web" },
    { word: "internet", hint: "Jaringan global yang menghubungkan komputer" },
    { word: "programmer", hint: "Orang yang menulis kode" }
];

let currentWord = "";
let currentHint = "";
let attempts;
let score = 0;
let timer;
let timeLeft = 10;

const hintElement = document.getElementById("hint");
const messageElement = document.getElementById("message");
const guessInput = document.getElementById("guess-input");
const submitButton = document.getElementById("submit-btn");
const restartButton = document.getElementById("restart-btn");
const scoreElement = document.getElementById("score");
const timerElement = document.getElementById("timer");
const difficultySelect = document.getElementById("difficulty");

function pickRandomWord() {
    const randomIndex = Math.floor(Math.random() * words.length);
    currentWord = words[randomIndex].word;
    currentHint = words[randomIndex].hint;
    hintElement.textContent = currentHint;
    resetTimer();
}

function resetGame() {
    score = 0;
    scoreElement.textContent = score;
    pickRandomWord();
    attempts = getAttempts();
    messageElement.textContent = `Anda punya ${attempts} kesempatan.`;
}

function getAttempts() {
    const difficulty = difficultySelect.value;
    if (difficulty === "easy") return 5;
    if (difficulty === "medium") return 3;
    return 1;
}

function resetTimer() {
    clearInterval(timer);
    timeLeft = difficultySelect.value === "easy" ? 15 : difficultySelect.value === "medium" ? 10 : 5;
    timerElement.textContent = timeLeft;
    timer = setInterval(countdown, 1000);
}

function countdown() {
    timeLeft--;
    timerElement.textContent = timeLeft;
    if (timeLeft <= 0) {
        clearInterval(timer);
        checkGuess();
    }
}

function checkGuess() {
    const userGuess = guessInput.value.toLowerCase();
    if (userGuess === currentWord) {
        messageElement.textContent = "Selamat! Anda berhasil menebak kata!";
        messageElement.classList.remove("wrong");
        messageElement.classList.add("correct");
        score += 10;
        scoreElement.textContent = score;
        resetGame();
    } else {
        attempts--;
        messageElement.textContent = `Salah! Anda punya ${attempts} kesempatan lagi.`;
        messageElement.classList.remove("correct");
        messageElement.classList.add("wrong");
        if (attempts <= 0) {
            messageElement.textContent = `Game Over! Kata yang benar adalah "${currentWord}".`;
            submitButton.disabled = true;
            restartButton.classList.remove("hidden");
        }
    }
    guessInput.value = "";
}

submitButton.addEventListener("click", checkGuess);
restartButton.addEventListener("click", () => {
    submitButton.disabled = false;
    restartButton.classList.add("hidden");
    resetGame();
});

difficultySelect.addEventListener("change", resetGame);

// Start game on load
resetGame();