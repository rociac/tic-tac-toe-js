const tic = document.querySelector('.gameBoard');
const form = document.getElementById('form');
let player1; let player2; let current; let
  board;
const formData = {
  player1: '',
  weapon1(weapon) {
    if (weapon) {
      return 'x';
    }
    return 'o';
  },
  player2: '',
  weapon2(weapon) {
    if (weapon) {
      return 'o';
    }
    return 'x';
  },
};

function updateScoreboard() {
  const scoreBoard = document.getElementById('scoreBoard');
  scoreBoard.innerHTML = `
      <h2>Scoreboard:</h2>
      <p>${player1.getName()} - ${player1.wins} </p>
      <p>${player2.getName()} - ${player2.wins} </p>
    `;
}

function win(player) {
  let result = false;
  const wins1 = [[1, 2, 3], [4, 5, 6], [7, 8, 9], [1, 4, 7]];
  const wins2 = [[2, 5, 8], [3, 6, 9], [1, 5, 9], [3, 5, 7]];
  const wins = wins1.concat(wins2);

  wins.forEach((element) => {
    let count = 0;
    if (!result) {
      element.forEach((p) => {
        if (board[p - 1] === player) {
          count += 1;
        }
      });
      if (count === 3) {
        result = true;
        current.wins += 1;
        updateScoreboard();
      }
    }
  });
  return result;
}

function gameOver(result) {
  const change = document.getElementById('info-winner');
  tic.style.pointerEvents = 'none';
  if (result === 'tie') {
    change.innerHTML = "It's a tie.";
  } else {
    change.innerHTML = `The winner is ${result.getName()}`;
  }
}

function addListeners() {
  for (let i = 1; i <= 9; i += 1) {
    document.getElementById(`td${i}`).addEventListener('click', () => {
      const box = document.getElementById(`td${i}`);
      if (board[i - 1] === '') {
        board[i - 1] = current.getWeapon();
        box.innerHTML = current.getWeapon();
        if (win(current.getWeapon())) {
          gameOver(current);
        }
        let count = 0;
        board.forEach((e) => {
          if (e !== '') {
            count += 1;
          }
        });
        if (count === 9) {
          gameOver('tie');
        }
        if (current === player1) {
          current = player2;
        } else {
          current = player1;
        }
      }
    }, false);
  }
}

const GameBoard = (() => {
  const displayBoard = () => {
    board = ['', '', '', '', '', '', '', '', ''];
    tic.style.display = 'table';
    const reset = document.getElementById('reset');
    reset.style.display = 'block';
    updateScoreboard();
    tic.innerHTML = `
    <tr>
      <td id="td1">${board[0]}</td>
      <td id="td2">${board[1]}</td>
      <td id="td3">${board[2]}</td>
    </tr>
    <tr>
      <td id="td4">${board[3]}</td>
      <td id="td5">${board[4]}</td>
      <td id="td6">${board[5]}</td>
    </tr>
    <tr>
      <td id="td7">${board[6]}</td>
      <td id="td8">${board[7]}</td>
      <td id="td9">${board[8]}</td>
    </tr>
    `;
    form.style.display = 'none';
    addListeners();
  };

  return { displayBoard };
})();

const Player = (name, weapon) => {
  const wins = 0;
  const getName = () => name;
  const getWeapon = () => weapon;

  return { getName, getWeapon, wins };
};

function resetGame() {
  const change = document.getElementById('info-winner');
  GameBoard.displayBoard();
  tic.style.pointerEvents = 'all';
  change.innerHTML = '';
  current = player1;
}


const Game = () => {
  formData.player1 = document.getElementById('player1').value;
  formData.player2 = document.getElementById('player2').value;
  const weapon = document.getElementById('x').checked;
  player1 = Player(formData.player1, formData.weapon1(weapon), 0);
  player2 = Player(formData.player2, formData.weapon2(weapon), 0);
  current = player1;
  GameBoard.displayBoard();
};

document.getElementById('start').addEventListener('click', Game, false);
document.getElementById('reset').addEventListener('click', resetGame, false);
