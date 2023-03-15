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
import { isManifestV3 } from '@carbon/devtools-utilities/src/isManifestV3';

if (isManifestV3()) {
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
} else {
  if (!window.carbonDevtoolsInjected) {
    injectHighlights();
    initGrid();
    initSpecs();
    initTooltip();
    initInventory();
    initShortcuts();
    initBreakpointLabel();

    window.carbonDevtoolsInjected = true;
    sendMessage({ carbonDevtoolsInjected: true });
  }
}
