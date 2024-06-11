import { validatePage, injectGrid, setBadge } from './tasks';
import { setStorage } from '@carbon/devtools-utilities/src/setStorage';
import packageJSON from '../../package.json';

setStorage({ version: packageJSON.version });
setBadge();
validatePage();
injectGrid();
