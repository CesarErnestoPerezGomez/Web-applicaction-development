function rollDice() {
    return Math.floor(Math.random() * 6) + 1; 
  }
  
  function updateDiceImage(player, randomNumber) {
    document.querySelector(`.img${player}`).setAttribute('src', `dice${randomNumber}.png`);
  }
  
  function determineWinner(player1Roll, player2Roll) {
    const h1 = document.querySelector('h1');
    if (player1Roll > player2Roll) {
      h1.textContent = 'Player 1 Wins!';
    } else if (player2Roll > player1Roll) {
      h1.textContent = 'Player 2 Wins!';
    } else {
      h1.textContent = 'It\'s a Tie!';
    }
  }
  
  function simulateDiceThrow() {
    const player1Roll = rollDice();
    const player2Roll = rollDice();
  
    updateDiceImage(1, player1Roll);
    updateDiceImage(2, player2Roll);
  
    determineWinner(player1Roll, player2Roll);
  }
  
  window.onload = simulateDiceThrow;
  