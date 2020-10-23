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

export { doesItHaveText };