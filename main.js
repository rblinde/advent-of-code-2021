import fs from 'fs';
import days from './days/index.js';

const getInputFile = day => `./inputs/day${day.toString().padStart(2, '0')}.txt`;

const day = parseInt(process.argv[2]) || 1;

if (day > days.length) {
  console.error('Solutions not found!');
  process.exit(1);
}

const solutions = days[day - 1];
const input = fs.readFileSync(getInputFile(day), { encoding: 'utf8', flag: 'r' });

console.log('Part 1:', solutions.partOne(input));
console.log('Part 2:', solutions.partTwo(input));
