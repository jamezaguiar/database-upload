import csvParse from 'csv-parse';
import fs from 'fs';
import path from 'path';

const importPath = path.resolve(__dirname, '..', '..', 'tmp');

export default async function loadCSV(fileName: string): Promise<string[]> {
  const readCSVStream = fs.createReadStream(path.resolve(importPath, fileName));

  const parseStream = csvParse({
    from_line: 2,
    ltrim: true,
    rtrim: true,
  });

  const parseCSV = readCSVStream.pipe(parseStream);

  const lines: string[] = [];

  parseCSV.on('data', line => {
    lines.push(line);
  });

  await new Promise(resolve => {
    parseCSV.on('end', resolve);
  });

  return lines;
}
