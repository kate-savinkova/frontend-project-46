import { readFileSync } from "fs";
import _ from "lodash";
import { fileURLToPath } from "url";
import path from "path";
import yaml from "js-yaml";

const convertFile = (file) => {
  const ext = path.extname(file);
  if (ext === ".json") {
    return JSON.parse(readFileSync(file, "utf-8"));
  }
  if (ext === ".yml") {
    return yaml.load(readFileSync(file, "utf8"));
  }
  return null;
};

const getFixturePath = (filename) => {
  const __dirname = path.dirname(fileURLToPath(import.meta.url));
  return path.join(__dirname, "..", "__fixtures__", filename);
};

const compareFiles = (obj1, obj2, deep) => {
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
          const inner = compareFiles(obj1[key], obj2[key], deep + 1);
          res.push(`${replace.repeat(deep + 1)}  ${key}:\n${inner}`);
        } else if (obj1[key] === obj2[key]) {
          res.push(`${replace.repeat(deep + 1)}  ${key}: ${obj1[key]}`);
        } else {
          res.push(`${replace.repeat(deep + 1)}- ${key}: ${obj1[key]}`);
          res.push(`${replace.repeat(deep + 1)}+ ${key}: ${obj2[key]}`);
        }
      } else if (typeof obj1[key] === "object") {
        const inner = compareFiles(obj1[key], {}, deep + 1);
        res.push(`${replace.repeat(deep + 1)}- ${key}:\n${inner}`);
      } else {
        res.push(`${replace.repeat(deep + 1)}- ${key}: ${obj1[key]}`);
      }
    } else if (typeof obj2[key] === "object") {
      const inner = compareFiles(obj2[key], {}, deep + 1);
      res.push(`${replace.repeat(deep + 1)}+ ${key}:\n${inner}`);
    } else {
      res.push(`${replace.repeat(deep + 1)}+ ${key}: ${obj2[key]}`);
    }
  });

  res.push(`${replace.repeat(deep)}}`);
  return res.join("\n");
};

export { getFixturePath, convertFile, compareFiles };
