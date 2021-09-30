const shadowCollection = { set: [] }; // updates for now in inventory on reset

function findAllDomShadow(selector, root) {
  let componentsToSearch = shadowCollection.set;

  if (root) {
    componentsToSearch = shadowDomCollector(root);
  } else {
    root = document.body;
  }

  const foundInDom = root.querySelectorAll(selector);
  const foundInShadow = queryFromArray(selector, componentsToSearch);

  return [...foundInDom, ...foundInShadow];
}

function findSingleDomShadow(selector, root) {
  if (!root) {
    root = document.body;
  }

  let found = root.querySelector(selector);

  if (!found) {
    // only search shadow dom if we couldn't find it in regular dom
    found = queryFromArray(selector, shadowCollection.set, true);
  }

  return found;
}

function shadowDomCollector(root, collection = []) {
  let components = root.querySelectorAll('*:not(script)');

  if (root.nodeName === 'SLOT') {
    // components = [...components, ...root.assignedNodes()];
    const nodes = root.assignedNodes();

    for (let i = 0; i < nodes.length; i++) {
      const node = nodes[i];

      if (node.nodeType === 1) {
        components = [...components, ...node.querySelectorAll('*')];
      }
    }
  }

  if (components.length) {
    for (let i = 0; i < components.length; i++) {
      const component = components[i];

      if (component && collection.indexOf(component) === -1) {
        const shadow = component.shadowRoot;

        if (shadow) {
          collection = shadowDomCollector(shadow, collection);
          collection.push(component);
        } else if (component.nodeName === 'SLOT') {
          collection = shadowDomCollector(component, collection);
        }
      }
    }
  }

  return collection;
}

function queryFromArray(selector, components, single) {
  let query = single ? null : [];

  for (let i = 0; i < components.length; i++) {
    const component = components[i];
    let found;

    if (single) {
      // look for only one
      if (component.matches(selector)) {
        found = component; // check to see if the given component matches
      } else {
        found = component.shadowRoot.querySelector(selector);
      }

      if (found) {
        query = found;
        break;
      }
    } else {
      // look for as many as we can find
      found = [...component.shadowRoot.querySelectorAll(selector)];

      if (component.matches(selector)) {
        found.push(component); // check to see if the given component matches
      }

      if (found.length) {
        query = [...query, ...found];
      }
    }
  }

  return query;
}

function shadowContent(children) {
  let text = '';

  if (children.length) {
    for (let i = 0; i < children.length; i++) {
      const child = children[i];

      if (child.nodeType === 3 && child.wholeText.length > 0) {
        text += child.wholeText;
      } else if (child.nodeType === 1) {
        text += shadowContent(child.childNodes);

        if (child.nodeName === 'SLOT') {
          const slot = child.assignedNodes();
          text += shadowContent(slot);
        }
      }
    }
  }

  return text;
}

export {
  queryFromArray,
  shadowDomCollector,
  findAllDomShadow,
  shadowCollection,
  findSingleDomShadow,
  shadowContent,
};
