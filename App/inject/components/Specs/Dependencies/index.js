import { settings } from 'carbon-components';
import { addHighlight, removeAllHighlights } from '../../Highlight';
import { positionTooltip, showHideTooltip, updateTooltipContent } from '../../Tooltip';
import { allComponents } from '../../../../globals';

const { prefix } = settings;
const selectors = Object.keys(allComponents).join(',');

const specsDependenciesClass = `${prefix}--specs-dependencies-tooltip`;

function manageSpecsDependencies (specs, specType) {
    if (specs && specType === 'dependencies') {
        activateDependencies();
    } else {
        deactivateDependencies();
    }
}

function activateDependencies () {
    document.body.addEventListener('mouseover', mouseOver);
    document.body.addEventListener('mouseout', mouseOut);
}

function deactivateDependencies () {
    document.body.removeEventListener('mouseover', mouseOver);
    document.body.removeEventListener('mouseout', mouseOut);
}

function mouseOver (e) {
    let target;
    for (let i = 0; i < e.path.length; i += 1) {
        target = e.path[i];
    
        if (highlightDependencies(target) || target.nodeName === 'BODY') {
            break;
        }
    }
}

function highlightDependencies (target) {
    let componentName;
    let componentIdentified = false;
    let tooltipContent = ``;
    let siblings = target.getAttribute('data-componentname');
    let dependencies = [];
    let unique;

    if (!siblings && target.nodeName === 'BODY') {
        siblings = 'Page template';
    }
    
    if (siblings) {
        componentIdentified = true;
        siblings = siblings.split(','); // create array from list of names
        componentName = siblings.pop(); // pull off the last item for point name
        dependencies = target.querySelectorAll(selectors); // get dependencies

        tooltipContent += `<h2 class="${specsDependenciesClass}__title">${componentName}</h2>`;
        
        // manage siblings
        if (siblings.length) {
            unique = [];
            tooltipContent += `
                <div class="${specsDependenciesClass}__group">
                    <h3 class="${specsDependenciesClass}__sub"><!--siblingcount-->siblings</h3>
                    <ul class="${specsDependenciesClass}__list">
            `;

            for (let i = 0; i < siblings.length; i += 1) {
                const siblingName = siblings[i];
                
                if (siblingName && unique.indexOf(siblingName) < 0) {
                    unique.push(siblingName);
                    tooltipContent += `<li class="${specsDependenciesClass}__list-item">${siblingName}</li>`;
                }
            }

            tooltipContent += `</ul></div>`;
            
            if (unique.length > 0) {
                tooltipContent = tooltipContent.replace(/<!--siblingcount-->/g, `<span>${unique.length}</span> `);
            }
        }
            
        
        // manage dependencies
        if (dependencies.length) {
            unique = [];
            tooltipContent += `
                <div class="${specsDependenciesClass}__group">
                    <h3 class="${specsDependenciesClass}__sub"><!--dependencycount-->dependencies</h3>
                    <ul class="${specsDependenciesClass}__list">
            `;

            for (let i = 0; i < dependencies.length; i += 1) {
                const dependency = dependencies[i];
                let dependencyNameList = dependency.getAttribute('data-componentname');
                
                if (dependencyNameList) {
                    dependencyNameList = dependencyNameList.split(',');

                    // looping through siblings
                    for (let i = 0; i < dependencyNameList.length; i += 1) {
                        const dependencyName = dependencyNameList[i];

                        if (dependencyName && unique.indexOf(dependencyName) < 0) {
                            unique.push(dependencyName);
                            tooltipContent += `<li class="${specsDependenciesClass}__list-item">${dependencyName}</li>`;
                        }
                    }

                    addHighlight(dependency, 'specs');
                }
            }

            tooltipContent += `</ul></div>`;
            
            if (unique.length > 0) {
                tooltipContent = tooltipContent.replace(/<!--dependencycount-->/g, `<span>${unique.length}</span> `);
            }
        }
        
        if (dependencies.length === 0 && siblings.length === 0) {
            tooltipContent += `<p class="${specsDependenciesClass}__empty">No dependencies found rendered at this time.</p>`;
        }
    }

    if (componentIdentified) {
        updateTooltipContent(`
            <div class="${specsDependenciesClass}">
                ${tooltipContent}
            </div>
        `);
        addHighlight(target, 'specs', { outline: true });
        positionTooltip(target);
        showHideTooltip(true);
        document.addEventListener('scroll', clearOnScroll);
        return dependencies;
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

export { manageSpecsDependencies };