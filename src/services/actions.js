export const actions = {
  'bold': {
    description: 'Bold',
    shortcut: 'B'
  },
  'italic': {
    description: 'Italic',
    shortcut: 'I'
  },
  'strikethrough': {
    description: 'Strikethrough',
    shortcut: 'S'
  },
  'heading': {
    description: 'Heading',
    shortcut: 'H'
  },
  'olist': {
    description: 'Ordered List',
    shortcut: 'O'
  },
  'ulist': {
    description: 'Unordered List',
    shortcut: 'U'
  },
  'quote': {
    description: `Blockquote`,
  },
  'code': {
    description: `Code`,
    shortcut: 'K'
  },
  'hr': {
    description: `Horizontal Rule`,
    shortcut: 'R'
  },
  'math': {
    description: `Math`,
    shortcut: 'M'
  },
  'table': {
    description: `Table`,
    shortcut: 'T'
  },
  'link': {
    description: `Link`,
    shortcut: 'L'
  },
  'image': {
    description: `Image`,
    shortcut: 'G'
  },
  'undo': {
    description: `Undo`,
    shortcut: 'Z'
  },
  'redo': {
    description: `Redo`,
    shortcut: 'Shift+Z'
  }
}

export const getShortcut = (action) => { 
  if (actions[action].shortcut) {
    return `${~navigator.platform.indexOf('Mac') ? 'Cmd' : 'Ctrl'}+${actions[action].shortcut}`;
  }
  return '';
}