import { Writeable } from './index';
export class Value implements Writeable {
  private isString: boolean;
  private val: string | boolean | number;
  constructor(val: string | boolean | number, isString: boolean = false) {
    this.isString = isString;
    this.val = val;
  }

  write(): string {
    if (this.isString) {
      return `'${this.val}'`;
    } else {
      return this.val.toString();
    }
  }
}
