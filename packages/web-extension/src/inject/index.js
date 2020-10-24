import './index.scss';
import {
    initGrid,
    initSpecs,
    initInventory,
    initPageGrade,
    initTooltip,
    initShortcuts
} from './components';

if (!window.carbonDevtoolsInjected) {
    initGrid();
    initSpecs();
    initTooltip();
    initInventory();
    initPageGrade();
    initShortcuts();

    window.carbonDevtoolsInjected = true;
}
