const animals = ["🐶", "🐱", "🦁", "🐯", "🐵", "🐘", "🦓", "🐼"];
let cardsArray = [...animals, ...animals];
let gameBoard = document.getElementById('gameBoard');
let firstCard, secondCard;
let lockBoard = false;
let tries = 0;
let wrongTries = 0;
let timer = 0;
let timerInterval;
let matchedPairs = 0;
let finishMessage;

initGame();

function initGame() {
  
  gameBoard.innerHTML = "";
  firstCard = null;
  secondCard = null;
  lockBoard = false;
  tries = 0;
  wrongTries = 0;
  timer = 0;
  matchedPairs = 0;
  clearInterval(timerInterval);
  document.getElementById('tries').textContent = tries;
  document.getElementById('timer').textContent = timer;
  
  cardsArray = [...animals, ...animals].sort(() => 0.5 - Math.random());

  cardsArray.forEach(animal => {
    const card = document.createElement('div');
    card.classList.add('card');
    card.dataset.animal = animal;
    card.innerHTML = "❓";
    card.addEventListener('click', flipCard);
    gameBoard.appendChild(card);
  });
}

function startTimer() {
  timerInterval = setInterval(() => {
    timer++;
    document.getElementById('timer').textContent = timer;
  }, 1000);
}

function flipCard() {
  if (!timerInterval) startTimer();
  if (lockBoard) return;
  if (this === firstCard) return;

  this.classList.add('flip');
  this.innerHTML = this.dataset.animal;

  if (!firstCard) {
    firstCard = this;
    return;
  }

  secondCard = this;
  lockBoard = true;
  tries++;
  document.getElementById('tries').textContent = tries;

  checkForMatch();
}

function checkForMatch() {
  if (firstCard.dataset.animal === secondCard.dataset.animal) {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);
    matchedPairs++;
    resetBoard();

    if (matchedPairs === animals.length) {
      showGameOver("🎉 O'YIN TUGADI! HAMMASINI TOPDING!");
    }

  } else {
    wrongTries++;
    firstCard.classList.add('wrong');
    secondCard.classList.add('wrong');

    setTimeout(() => {
      firstCard.classList.remove('flip', 'wrong');
      secondCard.classList.remove('flip', 'wrong');
      firstCard.innerHTML = "❓";
      secondCard.innerHTML = "❓";
      resetBoard();
    }, 800);

    if (wrongTries >= 8) {
      setTimeout(() => {
        showGameOver("❌ O'YIN TUGADI! 8 MARTA XATO QILDING.");
      }, 1000);
    }
  }
}

function resetBoard() {
  [firstCard, secondCard] = [null, null];
  lockBoard = false;
}

function showGameOver(message) {
  clearInterval(timerInterval);
  lockBoard = true;

  
  const allCards = document.querySelectorAll('.card');
  allCards.forEach(card => card.style.display = "none");

  finishMessage = document.createElement('div');
  finishMessage.textContent = message;
  finishMessage.style.fontSize = "30px";
  finishMessage.style.marginTop = "20px";
  finishMessage.style.color = "red";
  finishMessage.style.fontWeight = "bold";
  gameBoard.appendChild(finishMessage);

  setTimeout(() => {
    if (finishMessage) {
      finishMessage.remove();
    }
    initGame(); 
  }, 3000); 
}
