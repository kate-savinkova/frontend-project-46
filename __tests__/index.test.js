import genDiff from "../src/index.js";

const file1 = "file1.json";
const file2 = "file2.json";
const f1 = "f1.yml";
const f2 = "f2.yml";

const stylish = `{
    common: {
      + follow: false
        setting1: Value 1
      - setting2: 200
      - setting3: true
      + setting3: null
      + setting4: blah blah
      + setting5: {
            key5: value5
        }
        setting6: {
            doge: {
              - wow: 
              + wow: so much
            }
            key: value
          + ops: vops
        }
    }
    group1: {
      - baz: bas
      + baz: bars
        foo: bar
      - nest: {
            key: value
        }
      + nest: str
    }
  - group2: {
        abc: 12345
        deep: {
            id: 45
        }
    }
  + group3: {
        deep: {
            id: {
                number: 45
            }
        }
        fee: 100500
    }
}`;

const plain = "Property 'common.follow' was added with value: false\n" +
  "Property 'common.setting2' was removed\n" +
  "Property 'common.setting3' was updated. From true to null\n" +
  "Property 'common.setting4' was added with value: 'blah blah'\n" +
  "Property 'common.setting5' was added with value: [complex value]\n" +
  "Property 'common.setting6.doge.wow' was updated. From '' to 'so much'\n" +
  "Property 'common.setting6.ops' was added with value: 'vops'\n" +
  "Property 'group1.baz' was updated. From 'bas' to 'bars'\n" +
  "Property 'group1.nest' was updated. From [complex value] to 'str'\n" +
  "Property 'group2' was removed\n" +
  "Property 'group3' was added with value: [complex value]";

test("stylish test", () => {
  expect(genDiff(file1, file2, 'stylish')).toEqual(stylish);
  expect(genDiff(f1, f2, 'stylish')).toEqual(stylish);
});

test("plain test", () => {
  expect(genDiff(file1, file2, 'plain')).toEqual(plain);
  expect(genDiff(f1, f2, 'plain')).toEqual(plain);
});
