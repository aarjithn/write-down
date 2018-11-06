import Combokeys from './combokeys'
import UndoManager from 'undo-manager'
import { getSections, setSelection, defineNewLine, store as storeService } from '../services/utils'
import { StrUtil } from '../services/utils'

export default class Editable {
  constructor(elem, { autoIndent = true,
                      softTabs = 2,
                      replaceTab = true,
                      oninput = () => {},
                      undoLimit = 0,
                      behavior = StrUtil,
                      store = storeService(getSections(elem)),
                    } = {}) {

    const editable = this
    const handler = behavior(defineNewLine(), softTabs ? ' '.repeat(softTabs) : '\t')

    const undoMgr = new UndoManager()
    undoMgr.setLimit(undoLimit)

    const setDom = (value) => {
      var content = value.prefix + value.selected + value.suffix
      elem.textContent = content
      oninput(content, value)
      setSelection(elem, value.prefix.length, value.prefix.length + value.selected.length)
    }

    const update = (content) => {
      let previous = store()
      if (!content) content = getSections(elem);
      undoMgr.add({
        undo : () => { setDom(previous) },
        redo : () => { setDom(content) }
      })
      store(content)
      setDom(content)
    }

    const keys = new Combokeys(elem)
    keys.stopCallback = () => false // work without needing to set combokeys class on elements

    keys.bind('mod+z', () => { undoMgr.undo(); return false })
    keys.bind('shift+mod+z', () => { undoMgr.redo(); return false })

    if (autoIndent) {
      keys.bind('enter', () => getSections(elem, ({ prefix, selected, suffix}) => {
        update(handler.autoIndent(prefix, selected, suffix))
        return false
      }))
    }

    if (replaceTab) {
      keys.bind('tab', () => getSections(elem, ({ prefix, selected, suffix }) => {
        update(handler.tabIndent(prefix, selected, suffix))
        return false
      }))

      keys.bind('shift+tab', () => getSections(elem, ({ prefix, selected, suffix }) => {
        update(handler.tabUnindent(prefix, selected, suffix))
        return false
      }))
    }

    editable.inputListener = elem.addEventListener('input', () => getSections(elem, update))

    oninput(elem.textContent, store());

    // expose for haxxoers
    editable.elem = elem
    editable.handler = handler
    editable.undoMgr = undoMgr
    editable.store = store
    editable.setDom = setDom
    editable.update = update
    editable.keys = keys
  }

  destroy() {
    this.elem.removeEventListener('input', this.inputListener)
    this.keys.detach()
    this.undoMgr.clear()
  }

  focus() {
    this.elem.focus()
  }

  blur() {
    this.elem.blur()
  }
}