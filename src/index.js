import _ from "lodash";
import buildTree from "./buildTree.js";
import formatData from "./format.js";
import parse from "./parsers.js"

const genDiff = (filePath1, filePath2, format = 'stylish') => {
  const data1 = parse(filePath1);
  const data2 = parse(filePath2);
  const diffInfo = buildTree(data1, data2);
  const formattedTree = formatData(diffInfo, format = 'stylish');

  return formattedTree;
};

export default genDiff;
