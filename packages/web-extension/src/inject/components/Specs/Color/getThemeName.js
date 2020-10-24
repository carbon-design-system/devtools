import { themes } from '@carbon/themes';
import { themeKeys } from './themeKeys';
import { searchCarbonTokens } from './searchCarbonTokens';

function getThemeName(target) {
  // check ui background because as of writing this it has a unique value within each theme.
  const uiBackground = getComputedStyle(target)
    .getPropertyValue('--cds-ui-background')
    .replace(/ /g, '');
  let theme = false;

  if (uiBackground) {
    // find the matching token among all theme tokens in carbon
    let searchResults = searchCarbonTokens(
      themes,
      uiBackground,
      ['uiBackground'].concat(themeKeys.theme)
    );
    if (searchResults) {
      // parse out the theme name which should be the first segment
      theme = [searchResults.name.split('-')[0]];
    }
  }

  return theme;
}

export { getThemeName };
