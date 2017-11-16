import { CM_COMMANDS } from './index';
import { Command, ICommand } from '../command';
import * as CodeMirror from 'codemirror';
import { Editor } from '../../editor';

export class DeleteCommands implements ICommand {
  DELETE = {
    ENTIRE_LINE: 'delete line',
    TO_END_OF_LINE: 'delete to line end',
    TO_START_OF_LINE: 'delete to line start',
    WORD_RIGHT: 'delete word right',
    WORD_LEFT: 'delete word left',
    RANGE: 'delete from :start to :end',
    SELECTION: 'delete selection',
  };

  private editor: Editor;

  constructor(editor: Editor) {
    this.editor = editor;
  }

  get(): Array<{}> {
    const commands: Array<Command> = [
      new Command(this.DELETE.ENTIRE_LINE, this.deleteLine.bind(this)),
      new Command(this.DELETE.WORD_LEFT, this.deleteWordLeft.bind(this)),
      new Command(this.DELETE.WORD_RIGHT, this.deleteWordRight.bind(this)),
      new Command(this.DELETE.TO_START_OF_LINE, this.deleteLineLeft.bind(this)),
      new Command(this.DELETE.TO_END_OF_LINE, this.deleteLineRight.bind(this)),
      new Command(this.DELETE.RANGE, this.deleteLineRange.bind(this)),
      new Command(this.DELETE.SELECTION, this.deleteSelection.bind(this)),
    ];

    return commands.map(command => command.get());
  }

  deleteLine(): void {
    this.editor.execute(CM_COMMANDS.DELETE_LINE);
  }

  deleteWordRight(): void {
    this.editor.execute(CM_COMMANDS.DELETE_WORD_RIGHT);
  }

  deleteWordLeft(): void {
    this.editor.execute(CM_COMMANDS.DELETE_WORD_LEFT);
  }

  deleteLineLeft(): void {
    this.editor.execute(CM_COMMANDS.DELETE_LINE_LEFT);
  }
  deleteLineRight(): void {
    this.editor.execute(CM_COMMANDS.DELETE_LINE_RIGHT);
  }

  deleteLineRange(start: string, end: string): void {
    const startNum: number = Command.parseWordToNumber(start);
    const endNum: number = Command.parseWordToNumber(end);

    const startPos: CodeMirror.Position = new CodeMirror.Pos(startNum - 2);
    const endPos: CodeMirror.Position = new CodeMirror.Pos(endNum - 2);

    this.editor.replaceRange('', startPos, endPos);
  }

  deleteSelection(): void {
    this.editor.deleteSelection();
  }
}
