import {
    validatePage,
    injectGrid,
    setBadge
} from './tasks';
import { setVersion, setClientId } from '@carbon/devtools-utilities';
import { version } from '../../package.json';

setVersion(version);
setClientId();
setBadge();
validatePage();
injectGrid();