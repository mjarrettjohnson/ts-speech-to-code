import { Editor } from './editor';
import { Writer } from '../models';

export interface IFocus {
  focus: Function;
}

export class Stage implements IFocus {
  private text: string;
  private lastText: string;
  private exported: string;
  private editor: Editor;
  private stage: Editor;

  constructor(editor: Editor, stage: Editor) {
    this.editor = editor;
    this.stage = stage;
    this.text = '';
  }

  focus(): void {
    this.stage.focus();
  }

  addText(text: string): void {
    this.lastText = text;
    this.text += text;

    this.stage.setRaw(this.text);
  }

  execute(command: string): void {
    this.stage.execute(command);
  }

  undo() {
    if (this.text) {
      this.stage.execute('undo');
      this.text = this.text.replace(this.lastText, '');
    } else {
      this.editor.execute(['undo', 'undo']);
      this.addText(this.exported);
      this.exported = '';
    }
  }

  write(): void {
    const stage = this.text;
    this.exported = this.text;
    this.text = '';
    this.editor.setFromStage(stage);
    this.stage.clear();
  }

  getText(): string {
    return Writer.print(this.text);
  }
}
