import { readInputFile } from '../utils/readInputFile';

const partOne = async () => {
  console.log('Running day 1, part 1 solution...');
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

const partTwo = async () => {
  console.log('Running day 1, part 2 solution...');
  const input = await readInputFile(1);

  const {
    leftColumn,
    rightColumn,
  } = input.reduce<{ leftColumn: number[], rightColumn: number[] }>((acc, line) => {
    const [left, right] = line;
    acc.leftColumn.push(parseInt(left));
    acc.rightColumn.push(parseInt(right));
    return acc;
  }, {
    leftColumn: [],
    rightColumn: [],
  });

  const countMap: { [key: string]: number[] } = {};
  const pendingMap: { [key: string]: number[] } = {};
  let converted = 0;
  input.forEach((line: string[], index) => {
    const [left, right] = line;
    countMap[left] = countMap[left] ?? [];

    if (countMap[right] !== undefined) {
      countMap[right].push(index);
    } else {
      pendingMap[right] = [...(pendingMap[right] ?? []), index];
    }

    console.log({ countMapEntry: countMap[right], pendingMapEntry: pendingMap[right] });

    if (pendingMap[left] !== undefined) {
      console.log({ convert: left, pendingMap: pendingMap[left] });
      converted++;
      countMap[left].push(...pendingMap[left]);
      delete pendingMap[left];
    }
  });



  const similarityScore = input.reduce((acc, [left]) => {
    const add = (parseInt(left) * (countMap[left]?.length ?? 0));
    return acc + add;
  }, 0);

  return similarityScore;
};

(async () => {
  const answerOne = await partOne();
  const answerTwo = await partTwo();
  console.log({ answerOne, answerTwo });
})();