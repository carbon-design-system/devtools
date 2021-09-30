function getComponentName(comp, name) {
  let compName;
  let skipShadow = ['SLOT', '#document-fragment'];

  if (comp && comp.nodeName !== 'BODY') {
    if (skipShadow.indexOf(comp.nodeName) === -1) {
      compName = comp.getAttribute('data-componentname');
    }

    if (compName) {
      compName = compName.split(',').pop();
    } else {
      const codeName = '&lt;' + comp.nodeName.toLowerCase() + '&gt;';
      let parent = comp.parentNode;

      if (comp.dataset.shadowParent) {
        parent = document.querySelector(
          `[data-shadow-id="${comp.dataset.shadowParent}"]`
        );
      }

      compName = getComponentName(parent, name || codeName);
    }
  } else {
    compName = 'Page template';
  }

  return compName || name;
}

export { getComponentName };
