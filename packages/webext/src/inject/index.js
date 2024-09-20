import './index.scss';
import { sendMessage } from '@carbon/devtools-utilities/src/sendMessage';
import {
  initGrid,
  initSpecs,
  initInventory,
  initTooltip,
  initShortcuts,
  injectHighlights,
  initBreakpointLabel,
} from './components';

if (!self.carbonDevtoolsInjected) {
  injectHighlights();
  initGrid();
  initSpecs();
  initTooltip();
  initInventory();
  initShortcuts();
  initBreakpointLabel();

  self.carbonDevtoolsInjected = true;
  sendMessage({ carbonDevtoolsInjected: true });
}
