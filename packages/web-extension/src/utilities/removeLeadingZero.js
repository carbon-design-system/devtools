function removeLeadingZero (val) {
    return String(val).replace(/^-[0]+/g, '-').replace(/^0+/g, '');
}
export { removeLeadingZero };