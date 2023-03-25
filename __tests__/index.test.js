import { getFixturePath } from "../src/index.js";
import * as genDiff from "../src/parsers.js";

const file1 = getFixturePath("../__fixtures__/file1.json");
const file2 = getFixturePath("../__fixtures__/file2.json");
const f1 = getFixturePath("../__fixtures__/f1.yml");
const f2 = getFixturePath("../__fixtures__/f2.yml");
const res = `{
  - follow: false
    host: hexlet.io
  - proxy: 123.234.53.22
  - timeout: 50
  + timeout: 20
  + verbose: true
}`;

test("json files", () => {
  expect(genDiff(file1, file2)).toEqual(res);
});

test("yml files", () => {
  expect(genDiff(f1, f2)).toEqual(res);
});
