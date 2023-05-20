import fs from 'fs';
import path from 'path';
import genDiff from '../src/index.js';

const file1 = "file1.json";
const file2 = "file2.json";
const f1 = "f1.yml";
const f2 = "f2.yml";

const getPath = (filename, format) => (
  path.join('.', '__fixtures__', `${filename}.${format}`)
);

let output;

beforeAll(() => {
  output = {
    stylish: fs.readFileSync(getPath('result-stylish-output', 'txt'), 'utf-8'),
    plain: fs.readFileSync(getPath('result-plain-output', 'txt'), 'utf-8'),
    json: fs.readFileSync(getPath('result-json-output', 'txt'), 'utf-8'),
  };
});

test("stylish test", () => {
  expect(genDiff(file1, file2, 'stylish')).toEqual(output.stylish);
  expect(genDiff(f1, f2, 'stylish')).toEqual(output.stylish);
});

test("plain test", () => {
  expect(genDiff(file1, file2, 'plain')).toEqual(output.plain);
  expect(genDiff(f1, f2, 'plain')).toEqual(output.plain);
});

test("json test", () => {
  expect(genDiff(file1, file2, 'json')).toEqual(output.json);
  expect(genDiff(f1, f2, 'json')).toEqual(output.json);
});

