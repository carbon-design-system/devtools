import { baseFontSize } from '@carbon/layout';

function remtopx (rem) {
    return baseFontSize * parseFloat(rem);
}

export { remtopx };