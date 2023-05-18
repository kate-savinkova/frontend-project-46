import makeStylish from "./stylish.js";

const formatData = (data, format) => {
    switch (format) {
        case 'stylish':
            return makeStylish(data);
        default:
            throw new Error(`Invalid file format type: '.${format}'! Try supported file formats.`);
    }
}

export default formatData;