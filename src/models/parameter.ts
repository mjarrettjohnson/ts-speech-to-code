import { IWriteable } from './index';
import { Value } from './value';

export class Parameter implements IWriteable {
  private name: Value;
  private defaultValue: IWriteable | void;

  constructor(name: Value, defaultValue?: IWriteable | void) {
    this.name = name;
    this.defaultValue = defaultValue;
  }

  write(): string {
    if (this.defaultValue) {
      return `${this.name.write()} = ${this.defaultValue.write()}`;
    }
    return `${this.name.write()}`;
  }
}
