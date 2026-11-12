const gameName = "لعبة تخمين الأرقام";
document.title = gameName;
document.getElementById("title-game").textContent = gameName;

const inputNumber = document.getElementById("guess-number");
const checkButton = document.getElementById("btn-check");
const newGameButton = document.getElementById("new-game");
const checkGuess = document.getElementById("check-guess");
const attemptText = document.getElementById("Attempts");

let secretNumber;
let attempts;
const maxAttempts = 10;

function startNewGame() {
    secretNumber = Math.floor(Math.random() * 100) + 1;
    attempts = 0;
    inputNumber.value = "";
    checkGuess.textContent = "";
    checkGuess.className = "";
    attemptText.textContent = `المحاولات ${attempts}`;
    checkButton.disabled = false;
    inputNumber.focus();
}

function showMessage(message, className) {
    checkGuess.textContent = message;
    checkGuess.className = className;
}

function checkAnswer() {
    const rawGuess = inputNumber.value.trim();
    const guess = Number(rawGuess);

    if (rawGuess === "" || !Number.isInteger(guess) || guess < 1 || guess > 100) {
        showMessage("أدخل عددًا صحيحًا من 1 إلى 100.", "wrong-massege");
        return;
    }

    attempts++;
    attemptText.textContent = `المحاولات ${attempts}`;

    if (guess === secretNumber) {
        showMessage("تم الفوز باللعبة! أحسنت.", "winner-massege");
        checkButton.disabled = true;
    } else if (attempts === maxAttempts) {
        showMessage(`انتهت المحاولات. الرقم السري هو ${secretNumber}.`, "wrong-massege");
        checkButton.disabled = true;
    } else if (guess < secretNumber) {
        showMessage("إن تخمينك أقل من الرقم السري.", "wrong-massege");
    } else {
        showMessage("إن تخمينك أكبر من الرقم السري.", "wrong-massege");
    }

    inputNumber.value = "";
    if (!checkButton.disabled) inputNumber.focus();
}

checkButton.addEventListener("click", checkAnswer);
inputNumber.addEventListener("keydown", (event) => {
    if (event.key === "Enter" && !checkButton.disabled) checkAnswer();
});
newGameButton.addEventListener("click", startNewGame);

startNewGame();
