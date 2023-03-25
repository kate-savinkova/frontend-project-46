import { compareFiles, getFixturePath, convertFile } from "./index.js";

export default (filepath1, filepath2) => {
    const right1 = getFixturePath(filepath1);
    const right2 = getFixturePath(filepath2);
    const data1 = convertFile(right1);
    const data2 = convertFile(right2);

    const res = compareFiles(data1, data2, 0);
    return res;
};

// export genDiff;
