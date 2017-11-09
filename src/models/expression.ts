import { Writeable } from './index';

export class Expression implements Writeable {
  private values: Array<Writeable>;
  private operators: Array<string>;

  constructor(values: Array<Writeable> = [], operators: Array<string> = []) {
    this.values = values;
    this.operators = operators;
  }

  write(): string {
    let result = '';
    this.values.forEach((value, i) => {
      if (i !== 0) {
        const operator = this.operators[i - 1];
        result += `${operator || ''}`;
      }
      result += `${value.write()}`;
    });
    return result;
  }
}
