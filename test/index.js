const assert = require('assert');
const fs = require('fs');
const path = require('path');

const parse = require('../src');

const target = path.resolve(__dirname, '../example/example.md');


describe('markdown-yaml-meta', () => {

  it('should throw error when path is notexisted',  () => {
    assert.throws(() => parse(__dirname, './null.md'), Error);
  });

  it('should throw error when target has no yaml header',  () => {
    assert.throws(() => parse(path.resolve(__dirname, '../example/example-2.md')), Error);
  });

  it('should return yaml data by json object',  () => {
    const yamlData = parse(target);
    assert.equal(Object.prototype.toString.call(yamlData), '[object Object]');
  });

  it('should return object has preview and specified length',  () => {
    const yamlData = parse(target, { preview: true, length : 10 });
    assert(yamlData.preview.length, 10);
    assert.equal(yamlData.hasOwnProperty('body'), false);
    assert.equal(yamlData.hasOwnProperty('preview'), true);
  });

  it('shold return object has filterable preview content', () => {
    const yamlData = parse(target, { preview: { raw: false }, length : 10 });
    assert.equal(/[\\\`\*\_\[\]\#\+\-\!\>]/g.test(yamlData.preview), true)

    const rawYamlPreviewData = parse(target, { preview: { raw: true }});
    assert.equal(/[\\\`\*\_\[\]\#\+\-\!\>]/g.test(rawYamlPreviewData.preview), false)
  })

  it('should return obejct has body',  () => {
    const yamlData = parse(target, { preview: true, body : true });
    assert.equal(yamlData.hasOwnProperty('body'), true);
  });

});