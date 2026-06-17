import fs from 'fs';
import { carbonV11Prefix } from '../../../web-extension/src/globals/prefixSelectors.js';
import { _initStats, camelCase } from '../helpers.js';

const _carbonWebComponentsV11Dir =
  '../../node_modules/@carbon/web-components/es/components';
const { _stats, success } = new _initStats();
const carbonWebComponentsV11 = {
  name: 'Carbon web components',
  version: 'v11',
  components: {},
  _stats,
};

try {
  const components = fs.readdirSync(_carbonWebComponentsV11Dir);

  components.forEach((file) => {
    const name = camelCase(file.replace(/-/g, ' '));
    // @carbon/web-components v2 uses `cds-` prefixed custom elements
    const identifier = `${carbonV11Prefix}-${file}`;

    carbonWebComponentsV11.components[identifier] = name;
    success();
  });
} catch (e) {
  console.log(e);
}

export { carbonWebComponentsV11 };
