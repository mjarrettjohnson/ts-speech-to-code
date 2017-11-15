import { IWriteable } from './index';

export class Obj implements IWriteable {
  private properties: Array<{ prop: string; value: IWriteable }>;

  constructor(properties: Array<{ prop: string; value: IWriteable }>) {
    this.properties = properties;
  }

  addProperty({ prop, value }: { prop: string; value: IWriteable }): void {
    this.properties.push({ prop, value });
  }

  writeProp({ prop, value }: { prop: string; value: IWriteable }): string {
    return `${prop}: ${value.write()}`;
  }

  write(): string {
    return `{${this.properties.map(this.writeProp).join(', ')}}`;
  }
}
