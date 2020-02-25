function storageTrueFalse (data, ifTrue, ifFalse) {
    if (data && (data === true || data.newValue === true)) {
        ifTrue();
    } else if (data && (data === false || data.newValue === false)) {
        ifFalse();
    }
}

export { storageTrueFalse };