import _ from 'lodash';

const stringify = (data) => {
    if (!_.isObject(data)) {
        if (typeof (data) === "boolean" || data === null) {
            return `${data}`.trimEnd();
        }
        return `'${data}'`.trimEnd();
    }
    return '[complex value]';
};

const sentence = {
    added: 'was added with value:',
    deleted: 'was removed',
    changed: 'was updated. From'
};

const iter = (tree, previousKeys) => tree.map((node) => {

    const newProperty = previousKeys.length > 0 ? [previousKeys, node.key].join('.') : `${node.key}`;

    switch (node.state) {
        case 'added':
            return `Property '${newProperty}' ${sentence.added} ${stringify(node.value)}`;
        case 'deleted':
            return `Property '${newProperty}' ${sentence.deleted}`;
        case 'unchanged':
            return null;
        case 'changed':
            return `Property '${newProperty}' ${sentence.changed} ${stringify(node.value1)} to ${stringify(node.value2)}`;
        case 'nested':
            return iter(node.value, newProperty).filter(Boolean).join('\n');
        default:
            throw new Error(`Type: ${node.state} is undefined`);
    }
});

const makePlain = (diff) => {
    const plainDiff = iter(diff, '').join('\n');
    return plainDiff;
};

export default makePlain;