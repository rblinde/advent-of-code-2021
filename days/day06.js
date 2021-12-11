const partOne = (input) => {
  let fishes = input.split(',').map(e => Number(e));

  for (let i = 0; i < 80; i++) {
    for (const i in fishes) {
      if (fishes[i] === 0) {
        fishes[i] = 6 + 1;
        fishes.push(8 + 1);
      }
    }

    fishes = fishes.map(fish => fish - 1);
  }

  return fishes.length;
};


const partTwo = (input) => {
  const fishes = input.split(',').map(e => Number(e));
  let counts = new Array(9).fill(0);

  for (const fish of fishes) {
    counts[fish]++;
  }

  for (let i = 0; i < 256; i++) {
    const [d0, d1, d2, d3, d4, d5, d6, d7, d8] = counts;
    counts = [d1, d2, d3, d4, d5, d6, d7 + d0, d8, d0];
  }

  return counts.reduce((prev, curr) => curr + prev, 0);
};


export default { partOne, partTwo };
