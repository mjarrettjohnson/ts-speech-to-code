import { IWriteable } from './index';
import { Block } from './block';

export class Else implements IWriteable {
  private block: Block | void;
  constructor(block: Block | void) {
    this.block = block;
  }

  write(): string {
    let result = 'else ';
    result += this.block ? this.block.write() : '';
    return result;
  }
}
