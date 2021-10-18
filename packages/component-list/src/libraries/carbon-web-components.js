import fs from 'fs';
import { carbonPrefix } from '../../../web-extension/src/globals/prefixSelectors.js';
import { _initStats, camelCase } from '../helpers.js';

const _carbonWebComponentsDir =
  '../../node_modules/carbon-web-components/es/components';
const { _stats, success } = new _initStats();
const carbonWebComponents = { _stats };

try {
  const components = fs.readdirSync(_carbonWebComponentsDir);

  components.forEach((file) => {
    const name = camelCase(file.replace(/-/g, ' '));
    const identifier = `${carbonPrefix}-${file}`;

    carbonWebComponents[identifier] = name;
    success();
  });
} catch (e) {
  console.log(e);
}

export default { 'Carbon web components': carbonWebComponents };
