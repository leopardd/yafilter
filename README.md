# yafilter
Yet another image filter

## Getting Started
1. Install [Node.js](https://nodejs.org/)
2. Install global: `npm install -g bower gulp browser-sync`
3. Set path (e.g. `cd C:\xampp\htdocs\jojoee.com\yafilter`)
4. Install dependencies: `bower install && npm install`

## Note
- Code style: [Airbnb](https://github.com/airbnb/javascript)

## TODO
- [ ] Unit test
- [ ] Fix testing script
- [x] Implement template engine
- [ ] Optimize logic
- [ ] Cannot handle large image size
- [x] Refactor

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
- Photo by [Clem Onojeghuo](https://unsplash.com/photos/phIDtKzQN8k), [Samuel Zeller](https://unsplash.com/photos/CwkiN6_qpDI), [nobacks.com](http://nobacks.com/)
