import { settings } from 'carbon-components';

const { prefix } = settings;
const devtoolClass = `${prefix}--devtools`;
const interactionModifier = `${devtoolClass}--interact`;
const shift = 16;
const backquote = 192;

function initToggleColumns() {
  const columns = document.querySelectorAll(`[class*="${prefix}--col"]`);

  columns.forEach((column) => {
    column.addEventListener('click', toggleColumn);
  });
}

function toggleColumn(e) {
  const column = e.currentTarget;
  column.classList.toggle(`${prefix}--col--minimize`);
}

function addGridInteraction(handleKeys) {
  if (
    handleKeys.length === 2 &&
    handleKeys.indexOf(backquote) > -1 &&
    handleKeys.indexOf(shift) > -1
  ) {
    const devtools = document.querySelector('.' + devtoolClass);
    devtools.classList.add(interactionModifier);
  }
}

function removeGridInteraction(handleKeys) {
  if (
    handleKeys.length === 2 &&
    handleKeys.indexOf(backquote) > -1 &&
    handleKeys.indexOf(shift) > -1
  ) {
    const devtools = document.querySelector('.' + devtoolClass);
    devtools.classList.remove(interactionModifier);
  }
}

export { initToggleColumns, addGridInteraction, removeGridInteraction };
