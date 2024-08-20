import fs from 'fs';
import { pkg } from '@carbon/ibm-products';
import { _initStats } from '../helpers.js';

const { _stats, success } = new _initStats();
const productsDir = '../../node_modules/@carbon/ibm-products/es/components';
const products = {
  name: 'Carbon for IBM Products',
  components: {},
  _stats,
};
const { getDevtoolsId, devtoolsAttribute } = pkg;

try {
  const components = fs.readdirSync(productsDir);

  components.forEach((file) => {
    if (file === '_Canary' || file === 'index.d.ts') {
      return;
    }

    const identifier = `[${devtoolsAttribute}="${getDevtoolsId(file)}]`;

    products.components[identifier] = file;
    success();
  });
} catch (e) {
  console.log(e);
}

export { products };
