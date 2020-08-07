import './index.scss';
import { initGrid } from './components/Grid';
import { initInventory } from './components/Inventory';

window.carbonDevtoolsInjected = true;

initGrid();
initInventory();
