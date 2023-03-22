// import { test, expect } from "@jest/globals";
import { fileURLToPath } from "url";
import path from "path";
import genDiff from "../src/index.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const getFixturePath = (filename) =>
  path.join(__dirname, "..", "__fixtures__", filename);

const file1 = getFixturePath("file1.json");
const file2 = getFixturePath("file2.json");
const res = `{
  - follow: false
    host: hexlet.io
  - proxy: 123.234.53.22
  - timeout: 50
  + timeout: 20
  + verbose: true
}`;

test("half", () => {
  expect(genDiff(file1, file2)).toEqual(res);
});
