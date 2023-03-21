import { readFileSync } from "fs";
import _ from "lodash";

const genDiff = (filepath1, filepath2) => {
  const data1 = JSON.parse(readFileSync(filepath1, "utf-8"));
  const data2 = JSON.parse(readFileSync(filepath2, "utf-8"));

  const replace = "  ";
  const innerFunc = (obj1, obj2, deep) => {
    const keys1 = _.keys(obj1);
    const keys2 = _.keys(obj2);
    const keys = _.union(keys1, keys2).sort((a, b) => {
      if (a[0] > b[0]) {
        return 1;
      }
      if (a[0] < b[0]) {
        return -1;
      }
      return 0;
    });
    const res = [`${replace.repeat(deep)}{`];

    keys.forEach((key) => {
      if (_.has(data1, key)) {
        if (_.has(data2, key)) {
          if (
            typeof data2[key] === "object" &&
            typeof data1[key] === "object"
          ) {
            const inner = innerFunc(data1[key], data2[key], deep + 1);
            res.push(`${replace.repeat(deep + 1)}  ${key}:\n${inner}`);
          } else if (data1[key] === data2[key]) {
            res.push(`${replace.repeat(deep + 1)}  ${key}: ${data1[key]}`);
          } else {
            res.push(`${replace.repeat(deep + 1)}- ${key}: ${data1[key]}`);
            res.push(`${replace.repeat(deep + 1)}+ ${key}: ${data2[key]}`);
          }
        } else if (typeof data1[key] === "object") {
          const inner = innerFunc(data1[key], {}, deep + 1);
          res.push(`${replace.repeat(deep + 1)}- ${key}:\n${inner}`);
        } else {
          res.push(`${replace.repeat(deep + 1)}- ${key}: ${data1[key]}`);
        }
      } else if (typeof data2[key] === "object") {
        const inner = innerFunc(data2[key], {}, deep + 1);
        res.push(`${replace.repeat(deep + 1)}- ${key}:\n${inner}`);
      } else {
        res.push(`${replace.repeat(deep + 1)}- ${key}: ${data2[key]}`);
      }
    });

    res.push(`${replace.repeat(deep)}}`);
    return res.join("\n");
  };

  const res = innerFunc(data1, data2, 0);
  return res;
};

export default genDiff;
