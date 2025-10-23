const { JSDOM } = require('jsdom');

const dom = new JSDOM('<!doctype html><html><body></body></html>', {
  pretendToBeVisual: true,
});
const { window } = dom;

global.window = window;
global.document = window.document;
global.navigator = window.navigator;
global.HTMLElement = window.HTMLElement;
global.Element = window.Element;
global.Node = window.Node;
global.HTMLCanvasElement = window.HTMLCanvasElement;
global.CanvasRenderingContext2D = window.CanvasRenderingContext2D;
global.addEventListener = window.addEventListener.bind(window);
global.removeEventListener = window.removeEventListener.bind(window);

const fallbackRaf = (cb) => setTimeout(cb, 0);
const fallbackCancel = (id) => clearTimeout(id);

global.requestAnimationFrame = window.requestAnimationFrame || fallbackRaf;
global.cancelAnimationFrame = window.cancelAnimationFrame || fallbackCancel;

if (!window.requestAnimationFrame) {
  window.requestAnimationFrame = global.requestAnimationFrame;
  window.cancelAnimationFrame = global.cancelAnimationFrame;
}

if (!window.matchMedia) {
  window.matchMedia = () => ({
    matches: false,
    addListener: () => {},
    removeListener: () => {},
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => false,
  });
}

if (typeof global.ResizeObserver === 'undefined') {
  global.ResizeObserver = class {
    observe() {}
    unobserve() {}
    disconnect() {}
  };
}

if (global.HTMLCanvasElement) {
  const noop = () => {};
  global.HTMLCanvasElement.prototype.getContext = () => ({
    fillRect: noop,
    clearRect: noop,
    getImageData: () => ({ data: [] }),
    putImageData: noop,
    createImageData: () => [],
    setTransform: noop,
    drawImage: noop,
    save: noop,
    fillText: noop,
    restore: noop,
    beginPath: noop,
    closePath: noop,
    moveTo: noop,
    lineTo: noop,
    clip: noop,
    stroke: noop,
    translate: noop,
    scale: noop,
    rotate: noop,
    arc: noop,
    fill: noop,
    measureText: () => ({ width: 0 }),
    transform: noop,
    rect: noop,
    globalAlpha: 1,
    fillStyle: '',
    strokeStyle: '',
    shadowBlur: 0,
    shadowColor: '',
    shadowOffsetX: 0,
    shadowOffsetY: 0,
  });
  global.HTMLCanvasElement.prototype.toDataURL = () => '';
}

const fs = require('fs');
const path = require('path');
const _carbonLibraries = require('./dist');

const pathname = './dist';
const filename = 'index.json';
const content = JSON.stringify(_carbonLibraries);

(async () => {
  if (!fs.existsSync(pathname)) {
    console.log('Creating directory:', pathname);
    fs.mkdirSync(pathname, { recursive: true });
  }

  const jsonFilePath = path.resolve(pathname, filename);
  console.log('Writing library content to:', jsonFilePath);
  fs.writeFileSync(jsonFilePath, content);

  process.exit();
})();
