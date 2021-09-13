import { validatePage, injectGrid, setBadge } from './tasks';
import { setVersion, setClientId } from '@carbon/devtools-utilities';
import packageJSON from '../../package.json';

setVersion(packageJSON.version);
setClientId();
setBadge();
validatePage();
injectGrid();
