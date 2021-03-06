import { IWriteable } from './index';

export class Variable implements IWriteable {
  static types = {
    CONSTANT: 'constant',
    LET: 'let',
    REGULAR: 'regular',
    THIS: 'this',
  };

  private name: string;
  private type: string;
  private value: IWriteable;

  constructor(
    name: string,
    value: IWriteable,
    type: string = Variable.types.CONSTANT
  ) {
    this.type = type;
    this.name = name;
    this.value = value;
  }

  write(): string {
    switch (this.type) {
      case Variable.types.CONSTANT:
        return `const ${this.name} = ${this.value.write()}`;
      case Variable.types.LET:
        return `let ${this.name} = ${this.value.write()}`;
      case Variable.types.THIS:
        return `this.${this.name} = ${this.value.write()}`;
      case Variable.types.REGULAR:
        return `var ${this.name} = ${this.value.write()}`;
      default:
        return '';
    }
  }
}
