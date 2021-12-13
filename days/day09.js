const getNeightbours = (x, y, width, height) => {
  return [
    y > 0 ? [y - 1, x] : null,
    y < height ? [y + 1, x] : null,
    x > 0 ? [y, x - 1] : null,
    x < width ? [y, x + 1] : null,
  ].filter(e => !!e);
};


const getMinPoints = (matrix) => {
  const minPoints = [];
  const height = matrix.length - 1;
  const width = matrix[0].length - 1;

  for (let row = 0; row < matrix.length; row++) {
    for (let col = 0; col < matrix[row].length; col++) {
      const curr = matrix[row][col];
      const neighbours = getNeightbours(col, row, width, height);

      if (neighbours.every(n => curr < matrix[n[0]][n[1]])) {
        minPoints.push([row, col])
      }
    }
  }

  return minPoints;
};


const getBasins = (matrix, minPoints) => {
  const height = matrix.length - 1;
  const width = matrix[0].length - 1;
  const basins = [];

  for (const point of minPoints) {
    const basin = [];
    const visited = new Set();
    const queue = [point];

    while (queue.length) {
      const [y, x] = queue.shift();
      const currText = `${y},${x}`;

      if (visited.has(currText)) {
        continue;
      }

      if (matrix[y][x] !== 9) {
        visited.add(currText);
        basin.push([y, x]);
        queue.push(...getNeightbours(x, y, width, height));
      }
    }

    basins.push(basin);
  }

  return basins;
};


const partOne = (input) => {
  const matrix = input.split('\n').map(line => line.split('').map(word => Number(word)));
  const minPoints = getMinPoints(matrix);
  return minPoints.reduce((prev, curr) => prev + matrix[curr[0]][curr[1]] + 1, 0);
};


const partTwo = (input) => {
  const matrix = input.split('\n').map(line => line.split('').map(word => Number(word)));
  const minPoints = getMinPoints(matrix);
  const basins = getBasins(matrix, minPoints);
  const sorted = basins.map(b => b.length).sort((a, b) => b - a);
  return sorted[0] * sorted[1] * sorted[2];
};


export default { partOne, partTwo };
