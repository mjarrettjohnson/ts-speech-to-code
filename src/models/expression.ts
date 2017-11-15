import { IWriteable } from './index';

export class Expression implements IWriteable {
  private values: Array<IWriteable>;
  private operators: Array<string>;

  constructor(values: Array<IWriteable> = [], operators: Array<string> = []) {
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
