import * as React from 'react';
import * as CodeMirror from 'codemirror';

import { Editor } from './editor';
import { Mode } from './modes/mode';
import { Level } from './commands/level';
import { Stage } from './editor/stage';

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
  stage: Stage;

  constructor() {
    super();
    this.state = { spoken: '', mode: 'javascript', theme: 'material' };
    this.mode = new Mode();
  }

  setWordsSpoken(spoken: Array<string>) {
    this.setState({ spoken: spoken[0] });
  }

  componentDidMount() {
    const editor = document.getElementById('editor') as HTMLTextAreaElement;
    const stageTextArea = document.getElementById(
      'stage'
    ) as HTMLTextAreaElement;
    this.editor = new Editor(
      CodeMirror.fromTextArea(editor, {
        lineNumbers: true,
        mode: this.state.mode,
        theme: this.state.theme,
        lineWrapping: true,
      })
    );

    const stage = new Editor(
      CodeMirror.fromTextArea(stageTextArea, {
        lineNumbers: true,
        mode: this.state.mode,
        theme: this.state.theme,
        lineWrapping: true,
      })
    );

    this.stage = new Stage(this.editor, stage);
    const level = new Level(this.editor, this.mode, this.stage);
    const commands = level.get();
    console.log(commands);
    this.mode.addCommands(commands);
    this.mode.addCallback('result', this.setWordsSpoken.bind(this));
  }

  render() {
    return (
      <div className="App">
        <div style={{ marginLeft: '240px', marginRight: '240px' }}>
          <div className="row">
            <div className="col-md-12">
              <h3>{this.state.spoken}</h3>
            </div>
          </div>
          <hr />
          <div className="row">
            <div className="col-md-8 text-left">
              <h2>Main</h2>
              <textarea id="editor" />
            </div>
            <div className="col-md-4 text-left">
              <h2>Stage</h2>
              <textarea id="stage" style={{ height: '100px' }} />
            </div>
          </div>
          <hr />
        </div>
      </div>
    );
  }
}

export default App;
