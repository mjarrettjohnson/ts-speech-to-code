import { IWriteable } from './index';
import { Parameter } from './parameter';

export class Parameters implements IWriteable {
  static types = {
    DESTRUCTURED: 'destructured',
    REGULAR: 'regular',
  };

  private parameters: Array<Parameter>;
  private isDestructured: boolean;

  constructor(parameters: Array<Parameter>, isDestructured: boolean = false) {
    this.parameters = parameters;
    this.isDestructured = isDestructured;
  }

  write(): string {
    if (this.isDestructured) {
      return `{${this.parameters.map(param => param.write()).join(', ')}}`;
    }
    return this.parameters.map(param => param.write()).join(', ');
  }
}
