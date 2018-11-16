export const allNewLines = /\r\n|\r|\n/g

export const onNewLine = /\r\n|\r|\n/

export const leadingWhitespace = /^\s*/

export const allCharacters = /./g

export const removeIfStartsWith = (s) => (line) => line.startsWith(s) ? line.slice(s.length) : line

export const defineNewLine = () => {
  let ta = document.createElement('textarea')
  ta.value = '\n'
  if (ta.value.length === 2)
    return '\r\n'
  else
    return '\n'
}

export const getSections = (elem, callback) => {
  var sel, range, tempRange, prefix = '', selected = '', suffix = ''

  if (document.activeElement !== elem) {
    suffix = elem.textContent
  } else if (typeof window.getSelection !== 'undefined') {
    sel = window.getSelection()
    selected = sel.toString()
    if (sel.rangeCount) {
      range = sel.getRangeAt(0)
    } else {
      range = document.createRange()
      range.collapse(true)
    }
    tempRange = document.createRange()
    tempRange.selectNodeContents(elem)
    tempRange.setEnd(range.startContainer, range.startOffset)
    prefix = tempRange.toString()

    tempRange.selectNodeContents(elem)
    tempRange.setStart(range.endContainer, range.endOffset)
    suffix = tempRange.toString()

    tempRange.detach()
  } else if ( (sel = document.selection) && sel.type != 'Control') {
    range = sel.createRange()
    tempRange = document.body.createTextRange()
    selected = tempRange.text

    tempRange.moveToElementText(elem)
    tempRange.setEndPoint('EndToStart', range)
    prefix = tempRange.text

    tempRange.moveToElementText(elem)
    tempRange.setEndPoint('StartToEnd', range)
    suffix = tempRange.text
  }

  if (callback)
    return callback({ prefix, selected, suffix }, sel)
  else
    return { prefix, selected, suffix }
}

const getTextNodesIn = (node) => {
  var textNodes = []
  if (node.nodeType == 3) {
    textNodes.push(node)
  } else {
    var children = node.childNodes;
    for (var i = 0, len = children.length; i < len; ++i) {
      textNodes.push.apply(textNodes, getTextNodesIn(children[i]))
    }
  }
  return textNodes
}

export const setSelection = (elem, start, end) => {
  if (document.createRange && window.getSelection) {
    var range = document.createRange()
    range.selectNodeContents(elem)
    var textNodes = getTextNodesIn(elem)
    var foundStart = false
    var charCount = 0, endCharCount

    for (var i = 0, textNode; textNode = textNodes[i++]; ) {
      endCharCount = charCount + textNode.length
      if (!foundStart && start >= charCount && (start < endCharCount || (start == endCharCount && i <= textNodes.length))) {
        range.setStart(textNode, start - charCount)
        foundStart = true
      }
      if (foundStart && end <= endCharCount) {
        range.setEnd(textNode, end - charCount)
        break
      }
      charCount = endCharCount
    }

    var sel = window.getSelection();
    sel.removeAllRanges();
    sel.addRange(range);
  } else if (document.selection && document.body.createTextRange) {
    var textRange = document.body.createTextRange()
    textRange.moveToElementText(elem)
    textRange.collapse(true)
    textRange.moveEnd('character', end)
    textRange.moveStart('character', start)
    textRange.select()
  }
}

export const store = (value) => {
  function gettersetter() {
    if (arguments.length) {
      value = arguments[0]
    }
    return value
  }
  return gettersetter
}

// js behaviours

export const autoIndent = (newLine, tab, prefix, selected, suffix) => {
  let prevLine = prefix.split(onNewLine).splice(-1)[0]
  let prefEnd = prefix.slice(-1)
  let suffStart = suffix.charAt(0)

  // if ((prevLine.match(/\(/g) || []).length > (prevLine.match(/\)/g) || []).length) {
  //   let whitespace = prevLine.match(leadingWhitespace)[0]
  //   prefix += newLine + whitespace + prevLine.slice(whitespace.length, prevLine.lastIndexOf('(') + 1).replace(allCharacters, ' ')
  // } else if (prefEnd === '{') {
  //   prefix += newLine + prevLine.match(leadingWhitespace)[0] + tab
  //   if (suffStart === '}')
  //     suffix = newLine + prevLine.match(leadingWhitespace)[0] + suffix
  // } else {
    // if (prefEnd == newLine && suffix != newLine) prefix = prefix.slice(0,-1)
    prefix += newLine + prevLine.match(leadingWhitespace)[0]
  // }
  selected = ''
  if (suffix === '') suffix = newLine
  return { prefix, selected, suffix }
}

// export const autoOpen = (opening, closing, prefix, selected, suffix) => {
//   prefix += opening
//   suffix = closing + suffix
//   return { prefix, selected, suffix }
// }

// export const overwrite = (closing, prefix, selected, suffix) => {
//   prefix += closing
//   suffix = suffix.slice(1)
//   return { prefix, selected, suffix }
// }

// // content in selection is handled in index.js
// export const testOverwrite = (closing, prefix, selected, suffix) => {
//   return suffix.charAt(0) === closing
// }

export const tabIndent = (newLine, tab, prefix, selected, suffix) => {
  let prefLines = prefix.split(onNewLine)
  let prevLine = prefLines.splice(-1)[0]

  if (selected === '') {
    if (tab === '\t' || prevLine.length % tab.length === 0) {
      prefix += tab
    } else {
      prefix += ' '.repeat(tab.length - prevLine.length % tab.length)
    }
  } else {
    prevLine = tab + prevLine
    prefix = prefLines.concat(prevLine).join(newLine)
    selected = selected.replace(allNewLines, newLine + tab)
  }
  return { prefix, selected, suffix }
}

export const tabUnindent = (newLine, tab, prefix, selected, suffix) => {
  let lines = selected.split(onNewLine)
  let prevLine = prefix.split(onNewLine).splice(-1)[0]

  if (lines.length === 1) {
    if (prefix.endsWith(tab))
      prefix = prefix.slice(0, -tab.length)
    else { // indent instead
      if (tab === '\t' || prevLine.length % tab.length === 0) {
        prefix += tab
      } else {
        prefix += ' '.repeat(tab.length - prevLine.length % tab.length)
      }
    }
  } else {
    let prevLength = prevLine.length
    if (prevLength) {
      prevLine = removeIfStartsWith(tab)(prevLine)
      prefix = prefix.slice(0, -prevLength) + prevLine
    }
    lines = lines.map(removeIfStartsWith(tab))
    selected = lines.join(newLine)
  }
  return { prefix, selected, suffix }
}

export function StrUtil(newLine, tab) {
  return {
    autoIndent    : (...args) => autoIndent(newLine, tab, ...args),
    tabIndent     : (...args) => tabIndent(newLine, tab, ...args),
    tabUnindent   : (...args) => tabUnindent(newLine, tab, ...args)
  }
}