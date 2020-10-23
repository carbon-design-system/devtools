import {
    validatePage,
    injectGrid,
    setBadge
} from './tasks';
import { setClientId } from '../utilities';

setClientId();
setBadge();
validatePage();
injectGrid();