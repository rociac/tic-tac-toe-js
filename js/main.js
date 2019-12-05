const tic = document.querySelector('.gameBoard');
const form = document.getElementById('form');
let foo, bar;
const formData = {
  one: document.getElementById('player1').value,
  weapon1() {
    let weapon = document.getElementById('x').checked;
    if (weapon) {
      return 'x';
    } else {
      return 'o';
    };
  },
  two: document.getElementById('player2').value,
  weapon2() {
    let weapon = document.getElementById('x').checked;
    if (weapon) {
      return 'o';
    } else {
      return 'x';
    };
  }
};

const GameBoard = (() => {
  const board = ['', '', '', '', '', '', '', '', ''];

  const displayBoard = () => {

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
  };

  return { displayBoard }
})();

const Player = (name, weapon) => {
  const getName = () => name;
  const getWeapon = () => weapon;

  return { getName, getWeapon };
}

const Game = (() => {
  console.log("Function working!");
  formData = {
    one: document.getElementById('player1').value,
    weapon1() {
      let weapon = document.getElementById('x').checked;
      if (weapon) {
        return 'x';
      } else {
        return 'o';
      };
    },
    two: document.getElementById('player2').value,
    weapon2() {
      let weapon = document.getElementById('x').checked;
      if (weapon) {
        return 'o';
      } else {
        return 'x';
      };
    }
  };
  console.log(formData.one);
  const gameStart = () => {
    foo = Player(formData.one, formData.weapon1);
    bar = Player(formData.two, formData.weapon2);
    GameBoard.displayBoard();
  }

  return { gameStart };
})();

document.getElementById('start').addEventListener('click', Game.gameStart, false);


