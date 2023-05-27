import { readFileSync } from 'fs';
import path from 'path';
import genDiff from '../src/index.js';

const inputFormats = ['json', 'yml'];

const getPath = (filename, format) => (
  path.resolve('.', '__fixtures__', `${filename}.${format}`)
  //path.join('.', '__fixtures__', `${filename}.${format}`)
);

let output;

beforeAll(() => {
  output = {
    stylish: readFileSync(getPath('result-stylish-output', 'txt'), 'utf-8'),
    plain: readFileSync(getPath('result-plain-output', 'txt'), 'utf-8'),
    json: readFileSync(getPath('result-json-output', 'txt'), 'utf-8'),
  };
});

describe.each(inputFormats)('gendiff for %p files', (format) => {
  const f1 = `f1.${format}`;
  const f2 = `f2.${format}`;

  test('formatter [stylish]', () => {
    expect(genDiff(f1, f2, 'stylish')).toBe(output.stylish);
  });

  test('formatter [plain]', () => {
    expect(genDiff(f1, f2, 'plain')).toBe(output.plain);
  });

  test('formatter [json]', () => {
    expect(genDiff(f1, f2, 'json')).toBe(output.json);
  });
});