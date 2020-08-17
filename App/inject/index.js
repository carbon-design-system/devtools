import './index.scss';
import { initGrid, initInventory, initTooltip } from './components';

window.carbonDevtoolsInjected = true;

initGrid();
initTooltip();
initInventory();

// TODO: figure out why injected twice?
// console.log('asdf');
