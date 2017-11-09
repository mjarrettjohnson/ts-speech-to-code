import { Writeable } from './index';
export class Arr implements Writeable {
  private values: Array<Writeable>;
  constructor(values: Array<Writeable>) {
    this.values = values;
  }

  writeValue(value: Writeable): string {
    return `${value.write()}`;
  }

  write(): string {
    return `[${this.values.map(this.writeValue).join(', ')}]`;
  }
}
