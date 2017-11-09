import * as prettier from 'prettier';

export class Writer {
  static print(text: string): string {
    try {
      return prettier.format(text);
    } catch (e) {
      return prettier.format(text, { parser: 'json' });
    }
  }
}
