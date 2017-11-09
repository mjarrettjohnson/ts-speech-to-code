import { Writeable } from './index';
import { Value } from './value';

export class Parameter implements Writeable {
  private name: Value;
  private defaultValue: Writeable | void;

  constructor(name: Value, defaultValue?: Writeable | void) {
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
