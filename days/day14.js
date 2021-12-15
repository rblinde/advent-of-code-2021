class Pairs {
  constructor(polymer) {
    this.pairs = {};
    this.lastChar = polymer[polymer.length - 1];

    for (let i = 0; i < polymer.length - 1; i++) {
      const pair = polymer[i] + polymer[i + 1];
      this.pairs[pair] = 1;
    }
  }


  add(key, value = 1) {
    if (this.pairs[key]) {
      this.pairs[key] += value;
    } else {
      this.pairs[key] = value;
    }
  }


  update(rules) {
    const newPairs = new Pairs([]);

    for (const pair in this.pairs) {
      const rule = rules[pair];
      const count = this.pairs[pair] || 0;

      if (!rule) {
        newPairs.add(pair, count);
      }

      newPairs.add(pair[0] + rule, count);
      newPairs.add(rule + pair[1], count);
    }

    this.pairs = newPairs.pairs;
  }


  getCounts() {
    const counts = {};

    for (const pair in this.pairs) {
      counts[pair[0]] = counts[pair[0]] ? counts[pair[0]] : 0;
      counts[pair[0]] += this.pairs[pair];
    }

    counts[this.lastChar] += 1;
    return counts;
  }
}

const readInput = (input) => {
  const lines = input.split('\n');
  const polymer = lines[0].split('');
  const rules = {};

  for (let i = 2; i < lines.length; i++) {
    const [pair, insert] = lines[i].split(' -> ');
    rules[pair] = insert;
  }

  return [polymer, rules];
};


const partOne = (input) => {
  const [polymer, rules] = readInput(input);

  for (let i = 0; i < 10; i++) {
    const toInsert = [];

    for (let char = 0; char < polymer.length - 1; char++) {
      const pair = polymer[char] + polymer[char + 1];
      if (rules[pair]) {
        toInsert.push([char + 1 + toInsert.length, rules[pair]]);
      }
    }

    for (const elem of toInsert) {
      polymer.splice(elem[0], 0, elem[1]);
    }
  }

  const counter = polymer.reduce((prev, next) => {
    prev[next] = prev[next] ? prev[next] + 1 : 1;
    return prev;
  }, {});
  const sorted = Object.values(counter).sort((a, b) => b - a);
  return sorted[0] - sorted[sorted.length - 1];
};


const partTwo = (input) => {
  const [polymer, rules] = readInput(input);
  const pairs = new Pairs(polymer);

  for (let i = 0; i < 40; i++) {
    pairs.update(rules);
  }

  const counter = pairs.getCounts();
  const sorted = Object.values(counter).sort((a, b) => b - a);
  return sorted[0] - sorted[sorted.length - 1];
};


export default { partOne, partTwo };
