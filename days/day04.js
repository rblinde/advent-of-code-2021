class Board {
  constructor() {
    this.numbers = [];
  }


  add(numbers) {
    const formatted = numbers.map(num => ({ value: num, checked: false }));
    this.numbers.push(...formatted)
  }


  draw(number) {
    const index = this.numbers.findIndex(num => num.value === number);

    if (index !== -1) {
      this.numbers[index].checked = true;
    }
  }


  isWinner() {
    // Horizontal
    for (let i = 0; i < 5; i++) {
      const indexes = new Array(5).fill(i * 5).map((val, index) => val + index);

      if (indexes.every(val => this.numbers[val].checked)) {
        return true;
      }
    }

    // Vertical
    for (let j = 0; j < 5; j++) {
      const indexes = new Array(5).fill(j).map((val, index) => val + index * 5);

      if (indexes.every(val => this.numbers[val].checked)) {
        return true;
      }
    }

    return false;
  }


  getSumUnchecked() {
    return this.numbers
      .filter(num => !num.checked)
      .map(num => num.value)
      .reduce((prev, curr) => prev + curr, 0);
  }
}


const createBoards = (lines) => {
  const boards = [];

  for (let i = 2; i < lines.length; i += 6) {
    const board = new Board();

    for (let j = i; j < i + 5; j++) {
      const boardNumbers = lines[j].match(/\d+/g).map(Number);
      board.add(boardNumbers);
    }

    boards.push(board);
  }

  return boards;
};


const partOne = (input) => {
  const lines = input.split('\n');
  const numbers = lines[0].split(',').map(Number);
  const boards = createBoards(lines);

  // Draw numbers and pick winner
  for (const number of numbers) {
    for (const board of boards) {
      board.draw(number);

      if (board.isWinner()) {
        return board.getSumUnchecked() * number;
      }
    }
  }

  return -1;
};


const partTwo = (input) => {
  const lines = input.split('\n');
  const numbers = lines[0].split(',').map(Number);
  let boards = createBoards(lines);

  // Draw numbers and pick winner
  for (const number of numbers) {
    for (const board of boards) {
      board.draw(number);

      if (board.isWinner()) {
        if (boards.length === 1) {
          return board.getSumUnchecked() * number;
        } else {
          boards = boards.filter(b => b !== board);
        }
      }
    }
  }

  return -1;
};


export default { partOne, partTwo };
