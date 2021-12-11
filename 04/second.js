import readFile from '../helpers/readFile.js';

const input = readFile('./04/input.txt');
const filledLines = input.split('\n').filter((el) => el.length > 0);
const drawnNumbers = filledLines[0].split(',').map((a) => parseInt(a));
const boards = filledLines.slice(1).reduce((acc, el, i) => {
  return i % 5 === 0
    ? [
        ...acc,
        [
          el
            .trim()
            .split(/[\s]+/g)
            .map((a) => parseInt(a)),
        ],
      ]
    : [
        ...acc.slice(0, acc.length - 1),
        [
          ...acc[acc.length - 1],
          el
            .trim()
            .split(/[\s]+/g)
            .map((a) => parseInt(a)),
        ],
      ];
}, []);

const checkIsWon = (board) => {
  for (let i = 0; i < board.length; i++) {
    if (board.every((line) => line[i] === null)) {
      return true;
    }
    if (board[i].every((char) => char === null)) {
      return true;
    }
  }
};

const scoreCount = (board, latestDraw) => {
  const sumRest = board.reduce((sum, line) => {
    const sumLine = line.reduce((s, n) => (n !== null ? s + n : s), 0);

    return sumLine + sum;
  }, 0);

  return sumRest * latestDraw;
};

let winsIndex = [];
let wins = [];

drawnNumbers.forEach((number) => {
  boards.forEach((board, boardIndex) => {
    if (winsIndex.includes(boardIndex)) {
      return;
    }
    for (let i = 0; i < board.length; i++) {
      for (let j = 0; j < board[0].length; j++) {
        if (board[i][j] === number) {
          board[i][j] = null;
        }
      }
    }

    if (checkIsWon(board)) {
      winsIndex.push(boardIndex);
      wins.push([board, number]);
    }
  });
});

const lastWin = wins[wins.length - 1];

console.log(lastWin);
console.log(scoreCount(wins[wins.length - 1][0], wins[wins.length - 1][1]));
