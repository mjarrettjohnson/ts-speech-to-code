import { MovementCommands } from './movement';
import { DeleteCommands } from './delete';
import { SelectCommands } from './select';
import { Editor } from '../editor';

const wordsToNum = require('words-to-num');

export class BaseCommands implements ICommand {
  private editor: Editor;
  private commands: Array<ICommand>;
  constructor(editor: Editor) {
    this.editor = editor;
    this.commands = [
      new MovementCommands(editor),
      new DeleteCommands(editor),
      new SelectCommands(editor),
    ];
  }

  get(): Array<{}> {
    const all: Array<Array<{}>> = this.commands.map(command => command.get());

    return [].concat.apply([], all);
  }
}

export interface ICommand {
  get(): Array<{}>;
}

export class Command {
  command: {};

  static camel(words: string): string {
    const arr = words.split(' ');
    return arr
      .map((word, i) => {
        if (i === 0) {
          return word.toLowerCase();
        }
        const caps = word[0].toUpperCase();
        const rest = word.slice(1, word.length);
        return caps + rest.toLowerCase();
      })
      .join('');
  }

  static pascal(words: string): string {
    const arr = words.split(' ');
    return arr
      .map((word, i) => {
        const caps = word[0].toUpperCase();
        const rest = word.slice(1, word.length);
        return caps + rest.toLowerCase();
      })
      .join('');
  }

  static parseWordToNumber(word: string): number {
    let num = Number(word);
    if (isNaN(num)) {
      switch (word) {
        case 'one':
          num = 1;
          break;
        case 'two':
        case 'to':
          num = 2;
          break;
        case 'three':
          num = 3;
          break;
        case 'for':
          num = 4;
          break;
        default:
          return wordsToNum.convert(word);
      }
    }
    return num;
  }
  constructor(name: string, action: Function) {
    this.command = {};
    this.command[name] = action;
  }

  get() {
    return this.command;
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
