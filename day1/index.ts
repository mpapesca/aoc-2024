import { readInputFile } from '../utils/readInputFile';

const run = async () => {
  console.log('Running day 1 solution...');
  const input = await readInputFile(1);

  const {
    left: leftColumn,
    right: rightColumn,
  } = input.reduce<{ left: number[], right: number[] }>((acc, line) => {
    const [left, right] = line;
    acc.left.push(parseInt(left));
    acc.right.push(parseInt(right));
    return acc;
  }, {
    left: [],
    right: [],
  });

  const sortedLeft = leftColumn.sort((a, b) => a - b);
  const sortedRight = rightColumn.sort((a, b) => a - b);

  const totalDiff = sortedLeft.reduce((acc, left, index) => {
    const right = sortedRight[index];
    const diff = Math.abs(left - right);
    return acc + diff;
  }, 0);

  return totalDiff;
};

(async () => {
  const answer = await run();
  console.log({ answer });
})();