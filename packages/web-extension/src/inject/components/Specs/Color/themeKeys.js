import { themes } from '@carbon/themes';
import { themes as themesV11 } from '@carbon/themes-v11';

// identifying which ones belong to text, background,
// and such helps increase our chances of detecting an
// accurate token by removing unrelated tokens with the
// same value

// ---- Carbon v10 theme keys ----
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
    'visitedLink',
  ],
  background: [
    'uiBackground',
    'danger',
    'ui01',
    'ui02',
    'ui03',
    'field01',
    'field02',
    'inverse02',
    'overlay01',
    'hoverUI',
    'disabled01',
    'interactive01',
    'interactive02',
    'interactive03',
  ],
  icon: [
    'interactive04',
    'icon01',
    'icon02',
    'icon03',
    'inverse01',
    'disabled02',
    'disabled03',
  ],
};

// ---- Carbon v11 theme keys ----
const themeKeysV11 = {
  theme: Object.keys(themesV11),
  unique: ['background', 'layer01', 'layer02', 'field01', 'field02'],
  border: [
    'borderSubtle01',
    'borderSubtle02',
    'borderSubtle03',
    'borderStrong01',
    'borderStrong02',
    'borderStrong03',
    'borderInteractive',
    'borderDisabled',
    'borderInverse',
    'focus',
  ],
  text: [
    'textPrimary',
    'textSecondary',
    'textPlaceholder',
    'textHelper',
    'textError',
    'textInverse',
    'textOnColor',
    'textOnColorDisabled',
    'textDisabled',
    'linkPrimary',
    'linkSecondary',
    'linkVisited',
    'linkInverse',
  ],
  background: [
    'background',
    'backgroundHover',
    'backgroundActive',
    'backgroundSelected',
    'backgroundInverse',
    'backgroundBrand',
    'layer01',
    'layer02',
    'layer03',
    'layerAccent01',
    'layerAccent02',
    'layerAccent03',
    'field01',
    'field02',
    'field03',
    'overlay',
    'skeletonBackground',
    'skeletonElement',
  ],
  icon: [
    'iconPrimary',
    'iconSecondary',
    'iconInverse',
    'iconOnColor',
    'iconOnColorDisabled',
    'iconInteractive',
    'iconDisabled',
  ],
};

function prioritizeThemes(key, theme) {
  if (themeKeys.unique.indexOf(key) > -1) {
    // does this key match a unique theme token?
    // cycle through and find which theme the value belongs to...
    const themeLocation = themeKeys.theme.indexOf(theme);

    themeKeys.theme.splice(themeLocation, 1);
    themeKeys.theme.unshift(theme);
  }
}

function prioritizeThemesV11(key, theme) {
  if (themeKeysV11.unique.indexOf(key) > -1) {
    const themeLocation = themeKeysV11.theme.indexOf(theme);

    themeKeysV11.theme.splice(themeLocation, 1);
    themeKeysV11.theme.unshift(theme);
  }
}

export { themeKeys, themeKeysV11, prioritizeThemes, prioritizeThemesV11 };
