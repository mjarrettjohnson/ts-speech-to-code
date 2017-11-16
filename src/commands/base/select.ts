import { CM_COMMANDS } from './index';
import { Command, ICommand } from '../command';
import * as CodeMirror from 'codemirror';
import { Editor } from '../../editor';

export class SelectCommands implements ICommand {
  SELECT = {
    ENTIRE_LINE: 'select entire line',
    WORD_RIGHT: 'select word right',
    N_WORDS_RIGHT: 'select :num words right',
    WORD_LEFT: 'select word left',
    NUM_WORDS_LEFT: 'select :num words right',
    TO_LINE_END: 'select to end of the line',
    TO_LINE_START: 'select to start of the line',
    RANGE: 'select from :start to :end',
  };

  private editor: Editor;

  constructor(editor: Editor) {
    this.editor = editor;
  }

  get(): Array<{}> {
    const commands: Array<Command> = [
      new Command(this.SELECT.ENTIRE_LINE, this.selectEntireLine.bind(this)),
      new Command(this.SELECT.WORD_LEFT, this.selectWordLeft.bind(this)),
      new Command(this.SELECT.WORD_RIGHT, this.selectWordRight.bind(this)),
      new Command(this.SELECT.N_WORDS_RIGHT, this.selectWordsRight.bind(this)),
      new Command(this.SELECT.NUM_WORDS_LEFT, this.selectWordsLeft.bind(this)),
      new Command(this.SELECT.TO_LINE_END, this.selectToLineEnd.bind(this)),
      new Command(this.SELECT.TO_LINE_START, this.selectToLineStart.bind(this)),
      new Command(this.SELECT.RANGE, this.selectRange.bind(this)),
    ];
    return commands.map(command => command.get());
  }

  selectEntireLine(): void {
    const currentPos: CodeMirror.Position = this.editor.getCursor();
    currentPos.ch = 0;
    const endPos: CodeMirror.Position = new CodeMirror.Pos(
      currentPos.line + 1,
      0
    );

    this.editor.selectRange(currentPos, endPos);
  }

  selectWordLeft(): void {
    const currentPos: CodeMirror.Position = this.editor.getCursor();
    this.editor.execute(CM_COMMANDS.MOVE_WORD_BACKWARD);
    const endPos: CodeMirror.Position = this.editor.getCursor();

    this.editor.selectRange(currentPos, endPos);
  }

  selectWordsLeft(num: string): void {
    const currentPos: CodeMirror.Position = this.editor.getCursor();
    const count = Command.parseWordToNumber(num);

    for (let i = 0; i < count; i++) {
      this.editor.execute(CM_COMMANDS.MOVE_WORD_BACKWARD);
    }
    const endPos: CodeMirror.Position = this.editor.getCursor();
    this.editor.selectRange(currentPos, endPos);
  }

  selectWordRight(): void {
    const currentPos: CodeMirror.Position = this.editor.getCursor();
    this.editor.execute(CM_COMMANDS.MOVE_WORD_FORWARD);
    const endPos: CodeMirror.Position = this.editor.getCursor();

    this.editor.selectRange(currentPos, endPos);
  }

  selectWordsRight(num: string): void {
    const currentPos: CodeMirror.Position = this.editor.getCursor();
    const count = Command.parseWordToNumber(num);

    for (let i = 0; i < count; i++) {
      this.editor.execute(CM_COMMANDS.MOVE_WORD_FORWARD);
    }
    const endPos: CodeMirror.Position = this.editor.getCursor();
    this.editor.selectRange(currentPos, endPos);
  }

  selectToLineStart(): void {
    const currentPos: CodeMirror.Position = this.editor.getCursor();
    this.editor.execute(CM_COMMANDS.MOVE_TO_START_OF_LINE);
    const endPos: CodeMirror.Position = this.editor.getCursor();
    this.editor.selectRange(currentPos, endPos);
  }

  selectToLineEnd(): void {
    const currentPos: CodeMirror.Position = this.editor.getCursor();
    this.editor.execute(CM_COMMANDS.MOVE_TO_END_OF_LINE);
    const endPos: CodeMirror.Position = this.editor.getCursor();
    this.editor.selectRange(currentPos, endPos);
  }

  selectRange(start: string, end: string): void {
    const startPos = new CodeMirror.Pos(
      Command.parseWordToNumber(start) - 1,
      0
    );
    const endPos = new CodeMirror.Pos(Command.parseWordToNumber(end) - 1);
    this.editor.selectRange(startPos, endPos);
  }
}
