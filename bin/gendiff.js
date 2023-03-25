#!/usr/bin/env node

import { Command } from "commander";
import * as genDiff from "../src/parsers.js";

const program = new Command();

program
  .description("Compares two configuration files and shows a difference.")
  .version("1.0.0")
  .arguments("<filepath1> <filepath2>")
  .option("-f, --format <type>", "output format")
  .action((filepath1, filepath2) => {
    /* const file1 = getFixturePath(filepath1);
    const file2 = getFixturePath(filepath2); */

    const res = genDiff(filepath1, filepath2);
    console.log(res);
  });

program.parse();
