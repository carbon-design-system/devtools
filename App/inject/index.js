import './index.scss';
import { initGrid, initSpecs, initInventory, initTooltip, initShortcuts } from './components';

if (!window.carbonDevtoolsInjected) {
    initGrid();
    initSpecs();
    initTooltip();
    initInventory();
    initShortcuts();

    window.carbonDevtoolsInjected = true;
}
