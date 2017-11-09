import { Command, ICommand, CM_COMMANDS } from './index';
import * as CodeMirror from 'codemirror';
import { Editor } from '../editor';

export class MovementCommand implements ICommand {
  MOVE = {
    UP: 'go up :num',
    DOWN: 'go down :num',
    TO_LINE: 'go to line :num',
    WORD_RIGHT: 'move :num word(s) right',
    WORD_LEFT: 'move :num word(s) left',
    END_OF_LINE: 'end of the line',
    START_OF_LINE: 'start of the line',
  };

  private editor: Editor;

  constructor(editor: Editor) {
    this.editor = editor;
  }

  get() {
    const commands = [
      new Command(this.MOVE.DOWN, this.moveDown.bind(this)),
      new Command(this.MOVE.UP, this.moveUp.bind(this)),
      new Command(this.MOVE.START_OF_LINE, this.goToStartOfLine.bind(this)),
      new Command(this.MOVE.END_OF_LINE, this.goToEndOfLine.bind(this)),
      new Command(this.MOVE.WORD_RIGHT, this.moveWordsRight.bind(this)),
      new Command(this.MOVE.WORD_LEFT, this.moveWordsLeft.bind(this)),
      new Command(this.MOVE.TO_LINE, this.goToLine.bind(this)),
    ];

    return commands.map(command => command.get());
  }

  goToEndOfLine(): void {
    this.editor.execute(CM_COMMANDS.MOVE_TO_END_OF_LINE);
  }

  goToStartOfLine(): void {
    this.editor.execute(CM_COMMANDS.MOVE_TO_START_OF_LINE);
  }

  goToLine(num: string): void {
    const count = Command.parseWordToNumber(num);
    this.editor.setCursor(new CodeMirror.Pos((count - 1) as number));
  }

  moveDown(num: string | void): void {
    if (!num) {
      num = '1';
    }

    const count = Command.parseWordToNumber(num);

    for (let i = 0; i < count; i++) {
      this.editor.execute(CM_COMMANDS.MOVE_DOWN);
    }
  }

  moveUp(num: string | void): void {
    if (!num) {
      num = '1';
    }

    const count = Command.parseWordToNumber(num);

    for (let i = 0; i < count; i++) {
      this.editor.execute(CM_COMMANDS.MOVE_UP);
    }
  }

  moveWordsRight(num: string): void {
    const count = Command.parseWordToNumber(num);

    for (let i = 0; i < count; i++) {
      this.editor.execute(CM_COMMANDS.MOVE_WORD_FORWARD);
    }
  }

  moveWordsLeft(num: string): void {
    const count = Command.parseWordToNumber(num);

    for (let i = 0; i < count; i++) {
      this.editor.execute(CM_COMMANDS.MOVE_WORD_BACKWARD);
    }
  }
}
