import './index.scss';

import { initGrid } from './components/Grid';


import { allComponents } from '../globals';




console.log(document.querySelectorAll(Object.keys(allComponents).join(', ')));

initGrid();
