import { Writeable } from './index';

export class Obj implements Writeable {
  private properties: Array<{ prop: string; value: Writeable }>;

  constructor(properties: Array<{ prop: string; value: Writeable }>) {
    this.properties = properties;
  }

  addProperty({ prop, value }: { prop: string; value: Writeable }): void {
    this.properties.push({ prop, value });
  }

  writeProp({ prop, value }: { prop: string; value: Writeable }): string {
    return `${prop}: ${value.write()}`;
  }

  write(): string {
    return `{${this.properties.map(this.writeProp).join(', ')}}`;
  }
}
