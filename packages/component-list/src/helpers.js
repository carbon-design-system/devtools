import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import * as cheerio from 'cheerio';

configure({ adapter: new Adapter() });

function _initStats() {
  const _stats = {
    success: 0,
    fail: 0,
    total: 0,
  };

  const fail = (addBy) => {
    _stats.fail += addBy !== undefined ? addBy : 1;
    _stats.total += addBy !== undefined ? addBy : 1;
  };

  const success = (addBy) => {
    _stats.success += addBy !== undefined ? addBy : 1;
    _stats.total += addBy !== undefined ? addBy : 1;
  };

  const setStats = ({ fail, success, total }) => {
    _stats.success = success || 0;
    _stats.fail = fail || 0;
    _stats.total = total || 0;
  };

  return {
    _stats,
    fail,
    success,
    setStats,
  };
}

function buildReactComponentList(
  components,
  prefix,
  mockedProps = {},
  customShallowComps = [],
  scopeByKey = [],
  ignoredComponents = []
) {
  const compKeys = Object.keys(components);
  const { fail, success, _stats } = new _initStats();
  const list = { _stats };
  const ignored = new Set(ignoredComponents);

  compKeys.forEach((compKey) => {
    if (scopeByKey.length && scopeByKey.indexOf(compKey) === -1) {
      return false;
    }

    const Comp = components[compKey];
    const compName = Comp?.displayName || Comp?.name || compKey;

    if (ignored.has(compKey) || ignored.has(compName)) {
      return false;
    }

    if (Comp == null) {
      console.log(`${prefix}${compKey}: Component is undefined.`);
      fail();
      return;
    }

    let $, attr, className, shallowComp;

    try {
      // 1. try a simple shallow render
      try {
        shallowComp = shallow(<Comp {...mockedProps} />);
      } catch (_e) {
        // 2. try it with children
        try {
          shallowComp = shallow(
            <Comp key="children">
              <li>...</li>
            </Comp>
          );
        } catch (_e) {
          for (let i = 0; i < customShallowComps.length; i++) {
            // 3. try any custom shallow renders
            try {
              shallowComp = shallow(customShallowComps[i](Comp));
              break;
            } catch (_e) {
              // do nothing if it fails until a little later
            }
          }
        }
      }

      attr = shallowComp.props();
      className = attr?.className;

      if (!className) {
        // try cheerio
        $ = cheerio.load(shallowComp.html());
        className = findClassName($, $('body'));
      }

      if (className) {
        const candidates = [
          cleanupSelector(className, prefix),
          cleanupSelector(className, prefix, { includeModifiers: true }),
        ].filter(
          (candidate, index, arr) =>
            candidate && arr.indexOf(candidate) === index
        );

        let matched = false;

        for (const identifier of candidates) {
          if (!identifier) {
            continue;
          }

          if (!list[identifier] || list[identifier] === compKey) {
            list[identifier] = compKey;
            success();
            matched = true;
            break;
          }
        }

        if (!matched) {
          console.log(
            `${prefix}${compKey}: Failed to find a unique identifier.`
          );
          fail();
        }
      } else {
        console.log(`${prefix}${compKey}: Failed to find a unique identifier.`);
        fail();
      }
    } catch (_error) {
      console.log(`${prefix}${compKey}: Failed to render.`);
      fail();
    }
  });

  return list;
}

function findClassName($, comp) {
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

  selectors = selectors.filter((s) => s);

  if (!selectors.length) {
    for (let i = 0; i < nextUp.length; i++) {
      const selector = findClassName($, nextUp[i]);

      if (selector) {
        selectors.push(selector);
        break;
      }
    }
  }

  return selectors.filter((d) => d).join('+');
}

function cleanupSelector(fullSelector, prefix, options = {}) {
  const { includeModifiers = false } = options;

  const selectors = fullSelector
    .trim()
    .split('+')
    .map((selector) => {
      const normalised = selector
        .replace(/\[object Object\]--/g, prefix)
        .replace(/[^\w\d-_\s]/g, '')
        .split(' ')
        .filter(
          (singleClassName) =>
            singleClassName &&
            singleClassName.startsWith(prefix) &&
            singleClassName.trim().length > 0
        );

      if (!normalised.length) {
        return '';
      }

      const filtered = includeModifiers
        ? normalised
        : normalised.filter((singleClassName) => {
            const withoutPrefix = singleClassName.replace(`${prefix}`, '');
            return withoutPrefix.indexOf('--') === -1;
          });

      const classes = filtered.length ? filtered : normalised;

      return classes.length ? `.${classes.join('.')}` : '';
    })
    .filter((s) => s);

  return selectors.join('+');
}

function camelCase(str) {
  return str
    .split(' ')
    .map((str) => {
      return str.charAt(0).toUpperCase() + str.slice(1);
    })
    .join('');
}

export {
  buildReactComponentList,
  findClassName,
  cleanupSelector,
  _initStats,
  camelCase,
};
