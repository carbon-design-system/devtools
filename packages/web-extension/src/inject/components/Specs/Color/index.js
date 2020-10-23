import { settings } from 'carbon-components';
import { addHighlight, removeAllHighlights } from '../../Highlight';
import { positionTooltip, showHideTooltip, updateTooltipContent, __specValueItem, __specsContainer } from '../../Tooltip';
import { getComponentName, doesItHaveText } from '../../../../utilities';
import { colors } from '@carbon/colors';
import { themes } from '@carbon/themes';
import { searchCarbonTokens } from './searchCarbonTokens';
import { themeKeys } from './themeKeys';
import { getThemeName } from './getThemeName';
import Color from 'color';

const { prefix } = settings;

function manageSpecsColor (specs, specType) {
    if (specs && specType === 'color') {
        activateColor();
    } else {
        deactivateColor();
    }
}

function activateColor () {
    document.body.addEventListener('mouseover', mouseOver);
    document.body.addEventListener('mouseout', mouseOut);
}

function deactivateColor () {
    document.body.removeEventListener('mouseover', mouseOver);
    document.body.removeEventListener('mouseout', mouseOut);
}

function mouseOver (e) {
    let target = e.srcElement || e;

    if (target.nodeName !== 'BODY' && !highlightColor(target)) {
        mouseOver(target.parentNode);
    }
}

function highlightColor (target) {
    const styles = window.getComputedStyle(target);
    const themeName = getThemeName(target);
    const themes = themeName || themeKeys.theme; // do we know the current theme? If not give them all of them.
    const borderColorGroups = combineBorderColors(styles, themes);

    let tooltipGroups = [];

    if (doesItHaveText(target.childNodes)) {
        tooltipGroups.push({
            eyebrow: '<!--componentnameplaceholder-->',
            title: 'Type color',
            content: tooltipContent(styles.color, themeKeys.text.concat(themes))
        });
    }
    
    if (styles.backgroundColor !== 'rgba(0, 0, 0, 0)') {
        tooltipGroups.push({
            eyebrow: '<!--componentnameplaceholder-->',
            title: 'Background color',
            content: tooltipContent(styles.backgroundColor, themeKeys.background.concat(themes))
        });
    }
    
    if (target.nodeName === 'path') {
        tooltipGroups.push({
            eyebrow: '<!--componentnameplaceholder-->',
            title: 'Fill',
            content: tooltipContent(styles.fill, themeKeys.icon.concat(themes))
        });
    }
    
    if (borderColorGroups.length > 0) {
        tooltipGroups = tooltipGroups.concat(borderColorGroups);
    }

    if (tooltipGroups.length > 0) {
        updateTooltipContent(
            __specsContainer(tooltipGroups)
                .replace(/<!--componentnameplaceholder-->/g,
                    getComponentName(target))
        );
        addHighlight(target, 'specs');
        positionTooltip(target); // mouse location?
        showHideTooltip(true);
        document.addEventListener('scroll', clearOnScroll, true);
        return tooltipGroups.length;
    }
}

function clearOnScroll () {
    showHideTooltip(false);
    removeAllHighlights();
    document.removeEventListener('scroll', clearOnScroll, true);
}

function mouseOut (e) {
    removeAllHighlights();
    showHideTooltip(false);
    document.removeEventListener('scroll', clearOnScroll, true);
}

function combineBorderColors (styles, themes) {
    let borderGroups = [];

    const validate = {
        color: {
            all: styles.borderTopColor === styles.borderBottomColor &&
                 styles.borderRightColor === styles.borderLeftColor &&
                 styles.borderTopColor === styles.borderLeftColor,
            horizontal: styles.borderTopColor === styles.borderBottomColor,
            vertical: styles.borderRightColor === styles.borderLeftColor
        },
        width: {
            all: styles.borderTopWidth !== '0px' ||
                 styles.borderRightWidth !== '0px' ||
                 styles.borderBottomWidth !== '0px' ||
                 styles.borderLeftWidth !== '0px',
            horizontal: styles.borderTopWidth !== '0px' ||
                        styles.borderBottomWidth !== '0px',
            vertical: styles.borderRightWidth !== '0px' ||
                      styles.borderLeftWidth !== '0px',
            top: styles.borderTopWidth !== '0px',
            right: styles.borderRightWidth !== '0px',
            bottom: styles.borderBottomWidth !== '0px',
            left: styles.borderLeftWidth !== '0px'
        }
    }
    
    if (validate.width.all && validate.color.all) {
        borderGroups.push({
            eyebrow: '<!--componentnameplaceholder-->',
            title: 'Border color',
            content: tooltipContent(styles.borderTopColor, themeKeys.border.concat(themes))
        });
    } else {
        if (validate.width.horizontal && validate.color.horizontal) {
            borderGroups.push({
                eyebrow: '<!--componentnameplaceholder-->',
                title: 'Horizontal borders color',
                content: tooltipContent(styles.borderTopColor, themeKeys.border.concat(themes))
            });
        } else {
            if (validate.width.top) {
                borderGroups.push({
                    eyebrow: '<!--componentnameplaceholder-->',
                    title: 'Border top color',
                    content: tooltipContent(styles.borderTopColor, themeKeys.border.concat(themes))
                });
            }
            
            if (validate.width.bottom) {
                borderGroups.push({
                    eyebrow: '<!--componentnameplaceholder-->',
                    title: 'Border bottom color',
                    content: tooltipContent(styles.borderBottomColor, themeKeys.border.concat(themes))
                });
            }
        }

        if (validate.width.vertical && validate.color.vertical) {
            borderGroups.push({
                eyebrow: '<!--componentnameplaceholder-->',
                title: 'Vertical borders color',
                content: tooltipContent(styles.borderRightColor, themeKeys.border.concat(themes))
            });
        } else {
            if (validate.width.right) {
                borderGroups.push({
                    eyebrow: '<!--componentnameplaceholder-->',
                    title: 'Border right color',
                    content: tooltipContent(styles.borderRightColor, themeKeys.border.concat(themes))
                });
            }
            
            if (validate.width.left) {
                borderGroups.push({
                    eyebrow: '<!--componentnameplaceholder-->',
                    title: 'Border left color',
                    content: tooltipContent(styles.borderLeftColor, themeKeys.border.concat(themes))
                });
            }
        }
    }

    return borderGroups;
}

function tooltipContent (value, scopedKeys) {
    let html = '';

    if (value) { // is this accross all browsers?
        const computedColor = Color(value).hex().toLowerCase();
        const idlToken = searchCarbonTokens(colors, computedColor);
        const rgbValue = Color(value).rgb().toString().toLowerCase();

        html += `<div class="${prefix}--specs-color-tooltip__color">
                    <span style="background-color: ${rgbValue}"></span>
                </div>`;
        html += `<ul>`;

            if (idlToken) {
            
                let carbonToken = searchCarbonTokens(themes, computedColor, scopedKeys);

                if (carbonToken) {
                    // carbon theme token
                    carbonToken = carbonToken.name.split('-');
                    html += __specValueItem('CDS:', `$${carbonToken[1]} (${carbonToken[0]})`);
                }

                // idl token
                html += __specValueItem('IDL:', idlToken.name);
            } else {
                // warning message because no token was found
                html += __specValueItem('warning', 'Token not found');
            }
            
            // hex
            html += __specValueItem('HEX:', computedColor);

            // rgb(a)
            // is there a cleaner way to do this?
            html += __specValueItem(rgbValue.indexOf('rgb(') === 0 ? 'RGB:' : 'RGBA:', rgbValue);

        html += `</ul>`;
    }
    
    return html;
}

export { manageSpecsColor };