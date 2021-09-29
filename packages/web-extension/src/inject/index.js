import './index.scss';
import {
  initGrid,
  initSpecs,
  initInventory,
  initTooltip,
  initShortcuts,
  injectHighlights,
} from './components';

if (!window.carbonDevtoolsInjected) {
  injectHighlights();
  initGrid();
  initSpecs();
  initTooltip();
  initInventory();
  initShortcuts();

  window.carbonDevtoolsInjected = true;
}
