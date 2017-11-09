import * as CodeMirror from 'codemirror';

export class Editor {
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
    this.doc.replaceRange(text, this.getCursor());
  }

  getCursor(): CodeMirror.Position {
    return this.doc.getCursor();
  }

  setCursor(position: CodeMirror.Position) {
    this.doc.setCursor(position);
  }
}
