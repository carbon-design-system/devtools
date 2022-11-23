global.navigator = { userAgent: '' };
global.addEventListener = () => {};
// global.join = ( ) => { };

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
