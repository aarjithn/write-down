import { Component, Event, EventEmitter, Listen, State } from '@stencil/core';
import * as icons from './wd-icons';
import { actions, getShortcut } from '../../services/actions';

@Component({
  tag: 'wd-toolbar',
  styleUrl: 'wd-toolbar.scss',
})
export class Toolbar {

  @Event() toolbarAction: EventEmitter;

  @State() hasUndo: boolean = false;
  @State() hasRedo: boolean = false;

  do = (action) => {
    this.toolbarAction.emit(action);
  }

  @Listen('body:undoStatus')
  undoHandler(event: CustomEvent) {
    this.hasUndo = event.detail.hasUndo;
    this.hasRedo = event.detail.hasRedo;
  }

  setProps = (prop) => {
    return { 
      title: `${actions[prop].description} ${getShortcut(prop)}`,
      'aria-label' : `${actions[prop].description} ${getShortcut(prop)}`,
      onClick: () => this.do(prop)
    };
  }

  renderButton = (action) => {
    return (<button {...this.setProps(action)}> {icons[action]()} </button>);
  }

  render() {
    return <div class="layout-toolbar">

      { ['bold', 'italic', 'strikethrough', 'heading'].map(this.renderButton) }

      <span class="spacer"></span>

      { ['quote', 'code', 'hr'].map(this.renderButton) }

      <span class="spacer"></span>

      { ['ulist', 'olist'].map(this.renderButton) }

      <span class="spacer"></span>

      { ['math', 'table', 'link', 'image'].map(this.renderButton) }

      <span class="spacer"></span>

      <button {...this.setProps('undo')} disabled={!this.hasUndo}>{icons.undo()}</button>
      <button {...this.setProps('redo')} disabled={!this.hasRedo}>{icons.redo()}</button>

    </div>;
  }
}
