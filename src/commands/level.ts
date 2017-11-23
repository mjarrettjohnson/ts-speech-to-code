import { BaseCommands } from './base';
import { WriteCommands } from './writer';

import { ICommand, Command } from './command';
import { Editor } from '../editor/editor';
import { Mode } from '../modes/mode';
import { Stage, IFocus } from '../editor/stage';

export class Level implements ICommand {
  LEVEL = {
    MOVEMENT: 'level movement',
    WRITE: 'level write',
  };

  private base: BaseCommands;
  private write: WriteCommands;
  private mode: Mode;
  private editor: Editor;
  private stage: Stage;
  constructor(editor: Editor, mode: Mode, stage: Stage) {
    this.stage = stage;
    this.editor = editor;
    this.base = new BaseCommands(editor);
    this.write = new WriteCommands(this.stage);
    this.mode = mode;
  }

  get(): Array<{}> {
    const commands: Array<Command> = [
      new Command(this.LEVEL.MOVEMENT, () =>
        this.addCommands(this.base, this.editor)
      ),
      new Command(this.LEVEL.WRITE, () =>
        this.addCommands(this.write, this.stage)
      ),
    ];
    return commands.map(command => command.get());
  }

  addCommands(commandObject: ICommand, editor: IFocus) {
    editor.focus();
    this.mode.remove();
    const commands = this.get().concat(commandObject.get());
    this.mode.addCommands(commands);
    console.log('new commands: ', this.mode.getCommands());
  }
}
