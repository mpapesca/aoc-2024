const fs = await import('node:fs/promises');
const path = await import('node:path');

const readInputFile = async (dayNumber: number): Promise<string[][]> => {
  const text = await fs.readFile(path.resolve(__dirname, `../day${dayNumber}/input.txt`), { encoding: 'utf8' });
  const parsedData = text.split('\n').map(line => line.trim().split(' ').filter(entry => entry !== ''));
  return parsedData;
};

export {
  readInputFile,
};
