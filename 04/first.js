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

class WinnerFound extends Error {
  constructor(board, latestDraw) {
    super('Winner found!');
    this.board = board;
    this.latestDraw = latestDraw;
  }
}

try {
  drawnNumbers.forEach((number) => {
    boards.forEach((board) => {
      for (let i = 0; i < board.length; i++) {
        for (let j = 0; j < board[0].length; j++) {
          if (board[i][j] === number) {
            board[i][j] = null;
          }
        }
      }

      if (checkIsWon(board)) {
        throw new WinnerFound(board, number);
      }
    });
  });
} catch (exception) {
  if (exception instanceof WinnerFound) {
    console.log('winner found!');
    console.log('Board:', exception.board);
    console.log('Latest draw:', exception.latestDraw);
    console.log(
      'Final score: ',
      scoreCount(exception.board, exception.latestDraw)
    );
  } else throw error;
}
