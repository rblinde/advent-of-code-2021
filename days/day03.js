const partOne = (input) => {
  const lines = input.split('\n');
  const n = lines.length / 2;
  const size = lines[0].length;
  const bits = new Array(size).fill(0);

  for (const line of lines) {
    for (let i = 0; i < line.length; i++) {
      bits[i] += parseInt(line[i]);
    }
  }

  const gamma = parseInt(bits.map(el => el > n ? '1' : '0').join(''), 2);
  const epsilon = parseInt(bits.map(el => el > n ? '0' : '1').join(''), 2);
  return gamma * epsilon;
};


const partTwo = (input) => {
  const lines = input.split('\n');

  const getBitCount = (numbers, i) => numbers.reduce((curr, next) => curr + parseInt(next[i]), 0);

  const findBit = (numbers, a, b) => {
    let i = 0;

    while (numbers.length !== 1) {
      const bitCount = getBitCount(numbers, i);
      const n = numbers.length / 2;
      const byte = bitCount >= n ? a : b;
      numbers = numbers.filter(line => line[i] === byte);
      i++;
    }

    return parseInt(numbers[0], 2);
  };

  const oxygen = findBit([...lines], '1', '0');
  const co2 = findBit([...lines], '0', '1');
  return oxygen * co2;
};


export default { partOne, partTwo };
