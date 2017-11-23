import { Command, ICommand, IWriterCommand } from '../command';
import { Stage } from '../../editor/stage';
import { Variable } from '../../models/variable';

export class VariableCommands implements ICommand, IWriterCommand {
  TYPE = {
    PASCAL: 'pascal',
    CAMEL: 'camel',
  };

  VAR = {
    PASCAL_CONSTANT: 'pascal constant with value *name',
    CAMEL_CONSTANT: 'camel constant with value *name',
    PASCAL_LET: 'pascal let with value *name',
    CAMEL_LET: 'camel let with value *name',
    PASCAL_THIS: 'pascal this with value *name',
    CAMEL_THIS: 'camel this with value *name',
  };

  private stage: Stage;

  constructor(stage: Stage) {
    this.stage = stage;
  }

  get(): Array<{}> {
    const commands: Array<Command> = [
      new Command(this.VAR.CAMEL_CONSTANT, (name: string) =>
        this.writeVariable(name, Variable.types.CONSTANT, this.TYPE.CAMEL)
      ),
      new Command(this.VAR.PASCAL_CONSTANT, (name: string) =>
        this.writeVariable(name, Variable.types.CONSTANT, this.TYPE.PASCAL)
      ),
      new Command(this.VAR.CAMEL_LET, (name: string) =>
        this.writeVariable(name, Variable.types.LET, this.TYPE.CAMEL)
      ),
      new Command(this.VAR.PASCAL_LET, (name: string) =>
        this.writeVariable(name, Variable.types.LET, this.TYPE.PASCAL)
      ),
      new Command(this.VAR.PASCAL_THIS, (name: string) =>
        this.writeVariable(name, Variable.types.THIS, this.TYPE.PASCAL)
      ),
      new Command(this.VAR.CAMEL_THIS, (name: string) =>
        this.writeVariable(name, Variable.types.THIS, this.TYPE.CAMEL)
      ),
    ];
    return commands.map(command => command.get());
  }

  write(text: string): void {
    this.stage.addText(text);
  }

  writeVariable(name: string, varType: string, nameType: string) {
    let value = '';

    switch (varType) {
      case Variable.types.CONSTANT:
        value += 'const ';
        break;
      case Variable.types.LET:
        value += 'let ';
        break;
      case Variable.types.THIS:
        value += 'this.';
        break;
      default:
        break;
    }

    switch (nameType) {
      case this.TYPE.CAMEL:
        value += Command.camel(name);
        break;
      case this.TYPE.PASCAL:
        value += Command.pascal(name);
        break;
      default:
        break;
    }
    value += ' = ';
    this.write(value);
  }
}
