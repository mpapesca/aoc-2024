import { readInputFile } from '../utils/readInputFile';

const checkIfSafeReport = (report: string[]): boolean => {
  let direction: string | undefined = undefined;
  for (let i = 0; i < (report.length - 1); i++) {
    let current = parseInt(report[i]);
    let next = parseInt(report[i + 1]);
    const currentDirection: string | undefined = current !== next ? (
      (current > next) ? 'down' : 'up'
    ) : undefined;

    const changedDirection = !!direction && direction !== currentDirection;
    const hasBigChanges = Math.abs(current - next) > 3;
    const unchanged = current === next;

    if (hasBigChanges || changedDirection || unchanged) {
      return false;
    }

    if (!direction && currentDirection) {
      direction = currentDirection;
    }
  }

  return true;
}

const partOne = async () => {
  console.log('Running day 2, part 1 solution...');
  const input = await readInputFile(2);

  const safeReports = input.filter(checkIfSafeReport);

  return safeReports.length;

};


const doubleCheckUnsafeReport = (report: string[]): boolean => {
  for (let i = 0; i < report.length; i++) {
    const isSafe = checkIfSafeReport(report.slice(0, i).concat(report.slice(i + 1)));
    if (isSafe) {
      return true;
    }
  }
  return false;
};



const partTwo = async () => {
  console.log('Running day 2, part 2 solution...');
  const reports = await readInputFile(2);

  const {
    safe: safeReports,
    unsafe: unsafeReports
  } = reports.reduce<{ safe: string[][], unsafe: string[][] }>((acc, report, reportIndex) => {
    const isSafe = checkIfSafeReport(report);

    if (isSafe) {
      acc.safe.push(report);
    } else {
      acc.unsafe.push(report);
    }

    return acc;

  }, { safe: [], unsafe: [] });

  unsafeReports.forEach((report) => {
    const isSafe = doubleCheckUnsafeReport(report);
    if (isSafe) {
      safeReports.push(report);
    }
  });


  return safeReports.length;

};

(async () => {
  const answerOne = await partOne();
  const answerTwo = await partTwo();
  console.log({ answerOne, answerTwo });
})();