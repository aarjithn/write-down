export function getFirstTwo(replacementText) {
    
}

export function getLastTwo(replacementText) {
    
}

export function replaceBoldText(replacementText) {

}

// export function getSelection() {
//     return window.getSelection();
// }

export function getSelectedRange() {
    let selection = window.getSelection();
    return selection.getRangeAt(0);
}

function _nativeRange(el) {
    var rng = document.createRange();
    rng.selectNodeContents(el);
    return rng;
};
var START_TO_START = 0; // from the w3c definitions
var START_TO_END = 1;
var END_TO_END = 2;
var END_TO_START = 3;
function w3cstart(rng, constraint) {
    if (rng.compareBoundaryPoints(START_TO_START, constraint) <= 0) return 0; // at or before the beginning
    if (rng.compareBoundaryPoints(END_TO_START, constraint) >= 0) return constraint.toString().length;
    rng = rng.cloneRange(); // don't change the original
    rng.setEnd(constraint.endContainer, constraint.endOffset); // they now end at the same place
    return constraint.toString().replace(/\r/g, '').length - rng.toString().replace(/\r/g, '').length;
}
function w3cend(rng, constraint) {
    if (rng.compareBoundaryPoints(END_TO_END, constraint) >= 0) return constraint.toString().length; // at or after the end
    if (rng.compareBoundaryPoints(START_TO_END, constraint) <= 0) return 0;
    rng = rng.cloneRange(); // don't change the original
    rng.setStart(constraint.startContainer, constraint.startOffset); // they now start at the same place
    return rng.toString().replace(/\r/g, '').length;
}

export function getSelectedOffset(el) {
    let sel = getSelectedRange();
    let rng = _nativeRange(el);
    return [w3cstart(sel,rng), w3cend(sel,rng)];
}

export function getSelectedText() {
    let range = getSelectedRange();
    return range.toString();
}

export function getTextContent(elem) {
    return elem.textContent;
}

export function setTextContent(elem, content) {
    elem.textContent = content;
}

export function setSelection(elem, start, end) {
    let range = document.createRange();
    range.setStart(elem.firstChild, start);
    range.setEnd(elem.firstChild, end);
    let selection = window.getSelection();
    selection.removeAllRanges();
    selection.addRange(range);
};

export function replaceSelectedText(replacementText) {
    let range = getSelectedRange();
    range.deleteContents();
    range.insertNode(document.createTextNode(replacementText));
}