const partOne = (input) => {
  const crabs = input.split(',').map(Number);
  const min = Math.min(...crabs);
  const max = Math.max(...crabs);
  const cheepest = [0, 1e12];

  for (let i = min; i < max; i++) {
    const cost = crabs.reduce((prev, curr) => prev + Math.abs(curr - i), 0);

    if (cost < cheepest[1]) {
      cheepest[0] = i;
      cheepest[1] = cost;
    }
  }

  return cheepest[1];
};


const partTwo = (input) => {
  const crabs = input.split(',').map(Number);
  const min = Math.min(...crabs);
  const max = Math.max(...crabs);
  const cheepest = [0, 1e12];

  const getFuel = (a, b) => {
    const d = Math.abs(a - b);
    return 0.5 * d * (d + 1);
  };

  for (let i = min; i < max; i++) {
    const cost = crabs.reduce((prev, curr) => prev + getFuel(curr, i), 0);

    if (cost < cheepest[1]) {
      cheepest[0] = i;
      cheepest[1] = cost;
    }
  }

  return cheepest[1];
};


export default { partOne, partTwo };
