import { validatePage, injectGrid, setBadge } from './tasks';
import { setStorage } from '@carbon/devtools-utilities/src/setStorage';
import { setClientId } from '@carbon/devtools-utilities/src/ga';
import packageJSON from '../../package.json';

setStorage({ version: packageJSON.version });
setClientId();
setBadge();
validatePage();
injectGrid();
