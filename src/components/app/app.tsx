import * as React from 'react';

import { JokeList } from '../joke-list/joke-list';
import { JokeMask } from '../joke-mask/joke-mask';
import css from './app.css';

enum UIMode {
  Default,
  Editing,
}

interface CompState {
  uiMode: UIMode;
  lastClickCoords: { x: number; y: number }; // TODO codegen type
}

export class App extends React.Component<{}, CompState> {
  public state = {
    uiMode: UIMode.Default,
    lastClickCoords: { x: 0, y: 0 },
  };
  constructor(props: {}) {
    super(props);
    this.onClickBackground = this.onClickBackground.bind(this);
    this.onScratch = this.onScratch.bind(this);
  }
  public render(): JSX.Element {
    return (
      <div className={css.container}>
        {this.state.uiMode === UIMode.Editing && (
          <div className={css.mask}>
            <JokeMask coords={this.state.lastClickCoords} onScratch={this.onScratch} />
          </div>
        )}
        <div className={css.list}>
          <JokeList />
        </div>
        <div
          className={css.background}
          style={{ pointerEvents: this.state.uiMode === UIMode.Default ? 'all' : 'none' }}
          onClick={this.onClickBackground}
        >
          <img src="toilet-door-dummy.jpg" />
        </div>
      </div>
    );
  }
  private onClickBackground(event: React.MouseEvent): void {
    this.setState({
      uiMode: UIMode.Editing,
      lastClickCoords: {
        x: event.clientX,
        y: event.clientY,
      },
    });
  }
  private onScratch(): void {
    this.setState({ uiMode: UIMode.Default });
  }
}
