const path = require('path');
const YamlMetaParser = require('../src');

const exampleFile = path.resolve(__dirname, './example.md');

const data = YamlMetaParser(exampleFile, {
    preview: { length: 170, raw: true },
    body: true
});

console.log(data);