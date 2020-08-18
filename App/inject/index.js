import './index.scss';
import { initGrid, initInventory, initTooltip, initShortcuts } from './components';

if (!window.carbonDevtoolsInjected) {
    initGrid();
    initTooltip();
    initInventory();
    initShortcuts();

    window.carbonDevtoolsInjected = true;
}

// TODO: figure out why injected twice?
// console.log('asdf');
