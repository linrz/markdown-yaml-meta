# markdown-yaml-meta

## Usage
```sh
$ npm install markdown-yaml-meta
```
## Examples
```
---
layout:     post
title:      "Hello World"
date:       2018-04-26 00:00:00
author:     "linrz"
tags:
    - Node.js
---

# Hello Wrold
> Hello, this is an article based on markdown.

## H2 title
## H3 title

```
```js
const fs = require('fs');
const MetaParser = require('markdown-yaml-meta');

const target = path.resolve(__dirname. './blog.md');

const data = MetaParser(target);
console.log(data);
/*
    {
        "layout": "post",
        "title": "Hello World",
        "date": "2018-04-26 00:00:00",
        "author": "linrunze"
        "tags": "['Node.js']"
    }
*/

const dataWithPreview = MetaParser(target, { preview: { length: 10 } });
console.log(dataWithPreview);
/*
    {
        ...
        "preview": "#Hello\n He..."
    }
*/

const dataWithRawPreview = MetaParser(target, { preview: { length: 10, raw: true } });
console.log(dataWithRawPreview);
/*
    {
        ...
        "preview": "Hello Wrol..."
    }
*/

const dataWithBody = MetaParser(target, { body: true });
console.log(dataWithBody);
/*
    {
        ...
        "body": "# Hello Wrold\n> Hello..."
    }
*/
```

## Contributing
PR Welcome.

## License
**markdown-yaml-meta** © [linrz](https://github.com/linrz), Released under the [MIT](./LICENSE) License.