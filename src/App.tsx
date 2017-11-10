import * as React from 'react';
import * as CodeMirror from 'codemirror';

import { Editor } from './editor';
import { Mode } from './modes/mode';
import { BaseCommands } from './commands';

import './App.css';
import '../node_modules/codemirror/mode/javascript/javascript';
import '../node_modules/codemirror/theme/material.css';
import '../node_modules/codemirror/lib/codemirror.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

class App extends React.Component {
  state: {
    spoken: string;
    mode: string;
    theme: string;
  };
  mode: Mode;
  editor: Editor;

  constructor() {
    super();
    this.state = { spoken: '', mode: 'javascript', theme: 'material' };
  }

  setWordsSpoken(spoken: Array<string>) {
    this.setState({ spoken: spoken[0] });
  }

  componentDidMount() {
    const editor = document.getElementById('editor') as HTMLTextAreaElement;
    this.mode = new Mode();
    this.editor = new Editor(
      CodeMirror.fromTextArea(editor, {
        lineNumbers: true,
        mode: this.state.mode,
        theme: this.state.theme,
        lineWrapping: true,
      })
    );
    const baseCommands = new BaseCommands(this.editor);
    const commands = baseCommands.get();
    console.log(commands);
    this.mode.addCommands(commands);
    this.mode.addCallback('result', this.setWordsSpoken.bind(this));
  }

  render() {
    return (
      <div className="App">
        <div className="container">
          <div className="row">
            <div className="col-md-10 col-md-offset-1 text-left">
              <textarea id="editor" />
            </div>
          </div>
          <div className="row">
            <div className="col-md-10 col-md-1">
              <h3>{this.state.spoken}</h3>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
