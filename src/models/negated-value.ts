import { IWriteable } from './index';

export class NegatedValue implements IWriteable {
  private val: string;
  constructor(val: string) {
    this.val = val;
  }

  write(): string {
    return `!${this.val}`;
  }
}
