import fs from 'fs';
import { dotcomPrefix } from '../../../web-extension/src/globals/prefixSelectors.js';
import { _initStats, camelCase } from '../helpers.js';

const _ibmdotcomWebComponentsV11Dir =
  '../../node_modules/@carbon/ibmdotcom-web-components-v2/es/components';
const { _stats, success } = new _initStats();
const ibmdotcomV11 = {
  name: 'Carbon for IBM.com',
  version: 'v11',
  components: {},
  _stats,
};

try {
  const components = fs.readdirSync(_ibmdotcomWebComponentsV11Dir);

  components.forEach((file) => {
    const name = camelCase(file.replace(/-/g, ' ')).replace('Cta', 'CTA');
    const identifier = `[data-autoid="${dotcomPrefix}--${file}"]`;

    ibmdotcomV11.components[identifier] = name;
    success();
  });
} catch (e) {
  console.log(e);
}

export { ibmdotcomV11 };
