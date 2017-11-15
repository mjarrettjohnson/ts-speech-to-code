const prettier = require('prettier-standalone');

export class Writer {
  static print(text: string): string {
    try {
      return prettier.format(text);
    } catch (e) {
      try {
        return prettier.format(text, { parser: 'json' });
      } catch (e) {
        return text;
      }
    }
  }
}
