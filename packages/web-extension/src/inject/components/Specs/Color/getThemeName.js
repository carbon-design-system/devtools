import { themes } from '@carbon/themes';
import { themes as themesV11 } from '@carbon/themes-v11';
import { themeKeys, themeKeysV11 } from './themeKeys';
import { searchCarbonTokens, prioritizeThemesV11 } from './searchCarbonTokens';

/**
 * Detect whether the target element is in a Carbon v11 context by checking
 * for the closest ancestor carrying a `cds--` class. Falls back to v10.
 */
function isCarbonV11Context(target) {
  let el = target;

  while (el && el !== document.body) {
    if (el.classList) {
      for (const cls of el.classList) {
        if (cls.startsWith('cds--')) {
          return true;
        }
      }
    }

    el = el.parentElement;
  }

  return false;
}

function getThemeName(target) {
  if (isCarbonV11Context(target)) {
    // v11: unique identifier token is `background`
    const background = getComputedStyle(target)
      .getPropertyValue('--cds-background')
      .replace(/ /g, '');

    if (background) {
      const searchResults = searchCarbonTokens(
        themesV11,
        background,
        ['background'].concat(themeKeysV11.theme),
        '',
        prioritizeThemesV11
      );

      if (searchResults) {
        return [searchResults.name.split('-')[0]];
      }
    }

    return false;
  }

  // v10: check ui background because it has a unique value within each theme.
  const uiBackground = getComputedStyle(target)
    .getPropertyValue('--cds-ui-background')
    .replace(/ /g, '');

  if (uiBackground) {
    const searchResults = searchCarbonTokens(
      themes,
      uiBackground,
      ['uiBackground'].concat(themeKeys.theme)
    );

    if (searchResults) {
      return [searchResults.name.split('-')[0]];
    }
  }

  return false;
}

export { getThemeName, isCarbonV11Context };
