import { Command, ICommand, IWriterCommand } from '../command';
import { Editor } from '../../editor';
import { Value } from '../../models';

const WordsToNumber = require('words-to-num');

export class ValueCommands implements ICommand, IWriterCommand {
  TYPES = {
    RAW: 'raw',
    PASCAL: 'pascal',
    CAMEL: 'camel',
  };

  VALUE = {
    RAW: 'string with value *name',
    PASCAL_STRING: 'pascal string with value *name',
    PASCAL_VARIABLE: 'pascal variable with value *name',
    CAMEL_STRING: 'camel string with value *name',
    CAMEL_VARIABLE: 'camel variable with value *name',
    NUMBER: 'number with value *name',
  };

  private editor: Editor;

  constructor(editor: Editor) {
    this.editor = editor;
  }

  get(): Array<{}> {
    const commands: Array<Command> = [
      new Command(this.VALUE.RAW, (name: string) =>
        this.writeString(name, this.TYPES.RAW)
      ),
      new Command(this.VALUE.PASCAL_STRING, (name: string) =>
        this.writeString(name, this.TYPES.PASCAL)
      ),
      new Command(this.VALUE.CAMEL_STRING, (name: string) =>
        this.writeString(name, this.TYPES.CAMEL)
      ),
      new Command(this.VALUE.PASCAL_VARIABLE, (name: string) =>
        this.writeVariable(name, this.TYPES.PASCAL)
      ),
      new Command(this.VALUE.CAMEL_VARIABLE, (name: string) =>
        this.writeVariable(name, this.TYPES.CAMEL)
      ),
      new Command(this.VALUE.NUMBER, this.writeNumber.bind(this)),
    ];
    return commands.map(command => command.get());
  }

  write(text: string): void {
    this.editor.set(text);
  }

  writeString(text: string, type: string): void {
    let formatted: Value | string;
    switch (type) {
      case this.TYPES.CAMEL:
        formatted = new Value(Command.camel(text), true);
        break;
      case this.TYPES.PASCAL:
        formatted = new Value(Command.pascal(text), true);
        break;
      case this.TYPES.RAW:
        formatted = new Value(text, true);
        break;
      default:
        formatted = new Value('');
    }
    if (formatted.write()) {
      this.write(formatted.write());
    }
  }

  writeVariable(text: string, type: string): void {
    let formatted: Value;
    switch (type) {
      case this.TYPES.CAMEL:
        formatted = new Value(Command.camel(text), false);
        break;
      case this.TYPES.PASCAL:
        formatted = new Value(Command.pascal(text), false);
        break;
      case this.TYPES.RAW:
        formatted = new Value(text, false);
        break;
      default:
        formatted = new Value('');
    }
    if (formatted.write()) {
      this.write(formatted.write());
    }
  }

  writeNumber(text: string): void {
    const formatted: Value = new Value(WordsToNumber.convert(text), false);
    this.write(formatted.write());
  }
}
