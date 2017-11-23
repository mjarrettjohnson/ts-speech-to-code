import * as CodeMirror from 'codemirror';
import { Writer } from '../models';
import { IFocus } from './stage';

export class Editor implements IFocus {
  private editor: CodeMirror.Editor;
  private doc: CodeMirror.Doc;

  constructor(editor: CodeMirror.Editor) {
    this.editor = editor;
    this.doc = editor.getDoc();
  }

  execute(command: string | Array<string>): void {
    // console.log('running command');
    if (Array.isArray(command)) {
      command.forEach(com => this.editor.execCommand(com));
    } else {
      this.editor.execCommand(command);
    }
  }

  get(): string {
    return this.doc.getValue();
  }

  set(text: string): void {
    if (this.doc.somethingSelected()) {
      this.doc.replaceSelection(text);
    } else {
      this.doc.replaceRange(text, this.getCursor());
    }

    const doc = this.doc.getValue();
    this.doc.setValue(Writer.print(doc));
  }

  setFromStage(text: string): void {
    if (this.doc.somethingSelected()) {
      this.doc.replaceSelection(text);
    } else {
      this.doc.replaceRange(text, this.getCursor());
    }

    const doc = this.doc.getValue();
    this.doc.setValue(Writer.print(doc));
    const pos = this.getCursor();
    this.setCursor(new CodeMirror.Pos(pos.line + 1, 0));
  }

  focus(): void {
    this.editor.focus();
  }

  setRaw(text: string) {
    this.editor.setValue(text);
  }

  getCursor(): CodeMirror.Position {
    return this.doc.getCursor();
  }

  setCursor(position: CodeMirror.Position) {
    this.doc.setCursor(position);
  }

  selectRange(startPos: CodeMirror.Position, endPos: CodeMirror.Position) {
    this.doc.setSelection(startPos, endPos);
    console.log(this.doc.getSelection());
  }

  clear() {
    this.editor.setValue('');
  }

  replaceRange(
    text: string,
    startPos: CodeMirror.Position,
    endPos: CodeMirror.Position
  ): void {
    this.doc.replaceRange(text, startPos, endPos);
  }

  deleteSelection(): void {
    if (this.doc.somethingSelected()) {
      this.doc.replaceSelection('');
    }
  }
}
