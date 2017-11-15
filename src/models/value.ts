import { IWriteable } from './index';
export class Value implements IWriteable {
  private isString: boolean;
  private val: string | boolean | number;
  constructor(val: string | boolean | number, isString: boolean = false) {
    this.isString = isString;
    this.val = val;
  }

  write(): string {
    if (this.isString) {
      const value = this.val as string;
      if (value.indexOf(`'`) !== -1 || value.indexOf(`"`) !== -1) {
        return `\`${this.val}\``;
      }
      return `'${this.val}'`;
    } else {
      return this.val.toString();
    }
  }
}
