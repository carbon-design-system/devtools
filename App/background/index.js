import {
    validatePage,
    injectGrid,
    setBadge
} from './tasks';
import { setClientId } from '../utilities';

setClientId();
injectGrid();
setBadge();
validatePage();
injectGrid();