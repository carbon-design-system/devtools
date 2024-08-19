import { prefix } from '@carbon/web-components/es/globals/settings.js';



const html = document.querySelector('html');
const outlineClass = `${prefix}--specs--outline`;

function manageSpecsOutline(specs, specOutline) {
  if (specs && specOutline) {
    activateOutline();
  } else {
    deactiveOutline();
  }
}

function activateOutline() {
  html.classList.add(outlineClass);
}

function deactiveOutline() {
  html.classList.remove(outlineClass);
}

export { manageSpecsOutline };
