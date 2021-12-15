const generateMap = (input) => {
  const lines = input.split('\n');
  const map = {};
  const folds = [];
  let isCoord = true;

  for (const line of lines) {
    if (line.length === 0) {
      isCoord = false;
      continue;
    }

    if (isCoord) {
      map[line] = 1;
    } else {
      const [_, axis, value, ...rest] = line.match(/fold along (x|y)=(\d+)/);
      folds.push([axis, Number(value)]);
    }
  }

  return [map, folds];
};


const fold = (map, [axis, value]) => {
  for (const coord in map) {
    const [x, y] = coord.split(',').map(Number);

    if ((y <= value && axis === 'y') || (x <= value && axis === 'x')) {
      continue;
    }

    delete map[coord];
    const newY = axis === 'y' ? value - (y - value) : y;
    const newX = axis === 'x' ? value - (x - value) : x;
    map[`${newX},${newY}`] = 1;
  }
};


const displayMap = (map) => {
  const keys = Object.keys(map);
  const x = keys.map(key => Number(key.split(',')[0]));
  const y = keys.map(key => Number(key.split(',')[1]));
  const width = Math.max(...x) + 1;
  const height = Math.max(...y) + 1;

  const matrix = new Array(height)
    .fill(null)
    .map(_ => new Array(width).fill(' '));

  for (let i = 0; i < x.length; i++) {
    matrix[y[i]][x[i]] = '#';
  }

  return '\n' + matrix.reduce((prev, curr) => prev + curr.join('') + '\n', '');
};


const partOne = (input) => {
  const [map, folds] = generateMap(input);
  fold(map, folds[0]);
  return Object.values(map).length;
};


const partTwo = (input) => {
  const [map, folds] = generateMap(input);

  for (const line of folds) {
    fold(map, line);
  }

  return displayMap(map);
};


export default { partOne, partTwo };
