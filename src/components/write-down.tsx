import { Component } from '@stencil/core';

@Component({
  tag: 'write-down',
  styleUrl: 'write-down.scss'
})
export class WriteDown {

  render() {
    return <div class="write-down">
      <wd-toolbar></wd-toolbar>
      <wd-editor></wd-editor>
    </div>;
  }
}
