const fs = require('fs');
const jsYaml = require('js-yaml');

const yamlRegexp = /^---[\s\S]+?---/;

function parse(path, options = {}) {
  if (!path || !fs.existsSync(path)) {
    throw new Error(`${path} is not existd`);
  }

  const rawData = fs.readFileSync(path, 'utf8');
  
  if (!yamlRegexp.test(rawData)) {
    throw new Error(`${path} doesn't have yaml content at start`);
  }

  const yamlMeta = rawData.match(yamlRegexp)[0];
  const jsonMeta = jsYaml.load(yamlMeta.split('---')[1]);

  const result = { jsonMeta };

  if (!options.preview && !options.body) {
    return result;
  }
  
  const content = rawData.replace(yamlMeta, '').trim();
  
  if (options.body) {
    result.body = content;
  }
  
  if (options.preview) {
    const { preview = {}, length = 70 } = options;
    if (preview.raw) {
      const rawContent = content.replace(/[\\\`\*\_\[\]\#\+\-\!\>]/g, '');
      result.preview = rawContent.slice(0, length).replace(/\n/g, ' ') + '...';
    } else {
      result.preview = content.slice(0, length) + '...';
    }
  }
  return result;
}

module.exports = parse;
