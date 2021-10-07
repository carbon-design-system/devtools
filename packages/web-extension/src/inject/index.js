import './index.scss';
import {
  initGrid,
  initSpecs,
  initInventory,
  initTooltip,
  initShortcuts,
  injectHighlights,
  initBreakpointLabel,
} from './components';

if (!window.carbonDevtoolsInjected) {
  injectHighlights();
  initGrid();
  initSpecs();
  initTooltip();
  initInventory();
  initShortcuts();
  initBreakpointLabel();

  window.carbonDevtoolsInjected = true;
}
