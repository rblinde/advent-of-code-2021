const getNeighbours = (y, x) => {
  return [
    y > 0 && x > 0 ? [y - 1, x - 1] : null,
    y > 0 ? [y - 1, x] : null,
    y > 0 && x < 9 ? [y - 1, x + 1] : null,
    x < 9 ? [y, x + 1] : null,
    y < 9 && x < 9 ? [y + 1, x + 1] : null,
    y < 9 ? [y + 1, x] : null,
    y < 9 && x > 0 ? [y + 1, x - 1] : null,
    x > 0 ? [y, x - 1] : null,
  ].filter(e => !!e);
};


const partOne = (input) => {
  const lines = input.split('\n');
  const matrix = {};
  let flashCount = 0;

  // Build matrix
  for (let y = 0; y < 10; y++) {
    for (let x = 0; x < 10; x++) {
      matrix[`${y}${x}`] = Number(lines[y][x]);
    }
  }

  for (let i = 0; i < 100; i++) {
    const flashed = new Set();

    // Step 1: increase by 1
    for (let y = 0; y < 10; y++) {
      for (let x = 0; x < 10; x++) {
        matrix[`${y}${x}`] += 1;
      }
    }

    // Step 2: find flashed
    const queue = Object
      .entries(matrix)
      .filter(elem => elem[1] > 9)
      .map(elem => elem[0]);

    while (queue.length) {
      const pos = queue.shift();
      const [y, x] = pos.split('').map(Number);

      if (flashed.has(pos)) {
        continue;
      }

      flashed.add(pos);
      flashCount++;

      for (const [ny, nx] of getNeighbours(y, x)) {
        const npos = `${ny}${nx}`;
        matrix[npos] += 1;

        if (matrix[npos] > 9 && !flashed.has(npos)) {
          queue.push(npos);
        }
      }
    }

    // Step 3: reset flashed
    for (const flash of flashed) {
      matrix[flash] = 0;
    }
  }

  return flashCount;
};


const partTwo = (input) => {
  const lines = input.split('\n');
  const matrix = {};
  let step = 1;

  // Build matrix
  for (let y = 0; y < 10; y++) {
    for (let x = 0; x < 10; x++) {
      matrix[`${y}${x}`] = Number(lines[y][x]);
    }
  }

  while (true) {
    const flashed = new Set();

    // Step 1: increase by 1
    for (let y = 0; y < 10; y++) {
      for (let x = 0; x < 10; x++) {
        matrix[`${y}${x}`] += 1;
      }
    }

    // Step 2: find flashed
    const queue = Object
      .entries(matrix)
      .filter(elem => elem[1] > 9)
      .map(elem => elem[0]);

    while (queue.length) {
      const pos = queue.shift();
      const [y, x] = pos.split('').map(Number);

      if (flashed.has(pos)) {
        continue;
      }

      flashed.add(pos);

      for (const [ny, nx] of getNeighbours(y, x)) {
        const npos = `${ny}${nx}`;
        matrix[npos] += 1;

        if (matrix[npos] > 9 && !flashed.has(npos)) {
          queue.push(npos);
        }
      }
    }

    if ([...flashed].length === 100) {
      return step;
    }

    // Step 3: reset flashed
    for (const flash of flashed) {
      matrix[flash] = 0;
    }

    step += 1;
  }
};


export default { partOne, partTwo };
