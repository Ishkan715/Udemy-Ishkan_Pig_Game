'use strict';

// Selecting elements
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');
const diceEl = document.querySelector('.dice');
const dice2El = document.querySelector('.dice2');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

let scores, currentScore, activePlayer, playing;

// Starting conditions
const init = function () {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;

  diceEl.classList.add('hidden');
  dice2El.classList.add('hidden');
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');

  // Player names
  const player1Name = prompt("Please enter player one's name");
  const player2Name = prompt("Please enter player two's name");

  // If player 1 name is empty, add Player 1 as default name
  player1Name === ''
    ? (document.getElementById('name--0').textContent = 'Player 1')
    : (document.getElementById('name--0').textContent = player1Name);
  // If player 2 ame is empty, add Player 1 as default name
  player2Name === ''
    ? (document.getElementById('name--1').textContent = 'Player 2')
    : (document.getElementById('name--1').textContent = player2Name);

  // If prompt to enter name is cancelled, add default names
  !player1Name
    ? (document.getElementById('name--0').textContent = 'Player 1')
    : player1Name;
  !player2Name
    ? (document.getElementById('name--1').textContent = 'Player 2')
    : player2Name;
};

init();

// Switch player
const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};

// Rolling dice functionality
btnRoll.addEventListener('click', function () {
  if (playing) {
    // 1. Generating a random dice roll
    const dice = Math.trunc(Math.random() * 6) + 1;
    const dice2 = Math.trunc(Math.random() * 6) + 1;

    // 2. Display the dice
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;
    dice2El.classList.remove('hidden');
    dice2El.src = `dice-${dice2}.png`;

    // 3. Check for rolled 1
    if (dice !== 1 && dice2 !== 1) {
      // Add dice to current score
      currentScore += dice + dice2;
      document.getElementById(
        `current--${activePlayer}`
      ).textContent = currentScore;
    } else {
      // Switch to next player
      switchPlayer();
    }
    if (dice === 6 && dice2 === 6) {
      currentScore = 0;
      document.getElementById(`current--${activePlayer}`).textContent = 0;
      scores[activePlayer] = 0;
      switchPlayer();
      playing = false;
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
      document.getElementById(`name--${activePlayer}`).textContent = 'Winner!';
    }
  }
});

btnHold.addEventListener('click', function () {
  if (playing) {
    // 1. Add current score to active player's score
    scores[activePlayer] += currentScore;
    // scores[1] = scores[1] + currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    // 2. Check if player's score is >= 100
    if (scores[activePlayer] >= 10) {
      // Finish the game
      playing = false;
      diceEl.classList.add('hidden');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
      document.getElementById(`name--${activePlayer}`).textContent = 'Winner!';
      // document.querySelector('.pyro').classList.remove('hidden');
    } else {
      // Switch to next player
      switchPlayer();
    }
  }
});

btnNew.addEventListener('click', function () {
  init();
});
