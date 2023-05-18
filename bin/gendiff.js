#!/usr/bin/env node

import { Command } from "commander";
import genDiff from "../src/index.js";

const program = new Command();

program
  .description("Compares two configuration files and shows a difference.")
  .version("1.0.0")
  .arguments("<filepath1> <filepath2>")
  .option("-f, --format <type>", "output format", "stylish")
  .action((filepath1, filepath2) => {

    const res = genDiff(filepath1, filepath2, program.format);
    console.log(res);
  });

program.parse();
