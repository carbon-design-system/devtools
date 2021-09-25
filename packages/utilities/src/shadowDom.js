const shadowCollection = { components: [] }; // updates for now in inventory on reset

function findAllDomShadow(selector) {
  const foundInDom = document.body.querySelectorAll(selector);
  const foundInShadow = queryFromArray(selector, shadowCollection.components);

  return [...foundInDom, ...foundInShadow];
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

function queryFromArray(selector, components) {
  let query = [];

  for (let i = 0; i < components.length; i++) {
    const found = components[i].querySelectorAll(selector);

    if (found.length) {
      query = [...query, ...found];
    }
  }

  return query;
}

export {
  queryFromArray,
  shadowDomCollector,
  findAllDomShadow,
  shadowCollection,
};
