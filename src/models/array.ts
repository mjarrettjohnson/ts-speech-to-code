import { IWriteable } from './index';
export class Arr implements IWriteable {
  private values: Array<IWriteable>;
	
  constructor(values: Array<IWriteable>) {
    this.values = values;
  }

  writeValue(value: IWriteable): string {
    return `${value.write()}`;
  }

  write(): string {
    return `[${this.values.map(this.writeValue).join(', ')}]`;
  }
}
