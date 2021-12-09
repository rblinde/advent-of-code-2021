const partOne = (input) => {
  const lines = input.split('\n').map(e => Number(e));
  let prev = lines[0];
  let count = 0;

  for (let i = 1; i < lines.length; i++) {
    const curr = lines[i];

    if (curr > prev) {
      count++;
    }

    prev = curr;
  }

  return count;
};


const partTwo = (input) => {
  const lines = input.split('\n').map(e => Number(e));
  let prev = lines[0] + lines[1] + lines[2];
  let count = 0;

  for (let i = 1; i < lines.length - 2; i++) {
    const curr = lines[i] + lines[i + 1] + lines[i + 2];

    if (curr > prev) {
      count++;
    }

    prev = curr;
  }

  return count;
};


export default { partOne, partTwo };
