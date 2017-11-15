import { Command, ICommand, IWriterCommand } from './base/index';
import { Editor } from '../editor';

export class ExpressionCommands implements ICommand, IWriterCommand {
  EXPRESSION = 'expression';

  private editor: Editor;

  constructor(editor: Editor) {
    this.editor = editor;
  }

  get(): Array<{}> {
    const commands: Array<Command> = [];
    return commands.map(command => command.get());
  }

  write(text: string): void {
    this.editor.set(text);
  }
}
