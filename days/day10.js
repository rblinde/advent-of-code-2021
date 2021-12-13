const opposite = (char) => {
  const map = { '(': ')', '[': ']', '{': '}', '<': '>' };
  return map[char];
};


const getErrorAndIncomplete = (lines) => {
  const errors = [];
  const incomplete = [];
  const table = {
    ')': 3,
    ']': 57,
    '}': 1197,
    '>': 25137,
  };

  for (const line of lines) {
    const queue = [];
    let isIncomplete = true;

    for (const char of line) {
      if (['(', '[', '{', '<'].includes(char)) {
        queue.push(char);
        continue;
      }

      if (char !== opposite(queue.pop())) {
        isIncomplete = false;
        errors.push(char);
        break;
      }
    }

    if (isIncomplete) {
      incomplete.push(queue);
    }
  }

  const errorScore = errors.reduce((prev, curr) => prev + table[curr], 0);
  return [errorScore, incomplete];
};


const partOne = (input) => {
  const lines = input.split('\n');
  return getErrorAndIncomplete(lines)[0];
};


const partTwo = (input) => {
  const lines = input.split('\n');
  const incomplete = getErrorAndIncomplete(lines)[1];
  const scores = [];
  const table = { ')': 1, ']': 2, '}': 3, '>': 4 };

  for (const queue of incomplete) {
    let score = 0;

    for (const char of queue.reverse().map(opposite)) {
      score = score * 5 + table[char];
    }

    scores.push(score);
  }

  const sorted = scores.sort((a, b) => a - b);
  const idx = (sorted.length - 1) / 2;
  return sorted[idx];
};


export default { partOne, partTwo };
