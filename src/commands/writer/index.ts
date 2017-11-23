import { ICommand, Command } from '../command';
import { Stage } from '../../editor/stage';
import { ValueCommands } from './value';
import { OperatorCommands } from './operator';
import { VariableCommands } from './variable';
export class WriteCommands implements ICommand {
  WRITE = {
    STAGE: 'export stage',
    UNDO: 'undo',
  };

  private commands: Array<ICommand>;
  private stage: Stage;

  constructor(stage: Stage) {
    this.stage = stage;
    this.commands = [
      new ValueCommands(stage),
      new OperatorCommands(stage),
      new VariableCommands(stage),
    ];
  }

  get(): Array<{}> {
    const all = this.commands.map(command => command.get());
    const flattened = [].concat.apply([], all);

    flattened.push(
      new Command(this.WRITE.STAGE, () => this.stage.write()).get(),
      new Command(this.WRITE.UNDO, () => this.stage.undo()).get()
    );
    return flattened;
  }
}
