import { settings } from 'carbon-components';
import { addHighlight, removeAllHighlights } from '../../Highlight';
import { positionTooltip, showHideTooltip, updateTooltipContent } from '../../Tooltip';
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
    let target;

    for (let i = 0; i < e.path.length; i += 1) {
        target = e.path[i];

        if (target.nodeName === 'BODY' || highlightColor(target)) {
            break;
        }
    }
}

function highlightColor (target) {
    const styles = window.getComputedStyle(target);
    const themeName = getThemeName(target);
    const themes = themeName || themeKeys.theme; // do we know the current theme? If not give them all of them.
    const borderResults = combineBorderColors(styles, themes);

    let tooltipSectionCount = 0;
    let tooltipContent = '';

    if (doesItHaveText(target.childNodes)) {
        tooltipSectionCount++;
        tooltipContent += tooltipSection('Type color', styles.color, themeKeys.text.concat(themes));
    }
    
    if (styles.backgroundColor !== 'rgba(0, 0, 0, 0)') {
        tooltipSectionCount++;
        tooltipContent += tooltipSection('Background color', styles.backgroundColor, themeKeys.background.concat(themes));
    }
    
    if (target.nodeName === 'path') {
        tooltipSectionCount++;
        tooltipContent += tooltipSection('Fill', styles.fill, themeKeys.icon.concat(themes));
        // TODO: fix svg and path overlay and tooltip position
    }
    
    if (borderResults.status) {
        tooltipSectionCount++;
        tooltipContent += borderResults.html;
    }


    if (tooltipSectionCount > 0) {
        
        const componentName = `<h1 class="${prefix}--specs-color-tooltip__name">${getComponentName(target, target.nodeName.toLowerCase())}</h1>`;

        updateTooltipContent(`
            <div class="${prefix}--specs-color-tooltip">
                ${tooltipContent.replace(/<!--name-->/g, componentName)}
            </div>
        `);

        addHighlight(target, 'specs');
        positionTooltip(target); // mouse location?
        showHideTooltip(true);
        document.addEventListener('scroll', clearOnScroll);
        return tooltipSectionCount;
    }
}

function clearOnScroll () {
    showHideTooltip(false);
    removeAllHighlights();
    document.removeEventListener('scroll', clearOnScroll);
}

function mouseOut (e) {
    removeAllHighlights();
    showHideTooltip(false);
    document.removeEventListener('scroll', clearOnScroll);
}

function combineBorderColors (styles, themes) {
    let results = {
        status: false,
        html: ''
    };

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
        results.html += tooltipSection('Border color', styles.borderTopColor, themeKeys.border.concat(themes));
    } else {
        if (validate.width.horizontal && validate.color.horizontal) {
            results.html += tooltipSection('Horizontal borders color', styles.borderTopColor, themeKeys.border.concat(themes));
        } else {
            if (validate.width.top) {
                results.html += tooltipSection('Border top color', styles.borderTopColor, themeKeys.border.concat(themes));
            }
            
            if (validate.width.bottom) {
                results.html += tooltipSection('Border bottom color', styles.borderBottomColor, themeKeys.border.concat(themes));
            }
        }

        if (validate.width.vertical && validate.color.vertical) {
            results.html += tooltipSection('Vertical borders color', styles.borderRightColor, themeKeys.border.concat(themes));
        } else {
            if (validate.width.right) {
                results.html += tooltipSection('Border right color', styles.borderRightColor, themeKeys.border.concat(themes));
            }
            
            if (validate.width.left) {
                results.html += tooltipSection('Border left color', styles.borderLeftColor, themeKeys.border.concat(themes));
            }
        }
    }
    
    if (results.html.length > 0) {
        results.status = true;
    }
    
    return results;
}

function tooltipSection (property, value, scopedKeys) {
    let html = '';

    if (value) { // is this accross all browsers?
        const computedColor = Color(value).hex().toLowerCase();
        const idlToken = searchCarbonTokens(colors, computedColor);
        const rgbValue = Color(value).rgb().toString().toLowerCase();
        
        html += `<div  class="${prefix}--specs-color-tooltip__group">`;
        html += `<!--name-->
                <div class="${prefix}--specs-color-tooltip__color">
                    <span style="background-color: ${rgbValue}"></span>
                 </div>
                 <h2 class="${prefix}--specs-color-tooltip__title">${property}</h2>`;
            html += `<ul>`;

                if (idlToken) {
                
                    let carbonToken = searchCarbonTokens(themes, computedColor, scopedKeys);

                    if (carbonToken) {
                        // carbon theme token
                        carbonToken = carbonToken.name.split('-');
                        html += valueItem('CDS:', `$${carbonToken[1]} (${carbonToken[0]})`);
                    }

                    // idl token
                    html += valueItem('IDL:', idlToken.name);
                } else {
                    // warning message because no token was found
                    html += valueItem('warning', 'Token not found');
                }
                
                // hex
                html += valueItem('HEX:', computedColor);

                // rgb(a)
                // is there a cleaner way to do this?
                html += valueItem(rgbValue.indexOf('rgb(') === 0 ? 'RGB:' : 'RGBA:', rgbValue);

            html += `</ul>`;
        html += `</div>`;
    }
    
    return html;
}

function valueItem (type, value) {
    let html;

    if (type === 'warning') {
        html = `
            <li class="${prefix}--specs-color-tooltip__warning">
                ${value}
            </li>
        `;
    } else {
        html = `
            <li>
                <h3 class="${prefix}--specs-color-tooltip__prop">${type}</h3>
                <p class="${prefix}--specs-color-tooltip__value">${value}</p>
            </li>
        `;
    }
    
    return html;
}

function doesItHaveText (children) {
    let validate = false;

    for (let i = 0; i < children.length; i += 1) {
        const child = children[i];
        if (child.nodeType == 3 && child.wholeText.replace(/ /g, '').length > 0) {
            validate = true;
            break;
        }
    }

    return validate;
}

function getComponentName (comp, name) {
    let compName;

    if (comp.nodeName !== 'BODY') {
        compName = comp.getAttribute('data-componentname');
        
        if (compName) {
            compName = compName.split(',').slice(-1)[0];
        } else {
            compName = getComponentName(comp.parentNode, name);
        }
    }

    return compName || name;
}

export { manageSpecsColor };