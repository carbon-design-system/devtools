import { themes } from '@carbon/themes';

// identifying which ones belong to text, background,
// and such helps increase our chances of detecting an
// accurate token by removing unrelated tokens with the
// same value

const themeKeys = {
    theme: Object.keys(themes),
    unique: ['uiBackground', 'field01', 'field02', 'disabled01'],
    border: ['ui03', 'ui04', 'ui05', 'focus', 'disabled01', 'disabled02'],
    text: [
        'text01',
        'text02',
        'text03',
        'text04',
        'text05',
        'interactive01',
        'interactive02',
        'textError',
        'link01',
        'inverse01',
        'inverseLink',
        'hoverPrimaryText',
        'skeleton02',
        'disabled02',
        'disabled03',
        'visitedLink'
    ],
    background: [
        'uiBackground',
        'danger',
        'ui01',
        'ui02',
        'ui03',
        'interactive01',
        'interactive02',
        'interactive03',
        'field01',
        'field02',
        'inverse02',
        'overlay01',
        'hoverUI',
        'disabled01'
    ],
    icon: ['interactive04', 'icon01', 'icon02', 'icon03', 'inverse01', 'disabled02', 'disabled03']
};

function prioritizeThemes (key, theme) {
    if (themeKeys.unique.indexOf(key) > -1) {
        // does this key match a unique theme token?
        // cycle through and find which theme the value belongs to...
        const themeLocation = themeKeys.theme.indexOf(theme);

        themeKeys.theme.splice(themeLocation, 1);
        themeKeys.theme.unshift(theme);
    }

}

export { themeKeys, prioritizeThemes };