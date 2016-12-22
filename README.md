# yafilter
Yet another image filter

## Getting Started
1. Install [Node.js](https://nodejs.org/)
2. Install global: `npm install -g bower gulp browser-sync`
3. Set path (e.g. `cd C:\xampp\htdocs\jojoee.com\yafilter`)
4. Install dependencies: `bower install && npm install`

## Note
- Code style: [Airbnb](https://github.com/airbnb/javascript)
- Pixel operation (e.g. `add`, `average`) have to be processed in `Util` class

## TODO
- [ ] Unit test
- [ ] Fix - Testing script
- [x] Implement template engine
- [ ] Optimize logic
- [ ] Cannot handle large image size
- [x] Refactor
- [ ] Implement `Promise`
- [ ] Fix - Cannot change result image dimension from original

## Stack: Javascript
- Canvas
- Image processing / manipulation
- Web worker
- Templat engine

## Compatible with
- Latest Chrome

## Why Web Workers
```
perform processor-intensive calculations without blocking UI thread.

1. Analysis
- text: code syntax highlighting (souldn't block code editor)
- text: real-time text formatting
- text: spell checker
- video data
- audio data
- image data (e.g. image filtering in <canvas>)

2. Fetching
- pre: polling of webservices
- sub: caching data with SW
- sub: merge with template

3. Background I/O
- updating local browser DB

4. Big data
- processing large data
```

## Reference
- [TinyJPG](https://tinyjpg.com/)
- Photo by [Clem Onojeghuo](https://unsplash.com/photos/phIDtKzQN8k), [Samuel Zeller](https://unsplash.com/photos/CwkiN6_qpDI), [nobacks.com](http://nobacks.com/), [cutoutlife.com](http://www.cutoutlife.com/), [mrcutout.com](http://www.mrcutout.com/), [skalgubbar.se](http://skalgubbar.se/)
- JavaScript DocBlock standard, [usejsdoc.org](http://usejsdoc.org/tags-param.html), [devdocs.magento.com](http://devdocs.magento.com/guides/v2.0/coding-standards/docblock-standard-javascript.html)

