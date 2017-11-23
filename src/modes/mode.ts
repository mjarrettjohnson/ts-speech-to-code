const annyang = require('annyang');

class Speech {
  addCommands: Function;
  removeCommands: Function;
  start: Function;
  addCallback: Function;
}

export class Mode {
  private speech: Speech;
  private commands: Array<{}>;
  constructor() {
    this.speech = annyang;
    this.commands = [];
    this.start();
  }

  addCommands(commands: {} | Array<{}>): void {
    if (!Array.isArray(commands)) {
      this.speech.addCommands(commands);
      this.commands.push(commands);
    } else {
      this.commands = this.commands.concat(commands);
      commands.forEach((command: {}) => {
        this.speech.addCommands(command);
      });
    }
  }

  getCommands(): Array<{}> {
    return this.commands;
  }

  start(): void {
    this.speech.start();
  }

  remove(): void {
    this.speech.removeCommands();
    this.commands = [];
  }

  addCallback(e: string, callback: Function): void {
    this.speech.addCallback(e, callback);
  }
}
