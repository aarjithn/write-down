export default {
  // ~~strikethrough~~
  'strikethrough': {
    // Allow only one line break
    pattern: /(^|[^\\])(~~)(?:(?:\r?\n|\r)(?!\r?\n|\r)|.)+?\2/,
    lookbehind: true,
    inside: {
      'punctuation': /^\~\~|\~\~$/,
      'textnode': /.+/
    }
  },
  'math': {
    // Allow only one line break
    pattern: /\$[^\$\n]+\$/,
    inside: {
      'punctuation': /^\$|\$$/,
      'textnode': /.+/
    }
  },
  'mathblock': {
    // Allow only one line break
    pattern: /\$\$(.|\n|\r)+?\$\$/m,
    inside: {
      'punctuation': /^\$\$|\$\$$/,
      'textnode': /.+/
    }
  },
  // ~~markdown code~~
  'codeblock': {
    // Allow only one line break
    pattern: /\`{3}(\w+)?\n([^\`]+)\n\`{3}/,
    lookbehind: true,
    inside: {
      'punctuation': /^\`\`\`|\`\`\`$/
    }
  },
  // ~~markdown code~~
  'table': {
    // Allow only one line break
    pattern: /(\|.*\|)/m,
    inside: {
      'punctuation': /[\|]|[\|[-]*\|/,
      'textnode': /.+/
    }
  },
  // heading 1
  'h1' : {
    // pattern: /(^|[^\\:])\#{1,1}.*/,
    pattern: /^\#{1} .*/m,
    lookbehind: true,
    alias: 'heading',
    inside: {
      'punctuation': /^#|#$/,
      'textnode': /.+/
    }
  },
  // heading 2
  'h2' : {
    // pattern: /(^|[^\\:])\#{1,2}.*/,
    pattern: /^\#{2} .*/m,
    lookbehind: true,
    alias: 'heading',
    inside: {
      'punctuation': /^#+|#+$/,
      'textnode': /.+/
    }
  },
  // heading 3
  'h3' : {
    pattern: /^\#{3} .*/m,
    lookbehind: true,
    alias: 'heading',
    inside: {
      'punctuation': /^#+|#+$/,
      'textnode': /.+/
    }
  },
  // heading 4
  'h4' : {
    pattern: /^\#{4} .*/m,
    lookbehind: true,
    alias: 'heading',
    inside: {
      'punctuation': /^#+|#+$/,
      'textnode': /.+/
    }
  },
  // heading 5
  'h5' : {
    pattern: /^\#{5} .*/m,
    lookbehind: true,
    alias: 'heading',
    inside: {
      'punctuation': /^#+|#+$/,
      'textnode': /.+/
    }
  },
  // heading 6
  'h6' : {
    pattern: /^\#{6} .*/m,
    lookbehind: true,
    alias: 'heading',
    inside: {
      'punctuation': /^#+|#+$/,
      'textnode': /.+/
    }
  }
}