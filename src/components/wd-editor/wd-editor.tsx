import { Component, Listen, Event, EventEmitter } from '@stencil/core';
import Misbehave from '../../libs/editable';
import Prism from '../../libs/prism';
import pagedown from '../../libs/pagedown';
import highlights from '../../services/highlights';
import { actions } from '../../services/actions';

@Component({
  tag: 'wd-editor',
  styleUrl: 'wd-editor.scss',
})
export class Editor {
  
  private textInput?: HTMLElement;
  private editor;
  private pageDown;

  @Event() undoStatus: EventEmitter;
  undoEmitter = (hasUndo, hasRedo) => {
    this.undoStatus.emit({hasUndo, hasRedo});
  }

  @Event() output: EventEmitter;
  outputEmitter = (textContent) => {
    this.output.emit(textContent);
  }

  componentDidLoad() {
    this.pageDown = pagedown({
      input: this.textInput,
    });
    this.pageDown.run();

    // extend prism
    Prism.languages.insertBefore('markdown', 'prolog', highlights);

    this.editor = new Misbehave(this.textInput, {
      oninput : () => {
        Prism.highlightElement(this.textInput);
        this.editorUpdated();
      }
    });
    this.setKeys();
  }

  setKeys () {
    Object.keys(actions).forEach(item => {
      if (actions[item].shortcut) {
        this.editor.keys.bind(`mod+${actions[item].shortcut.toLowerCase()}`, (e) => { this.doAction(item); e.preventDefault(); });
      }
    });
  }

  @Listen('body:toolbarAction')
  toolbarActionHandler(event: CustomEvent) {
    this.doAction(event.detail);
  }

  editorUpdated() {
    this.outputEmitter(this.editor && this.editor.elem.textContent || '');
    this.undoEmitter(this.editor && this.editor.undoMgr.hasUndo(), this.editor && this.editor.undoMgr.hasRedo());
  }

  doAction(action) {
    if (action == 'undo' || action == 'redo') {
      this.editor.undoMgr[action]();
    } else {
      this.pageDown.uiManager.doClick(action);
      this.editor.update();
    }
    this.editorUpdated();
  }
  
  render() {
    return <pre class="language-markdown layout-editor" contenteditable ref={el => this.textInput = el as HTMLElement}></pre>
  }
}
