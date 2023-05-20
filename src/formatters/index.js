import makeStylish from "./stylish.js";
import makePlain from "./plain.js";

const formatData = (data, format) => {
    switch (format) {
        case 'stylish':
            return makeStylish(data);
        case 'plain':
            return makePlain(data);
        default:
            return new Error(`Invalid file format type: '.${format}'! Try supported file formats.`);
    }
}

export default formatData;