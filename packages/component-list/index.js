const fs = require('fs');
const path = require('path');
const _carbonLibraries = require('./dist');

const pathname = './dist';
const filename = 'index.json';
const content = JSON.stringify(_carbonLibraries);

if (!fs.existsSync(pathname)) {
  fs.mkdirSync(pathname, { recursive: true });
}

fs.writeFile(path.resolve(pathname, filename), content, function (err) {
  if (err) {
    throw err;
  }
});
