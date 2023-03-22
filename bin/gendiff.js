#!/usr/bin/env node

import { Command } from "commander";
import { fileURLToPath } from "url";
import path from "path";
import genDiff from "../src/index.js";

const program = new Command();

program
  .description("Compares two configuration files and shows a difference.")
  .version("1.0.0")
  .arguments("<filepath1> <filepath2>")
  .option("-f, --format <type>", "output format")
  .action((filepath1, filepath2) => {
    const __dirname = path.dirname(fileURLToPath(import.meta.url));
    const getFixturePath = (filename) =>
      path.join(__dirname, "..", "__fixtures__", filename);

    const file1 = getFixturePath(filepath1);
    const file2 = getFixturePath(filepath2);

    const res = genDiff(file1, file2);
    console.log(res);
  });

program.parse();
