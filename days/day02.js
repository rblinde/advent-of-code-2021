const partOne = (input) => {
  const lines = input.split('\n');
  let depth = 0;
  let position = 0;

  for (const line of lines) {
    const [command, value] = line.split(' ');

    switch (command) {
      case 'forward':
        position += parseInt(value);
        break;
      case 'down':
        depth += parseInt(value);
        break;
      case 'up':
        depth -= parseInt(value);
        break;
    }
  }

  return depth * position;
}

const partTwo = (input) => {
  const lines = input.split('\n');
  let depth = 0;
  let position = 0;
  let aim = 0;

  for (const line of lines) {
    const [command, value] = line.split(' ');

    switch (command) {
      case 'forward':
        position += parseInt(value);
        depth += parseInt(value) * aim;
        break;
      case 'down':
        aim += parseInt(value);
        break;
      case 'up':
        aim -= parseInt(value);
        break;
    }
  }

  return depth * position;
};


export default { partOne, partTwo };
