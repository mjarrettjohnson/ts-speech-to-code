import { Writeable } from './index';
import { Block } from './block';

export class If implements Writeable {
  private expressions: Array<Writeable>;
  private conditionals: Array<string>;
  private block: Block;
  private isIfElse: boolean;

  constructor(
    expressions: Array<Writeable>,
    conditionals: Array<string>,
    block: Block,
    isIfElse: boolean = false
  ) {
    this.expressions = expressions;
    this.conditionals = conditionals;
    this.block = block;
    this.isIfElse = isIfElse;
  }

  write(): string {
    let result = this.isIfElse ? 'else if (' : 'if (';
    this.expressions.forEach((expr, i) => {
      if (i === 0) {
        result += `${expr.write()}`;
      } else {
        result += `${this.conditionals[i - 1]}`;
        result += `${expr.write()}`;
      }
    });
    result += `) ${this.block.write()}`;
    return result;
  }
}
