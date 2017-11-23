import { Command, ICommand, IWriterCommand } from '../command';
import { Editor } from '../../editor';
import { Expression } from '../../models/expression';

export class ExpressionCommands implements ICommand, IWriterCommand {
  EXPRESSION = {
    ADD_VALUE: 'add ',
  };

  private editor: Editor;
  private expression: Expression;

  constructor(editor: Editor) {
    this.editor = editor;
    this.expression = new Expression([], []);
  }

  get(): Array<{}> {
    const commands: Array<Command> = [];
    return commands.map(command => command.get());
  }

  write(text: string): void {
    this.editor.set(text);
  }
}
