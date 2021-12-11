class Dictionary {
  constructor() {
    this.data = {};
  }


  get() {
    return this.data;
  }


  add(key) {
    if (key in this.data) {
      this.data[key] += 1;
      return;
    }

    this.data[key] = 1;
  }
}


const getCoordsOnLine = (x1, y1, x2, y2) => {
  const coords = [];
  const vectors = [
    x1 === x2 ? 0 : x1 > x2 ? -1 : 1,
    y1 === y2 ? 0 : y1 > y2 ? -1 : 1,
  ];

  while (x1 !== x2 || y1 !== y2) {
    coords.push([x1, y1]);
    x1 += vectors[0];
    y1 += vectors[1];
  }

  coords.push([x2, y2]);
  return coords;
}


const partOne = (input) => {
  const lines = input.split('\n');
  const dict = new Dictionary();

  for (const line of lines) {
    const [x1, y1, x2, y2] = line.match(/\d+/g).map(e => Number(e));

    if (x1 === x2 || y1 === y2) {
      for (const [x, y] of getCoordsOnLine(x1, y1, x2, y2)) {
        dict.add(`${x},${y}`);
      }
    }
  }

  return Object.values(dict.get()).filter(n => n > 1).length;
};


const partTwo = (input) => {
  const lines = input.split('\n');
  const dict = new Dictionary();

  for (const line of lines) {
    const [x1, y1, x2, y2] = line.match(/\d+/g).map(e => Number(e));

    for (const [x, y] of getCoordsOnLine(x1, y1, x2, y2)) {
      dict.add(`${x},${y}`);
    }
  }

  return Object.values(dict.get()).filter(n => n > 1).length;
};


export default { partOne, partTwo };
