const annyang = require('annyang');

class Speech {
  addCommands: Function;
  removeCommands: Function;
  start: Function;
  addCallback: Function;
}

export class Mode {
  private speech: Speech;
  constructor() {
    this.speech = annyang;
    this.start();
  }

  addCommands(commands: {} | Array<{}>): void {
    if (!Array.isArray(commands)) {
      this.speech.addCommands(commands);
    } else {
      commands.forEach((command: {}) => {
        this.speech.addCommands(command);
      });
    }
  }

  start(): void {
    this.speech.start();
  }

  remove(): void {
    this.speech.removeCommands();
  }

  addCallback(e: string, callback: Function): void {
    this.speech.addCallback(e, callback);
  }
}
