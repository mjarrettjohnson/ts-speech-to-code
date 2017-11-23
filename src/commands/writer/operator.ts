import { ICommand, Command } from '../command';

import { OPERATORS } from '../../models/';
import { Stage } from '../../editor/stage';

export class OperatorCommands implements ICommand {
  OPERATOR = {
    ADD: 'add operator *operator',
  };

  private stage: Stage;

  constructor(stage: Stage) {
    this.stage = stage;
  }

  get(): Array<{}> {
    const commands: Array<Command> = [
      new Command(this.OPERATOR.ADD, this.addOperator.bind(this)),
    ];

    return commands.map(command => command.get());
  }

  addOperator(operator: string) {
    const op = operator.replace(' ', '_').toUpperCase();
    const result = OPERATORS[op];
    if (result) {
      this.stage.addText(result);
    }
  }
}
