import fs from 'fs';
import { dotcomPrefix } from '../../../web-extension/src/globals/prefixSelectors.js';
import { _initStats, camelCase } from '../helpers.js';

const _ibmdotcomWebComponentsDir =
  '../../node_modules/@carbon/ibmdotcom-web-components/es/components';
const { _stats, success } = new _initStats();
const ibmdotcom = {
  name: 'Carbon for IBM.com',
  components: {},
  _stats,
};

try {
  const components = fs.readdirSync(_ibmdotcomWebComponentsDir);

  components.forEach((file) => {
    const name = camelCase(file.replace(/-/g, ' ')).replace('Cta', 'CTA');
    const identifier = `[data-autoid="${dotcomPrefix}--${file}"]`;

    ibmdotcom.components[identifier] = name;
    success();
  });
} catch (e) {
  console.log(e);
}

export { ibmdotcom };
