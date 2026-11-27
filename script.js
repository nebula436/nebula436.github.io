const cards = [
    { name: "6", value: 6, img: "6_of_clubs.png" },
    { name: "7", value: 7, img: "7_of_hearts.png" },
    { name: "8", value: 8, img: "8_of_clubs.png" },
    { name: "9", value: 9, img: "9_of_hearts.png" },
    { name: "10", value: 10, img: "10_of_hearts.png" },
    { name: "Валет", value: 2, img: "jack_of_clubs2.png" },
    { name: "Дама", value: 3, img: "queen_of_diamonds2.png" },
    { name: "Король", value: 4, img: "king_of_clubs2.png" },
    { name: "Туз", value: 11, img: "ace_of_spades2.png" }
];

let userScore = 0;
let computerScore = 0;
let attempt = 0;
const maxAttempts = 3;

let playerName = prompt("Введіть ваше ім'я:", "User");
if (!playerName || playerName.trim() === "") {
    playerName = "User";
}
document.getElementById("userName").textContent = playerName;

const generateBtn = document.getElementById("generateBtn");
const resetBtn = document.getElementById("resetBtn");
const userScoreEl = document.getElementById("userScore");
const computerScoreEl = document.getElementById("computerScore");
const attemptTextEl = document.getElementById("attemptText");
const messageEl = document.getElementById("message");

const userCardImg = document.getElementById("userCardImg");
const userCardPlaceholder = document.getElementById("userCardPlaceholder");
const computerCardImg = document.getElementById("computerCardImg");
const computerCardPlaceholder = document.getElementById("computerCardPlaceholder");

function renderCard(card, imgEl, placeholderEl) {
    if (card.img.startsWith("PLACEHOLDER_")) {
        imgEl.style.display = "none";
        placeholderEl.style.display = "block";
        placeholderEl.textContent = `${card.name} (${card.value} очок)`;
    } else {
        placeholderEl.style.display = "none";
        imgEl.src = card.img;
        imgEl.style.display = "block";
    }
}

generateBtn.addEventListener("click", function() {
    if (attempt >= maxAttempts) return;

    attempt++;
    attemptTextEl.textContent = `Спроба ${attempt} з ${maxAttempts}`;

    let userCard = cards[Math.floor(Math.random() * cards.length)];
    let computerCard = cards[Math.floor(Math.random() * cards.length)];

    renderCard(userCard, userCardImg, userCardPlaceholder);
    renderCard(computerCard, computerCardImg, computerCardPlaceholder);

    userScore += userCard.value;
    computerScore += computerCard.value;

    userScoreEl.textContent = userScore;
    computerScoreEl.textContent = computerScore;

    if (attempt === maxAttempts) {
        if (userScore > computerScore) {
            messageEl.textContent = `Переміг ${playerName}! Рахунок ${userScore} : ${computerScore}`;
        } else if (userScore < computerScore) {
            messageEl.textContent = `Переміг Computer! Рахунок ${computerScore} : ${userScore}`;
        } else {
            messageEl.textContent = `Нічия! Рахунок ${userScore} : ${computerScore}`;
        }

        generateBtn.style.display = "none";
        resetBtn.style.display = "inline-block";
    }
});

resetBtn.addEventListener("click", function() {
    userScore = 0;
    computerScore = 0;
    attempt = 0;

    userScoreEl.textContent = "0";
    computerScoreEl.textContent = "0";
    attemptTextEl.textContent = "Спроба 0 з 3";
    messageEl.textContent = "Натисніть Generate для початку гри.";

    userCardImg.style.display = "none";
    userCardPlaceholder.style.display = "block";
    userCardPlaceholder.textContent = "Карта";

    computerCardImg.style.display = "none";
    computerCardPlaceholder.style.display = "block";
    computerCardPlaceholder.textContent = "Карта";

    generateBtn.style.display = "inline-block";
    resetBtn.style.display = "none";
});