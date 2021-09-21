import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import cheerio from 'cheerio';

configure({ adapter: new Adapter() });

function _initStats () {
    const _stats = {
        success: 0,
        fail: 0,
        total: 0
    };
    
    const fail = (addBy) => {
        _stats.fail += addBy !== undefined ? addBy : 1;
        _stats.total += addBy !== undefined ? addBy : 1;
    };
    
    const success = (addBy) => {
        _stats.success += addBy !== undefined ? addBy : 1;
        _stats.total += addBy !== undefined ? addBy : 1;
    }
    
    const setStats = ({ fail, success, total }) => {
        _stats.success = success || 0;
        _stats.fail = fail || 0;
        _stats.total = total || 0;
    }
    
    return {
        _stats,
        fail,
        success,
        setStats,
    }
}

function buildReactComponentList (components, prefix, mockedProps = {}, customShallowComps = [], scopeByKey = []) {
    const compKeys = Object.keys(components);
    const list = {};
    const { fail, success, _stats } = new _initStats();

    compKeys.forEach(compKey => {
    
        if (scopeByKey.length && scopeByKey.indexOf(compKey) === -1) {
            return false;
        }

        const Comp = components[compKey];
        let $, attr, className, shallowComp, identifier;

        try {
// 1. try a simple shallow render
            try { 
                shallowComp = shallow(
                    <Comp {...mockedProps} />
                );
            } catch (e) {
// 2. try it with children
                try {
                    shallowComp = shallow(
                        <Comp key="children">
                            <li>...</li>
                        </Comp>
                    );
                } catch (e) {
                    for (let i = 0; i < customShallowComps.length; i++) {
// 3. try any custom shallow renders
                        try {
                            shallowComp = shallow(customShallowComps[i](Comp));
                            break;
                        } catch (e) {
// do nothing if it fails until a little later
                        }
                    }
                }
            }

            attr = shallowComp.props();
            className = attr && attr.className;

            if (!className) {
                // try cheerio
                $ = cheerio.load(shallowComp.html());
                className = findClassName($, $('body'));
            }

            if (className) {
                identifier = cleanupSelector(className, prefix);
                
                if (identifier && !list[identifier]) {
                    list[identifier] = compKey;
                    success();
                } else {
                    console.log(`${prefix}${compKey}: Failed to find a unique identifier.`);
                    fail();
                }
            } else {
                console.log(`${prefix}${compKey}: Failed to find a unique identifier.`);
                fail();
            }
        } catch (error) {
            console.log(`${prefix}${compKey}: Failed to render.`);
            fail();
        }
    });

    return { _stats, list };
}

function findClassName ($, comp) {
    // depends on cheerio interface
    const children = comp.children();
    const nextUp = [];
    let selectors = [];

    for (let i = 0; i < children.length; i++) {
        const child = $(children[i]);
        const selector = child.attr('class');
        
        selectors.push(selector);
        nextUp.push(child);
    }
    
    selectors = selectors.filter(s => s);

    if (!selectors.length) {
        for (let i = 0; i < nextUp.length; i++) {
            const selector = findClassName($, nextUp[i]);
            
            if (selector) {
                selectors.push(selector);
                break;
            }
        }
    }

    return selectors.filter(d => d).join('+');
}

function cleanupSelector (fullSelector, prefix) {
    fullSelector = fullSelector.trim().split('+');
    
    fullSelector = fullSelector.map(selector => {
        selector = selector
                    .split(' ')
                    .filter(singleClassName => {
                        const filterModifier = singleClassName.replace(`${prefix}`, '').indexOf('--') === -1;
                        return filterModifier;
                    });

        if (selector.length) {
            return '.' + selector.join('.')
        }

        return '';
    }).filter(s => s);

    fullSelector = fullSelector.join('+');
    
    return fullSelector;
}

export { buildReactComponentList, findClassName, cleanupSelector, _initStats };