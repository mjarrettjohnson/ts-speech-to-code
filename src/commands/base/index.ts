import { MovementCommands } from './movement';
import { DeleteCommands } from './delete';
import { SelectCommands } from './select';
import { ICommand } from '../command';
import { Editor } from '../../editor';

export class BaseCommands implements ICommand {
  private commands: Array<ICommand>;
  constructor(editor: Editor) {
    this.commands = [
      new MovementCommands(editor),
      new DeleteCommands(editor),
      new SelectCommands(editor),
    ];
  }

  get(): Array<{}> {
    const all = this.commands.map(command => command.get());

    return [].concat.apply([], all);
  }
}

export const CM_COMMANDS = {
  MOVE_UP: 'goLineUp',
  MOVE_DOWN: 'goLineDown',
  MOVE_WORD_FORWARD: 'goWordRight',
  MOVE_WORD_BACKWARD: 'goWordLeft',
  MOVE_TO_END_OF_LINE: 'goLineEnd',
  MOVE_TO_START_OF_LINE: 'goLineStart',
  DELETE_LINE: 'deleteLine',
  DELETE_WORD_RIGHT: 'delWordAfter',
  DELETE_WORD_LEFT: 'delWordBefore',
  DELETE_LINE_LEFT: 'delWrappedLineLeft',
  DELETE_LINE_RIGHT: 'delWrappedLineRight',
};
