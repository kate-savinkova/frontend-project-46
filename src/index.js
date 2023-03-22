import { readFileSync } from "fs";
import _ from "lodash";

const innerFunc = (obj1, obj2, deep) => {
  const replace = "  ";
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
    if (_.has(obj1, key)) {
      if (_.has(obj2, key)) {
        if (typeof obj1[key] === "object" && typeof obj2[key] === "object") {
          const inner = innerFunc(obj1[key], obj2[key], deep + 1);
          res.push(`${replace.repeat(deep + 1)}  ${key}:\n${inner}`);
        } else if (obj1[key] === obj2[key]) {
          res.push(`${replace.repeat(deep + 1)}  ${key}: ${obj1[key]}`);
        } else {
          res.push(`${replace.repeat(deep + 1)}- ${key}: ${obj1[key]}`);
          res.push(`${replace.repeat(deep + 1)}+ ${key}: ${obj2[key]}`);
        }
      } else if (typeof obj1[key] === "object") {
        const inner = innerFunc(obj1[key], {}, deep + 1);
        res.push(`${replace.repeat(deep + 1)}- ${key}:\n${inner}`);
      } else {
        res.push(`${replace.repeat(deep + 1)}- ${key}: ${obj1[key]}`);
      }
    } else if (typeof obj2[key] === "object") {
      const inner = innerFunc(obj2[key], {}, deep + 1);
      res.push(`${replace.repeat(deep + 1)}+ ${key}:\n${inner}`);
    } else {
      res.push(`${replace.repeat(deep + 1)}+ ${key}: ${obj2[key]}`);
    }
  });

  res.push(`${replace.repeat(deep)}}`);
  return res.join("\n");
};

const genDiff = (filepath1, filepath2) => {
  const data1 = JSON.parse(readFileSync(filepath1, "utf-8"));
  const data2 = JSON.parse(readFileSync(filepath2, "utf-8"));

  const res = innerFunc(data1, data2, 0);
  return res;
};

export default genDiff;
