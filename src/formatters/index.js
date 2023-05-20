import makeStylish from "./stylish.js";
import makePlain from "./plain.js";
import makeJson from "./json.js";

const formatData = (data, format) => {
    switch (format) {
        case 'stylish':
            return makeStylish(data);
        case 'plain':
            return makePlain(data);
        case 'json':
            return makeJson(data);
        default:
            return new Error(`Invalid file format type: '.${format}'! Try supported file formats.`);
    }
}

export default formatData;