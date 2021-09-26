const shadowCollection = { set: [] }; // updates for now in inventory on reset

function findAllDomShadow(selector) {
  const foundInDom = document.body.querySelectorAll(selector);
  const foundInShadow = queryFromArray(selector, shadowCollection.set);

  return [...foundInDom, ...foundInShadow];
}

function findSingleDomShadow(selector) {
  let found = document.body.querySelector(selector);

  if (!found) {
    // only search shadow dom if we couldn't find it in regular dom
    found = queryFromArray(selector, shadowCollection.set, true);
  }

  return found;
}

function shadowDomCollector(root) {
  const components = root.querySelectorAll('*:not(script)');
  let collection = [];

  if (components.length) {
    for (let i = 0; i < components.length; i++) {
      const component = components[i];
      const shadow = component.shadowRoot;

      if (shadow) {
        collection = [...collection, shadow, ...shadowDomCollector(shadow)];
      }
    }
  }

  return collection;
}

function queryFromArray(selector, components, single) {
  let query = single ? null : [];

  for (let i = 0; i < components.length; i++) {
    let found;

    if (single) {
      // look for only one
      found = components[i].querySelector(selector);

      if (found) {
        query = found;
        break;
      }
    } else {
      // look for as many as we can find
      found = components[i].querySelectorAll(selector);

      if (found.length) {
        query = [...query, ...found];
      }
    }
  }

  return query;
}

export {
  queryFromArray,
  shadowDomCollector,
  findAllDomShadow,
  shadowCollection,
  findSingleDomShadow,
};
