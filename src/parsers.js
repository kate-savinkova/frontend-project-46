import { readFileSync } from "fs";
import { fileURLToPath } from "url";
import path from "path";
import yaml from "js-yaml";

const getFixturePath = (filename) => {
    const __dirname = path.dirname(fileURLToPath(import.meta.url));
    return path.join(__dirname, "..", "__fixtures__", filename);
};

const convertFile = (file) => {
    const ext = path.extname(file);
    switch (ext) {
        case '.json':
            return JSON.parse(readFileSync(file, "utf-8"));
        case '.yml':
        case '.yaml':
            return yaml.load(readFileSync(file, "utf8"));
        default:
            throw new Error(`Invalid file extension: '${ext}'! Try supported formats.`);
    }
};

const parse = (filepath) => {
    const rightPath = getFixturePath(filepath);
    const fileData = convertFile(rightPath);

    return fileData;
};

export default parse;