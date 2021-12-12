const partOne = (input) => {
  const lines = input.split('\n');
  const outputs = lines.map(line => line.split(' | ')[1].split(' ')).flat();

  return outputs.reduce((prev, next) => {
    const count = [2, 3, 4, 7].includes(next.length) ? 1 : 0;
    return prev + count;
  }, 0);
};


const partTwo = (input) => {
  const lines = input.split('\n');
  let total = 0;

  const sort = str => str.split('').sort((a, b) => a.localeCompare(b)).join('');

  const contains = (word, sub) => [...sub].every(s => word.includes(s));

  const createDigit = (inputs) => {
    const one = inputs.filter(i => i.length === 2).pop();
    const four = inputs.filter(i => i.length === 4).pop();
    const seven = inputs.filter(i => i.length === 3).pop();
    const eight = inputs.filter(i => i.length === 7).pop();

    const oneSixNine = inputs.filter(i => i.length === 6);
    const twoThreeFive = inputs.filter(i => i.length === 5);

    const nine = oneSixNine.filter(i => contains(i, four)).pop();
    const zero = oneSixNine.filter(i => contains(i, seven) && i !== nine).pop();
    const six = oneSixNine.filter(i => i !== nine && i !== zero).pop();

    const three = twoThreeFive.filter(i => contains(i, one)).pop();
    const five = twoThreeFive.filter(i => contains(six, i)).pop();
    const two = twoThreeFive.filter(i => i !== three && i !== five).pop();

    return {
      [sort(zero)]: 0,
      [sort(one)]: 1,
      [sort(two)]: 2,
      [sort(three)]: 3,
      [sort(four)]: 4,
      [sort(five)]: 5,
      [sort(six)]: 6,
      [sort(seven)]: 7,
      [sort(eight)]: 8,
      [sort(nine)]: 9,
    };
  };

  const getValue = (digit, outputs) => outputs.reduce((prev, curr) => 10 * prev + digit[sort(curr)], 0);

  for (const line of lines) {
    const [inputs, outputs] = line.split(' | ');
    const digit = createDigit(inputs.split(' '));
    total += getValue(digit, outputs.split(' '));
  }

  return total;
};


export default { partOne, partTwo };
