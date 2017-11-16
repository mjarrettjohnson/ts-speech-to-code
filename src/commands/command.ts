const wordsToNum = require('words-to-num');

export interface ICommand {
  get(): Array<{ [key: string]: Function }>;
}

export interface IWriterCommand {
  write(text: string): void;
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
