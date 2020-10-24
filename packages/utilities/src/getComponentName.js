function getComponentName (comp, name) {
    let compName;
    const codeName = '&lt;' + comp.nodeName.toLowerCase() + '&gt;';

    if (comp.nodeName !== 'BODY') {
        compName = comp.getAttribute('data-componentname');
        
        if (compName) {
            compName = compName.split(',').pop();
        } else {
            compName = getComponentName(comp.parentNode, name || codeName);
        }
    } else {
        compName = 'Page template';
    }

    return compName || name;
}

export { getComponentName };