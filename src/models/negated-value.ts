import { Writeable } from './index';

export class NegatedValue implements Writeable {
  private val: string;
  constructor(val: string) {
    this.val = val;
  }

  write(): string {
    return `!${this.val}`;
  }
}
