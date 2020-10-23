import { settings } from 'carbon-components';
import { addHighlight, removeAllHighlights } from '../../Highlight';
import { positionTooltip, showHideTooltip, updateTooltipContent, __specValueItem, __specsContainer } from '../../Tooltip';
import { getComponentName, doesItHaveText, getActiveBreakpoint, removeLeadingZero } from '@carbon/devtools-utilities';
import { fontWeights, styles } from '@carbon/type';
import { rem } from '@carbon/layout';

const { prefix } = settings;

function manageSpecsType (specs, specType) {
    if (specs && specType === 'typography') {
        activateType();
    } else {
        deactivateType();
    }
}

function activateType () {
    document.body.addEventListener('mouseover', mouseOver);
    document.body.addEventListener('mouseout', mouseOut);
}

function deactivateType () {
    document.body.removeEventListener('mouseover', mouseOver);
    document.body.removeEventListener('mouseout', mouseOut);
}

function mouseOver (e) {
    let target = e.srcElement || e;

    if (target.nodeName !== 'BODY' && !highlightType(target)) {
        mouseOver(target.parentNode);
    }
}

function highlightType (target) {
    const compStyles = window.getComputedStyle(target);

    let typeToken,
        typeCount = 0,
        tooltipGroups = [],
        tooltipContent = '';

    if (doesItHaveText(target.childNodes)) {
        typeCount = 1;
        typeToken = getTypeToken(target, compStyles, styles);

        tooltipContent += `<ul>`;

        if (!typeToken) {
            tooltipContent += __specValueItem('warning', 'Token not found');
        }

        tooltipContent += `
                ${__specValueItem('type:', formatFontFamily(compStyles.fontFamily))}
                ${__specValueItem('size:', formatPxValue(compStyles.fontSize))}
                ${__specValueItem('line-height:', formatPxValue(compStyles.lineHeight))}
                ${__specValueItem('weight:', getFontWeight(compStyles.fontWeight, fontWeights))}
                ${__specValueItem('letter-spacing:', formatLetterSpacing(compStyles.letterSpacing))}
            </ul>`;
        
        tooltipGroups.push({
            eyebrow: getComponentName(target),
            title: typeToken || 'Type styles',
            content: tooltipContent
        });
    }

    if (typeCount > 0) {
        updateTooltipContent(__specsContainer(tooltipGroups));
        addHighlight(target, 'specs');
        positionTooltip(target); // mouse location?
        showHideTooltip(true);
        document.addEventListener('scroll', clearOnScroll, true);
        return typeCount;
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

function getTypeToken (target, compStyles, carbonStyles) {
    const tokens = Object.keys(carbonStyles);
    let matches, token, tokenStyles, range, lowRange, highRange, tokenName;
        
    if (target.dataset['typetokenname']) {
        return target.dataset['typetokenname'];
    } else {
        for (let i = 0; i < tokens.length; i++) {
            let matches = 0;

            token = tokens[i];
            tokenStyles = carbonStyles[token];

            if (tokenStyles.breakpoints) {
                range = styleRange(tokenStyles);
                lowRange = range[0] || {};
                highRange = range[1] || {};

                // ranged checks for expressive type
                if (lowRange.fontSize && highRange.fontSize) {
                    if (validateRange(normalizeUnit(compStyles.fontSize), normalizeUnit(lowRange.fontSize), normalizeUnit(highRange.fontSize))) {
                        matches++;
                    }
                } else {
                    matches++;
                }

                if (lowRange.lineHeight && highRange.lineHeight) {
                    if (validateRange(
                        unitlessLineHeight(compStyles.lineHeight, compStyles.fontSize),
                        normalizeUnit(lowRange.lineHeight, lowRange.fontSize),
                        normalizeUnit(lowRange.lineHeight, highRange.fontSize)
                    )) {
                        matches++;
                    }
                } else {
                    matches++;
                }

                matches += fixedChecks(compStyles, lowRange, true);
            } else {
                // fixed checks for productive type
                matches += fixedChecks(compStyles, tokenStyles);
            }
            
            if (matches === 5) {
                tokenName = token;
                target.dataset['typetokenname'] = token;

                break;
            }
        }
    }
    
    return tokenName;
}

function fixedChecks (compStyles, tokenStyles, range) {
    let matches = 0;
    
    if (!range) {
        if (tokenStyles.fontSize) {
            if (normalizeUnit(compStyles.fontSize) === normalizeUnit(tokenStyles.fontSize)) {
                matches++;
            }
        } else {
            matches++;
        }

        if (tokenStyles.lineHeight) {
            if (unitlessLineHeight(compStyles.lineHeight, compStyles.fontSize, tokenStyles.lineHeight) === normalizeUnit(tokenStyles.lineHeight)) {
                matches++;
            }
        } else {
            matches++;
        }
    }
    
    if (tokenStyles.fontFamily) {
        if (normalizeFontFamily(compStyles.fontFamily) === normalizeFontFamily(tokenStyles.fontFamily)) {
            matches++;
        }
    } else {
        matches++;
    }

    if (tokenStyles.letterSpacing) {
        if (normalizeLetterSpacing(compStyles.letterSpacing) === normalizeLetterSpacing(tokenStyles.letterSpacing)) {
            matches++;
        }
    } else {
        matches++;
    }
    
    if (tokenStyles.fontWeight) {
        if (Number(compStyles.fontWeight) === tokenStyles.fontWeight) {
            matches++;
        }
    } else {
        matches++;
    }
    
    return matches;
}

function styleRange (styles) {
    const breakpoints = Object.keys(styles.breakpoints);
    const breakpointState = getActiveBreakpoint();
    const range = [];
    let breakpoint, nextBreakpoint, breakpointStyles, level;
        
    range.push(JSON.parse(JSON.stringify(styles))); // copy over defaults

    for (let i = 0; i < breakpoints.length; i++) {
        breakpoint = breakpoints[i];
        // nextBreakpoint = breakpoints[i + 1];
        breakpointStyles = styles.breakpoints[breakpoint];
        level = range.length - 1;

        if (range.length === 2) {
            if (breakpoint === breakpointState.after[0]) { // if 1 up active breakpoint
                updateProperties(range[level], breakpointStyles);
            }
            break;
        } else { // range is 1
            // update if <= active breakpoint
            if (breakpoint === breakpointState.active ||
                breakpointState.before.indexOf(breakpoint) > -1) {
                updateProperties(range[level], breakpointStyles);
            }
            // if this is >= active
            // or if this is the last item and we still don't have a second level
            if (breakpoint === breakpointState.active ||
                breakpointState.after.indexOf(breakpoint) > -1 ||
                i + 1 === breakpoints.length) {
                range.push(JSON.parse(JSON.stringify(range[level])));
                
                if (breakpoint === breakpointState.after[0]) {
                    updateProperties(range[level + 1], breakpointStyles);
                    break;
                }
            }
        }
    }

    function updateProperty (property, existingStyles, newStyles) {
        existingStyles[property] = newStyles[property] ? newStyles[property] : existingStyles[property];
    }

    function updateProperties (existingStyles, newStyles) {
        updateProperty('fontFamily', existingStyles, newStyles);
        updateProperty('fontSize', existingStyles, newStyles);
        updateProperty('fontWeight', existingStyles, newStyles);
        updateProperty('letterSpacing', existingStyles, newStyles);
        updateProperty('lineHeight', existingStyles, newStyles);
    }

    return range;
}

function validateRange (val, low, high) {
    const baseline = Math.abs(low - high);

    if (baseline >= Math.abs(low - val) &&
        baseline >= Math.abs(high - val)) {
            return true;
    }
}

function normalizeFontFamily (fontFamily) {
    return fontFamily.replace(/['"]/g, '').toLowerCase();
}

function normalizeLetterSpacing (value) {

    if (value === 'normal') {
        value = 0;
    }

    return normalizeUnit(value);
}

function unitlessLineHeight(lineHeight, fontSize, matchRound) {
    let fixDecimal = String(matchRound).split('.');
    
    if (fixDecimal.length > 1) {
        fixDecimal = Math.pow(10, fixDecimal[1].length);
    } else {
        fixDecimal = Math.pow(10, 3);
    }

    return Math.round(normalizeUnit(lineHeight) / normalizeUnit(fontSize) * fixDecimal) / fixDecimal;
}

function normalizeUnit (unit, fontSize) {
    unit = String(unit);

    let normUnit = parseFloat(unit, 10);

    if (unit.indexOf('px') > -1) {
        normUnit = parseFloat(rem(normUnit), 10);
    } else if (unit.indexOf('%') > -1) {
        normUnit = normUnit / 100 * normalizeUnit(fontSize);
    }

    return Math.round(normUnit * 1000) / 1000; // round to 3 places
}

function formatFontFamily (compValue) {
    let familyValue = '';

    if (compValue) {
        familyValue = compValue.split(',')[0].replace(/"/g, '');
    }

    return familyValue;
}

function formatLetterSpacing (compValue) {
    let spaceValue = '';

    if (compValue) {
        if (compValue === 'normal') {
            spaceValue = '0';
        } else {
            spaceValue = formatPxValue(compValue);
        }
    }
    
    return spaceValue;
}

function formatPxValue (compValue) {
    let pxNum, remNum,
        pxValue = '';

    if (compValue) {
        pxNum = removeLeadingZero(Math.round(parseFloat(compValue, 10)*1000)/1000); // round to 3 places
        remNum = removeLeadingZero(Math.round(parseFloat(rem(pxNum), 10)*1000)/1000); // round to 3 places

        pxValue = `${pxNum}px / ${remNum}rem`;
    }
    
    return pxValue;
}

function getFontWeight (compValue, carbonWeights) {
    const weights = Object.keys(carbonWeights);
    let weight, setValue,
        returnedWeight = '';
        
    if (compValue) {
        returnedWeight = compValue;

        for (let i = 0; i < weights.length; i++) {
            weight = weights[i];

            if (Number(compValue) === carbonWeights[weight]) {
                returnedWeight += ` / ${weight}`;
                break;
            }
        }
    }

    return returnedWeight;
}

export { manageSpecsType };