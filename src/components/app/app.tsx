import * as React from 'react';

import { AuthorDetails } from '../author-details/author-details';
import { AuthorList } from '../author-list/author-list';
import { JokeList } from '../joke-list/joke-list';
import { JokeMask } from '../joke-mask/joke-mask';
import css from './app.css';

enum UIMode {
  Default,
  Editing,
}

interface CompState {
  uiMode: UIMode;
  selectedAuthorId: string | null | undefined; // TODO codegen type (partly)
}

export class App extends React.Component<{}, CompState> {
  public state = {
    uiMode: UIMode.Default,
    selectedAuthorId: undefined,
  };
  private lastClickCoords = { x: 0, y: 0 }; // TODO codegen type
  private refetch = false;
  constructor(props: {}) {
    super(props);
    this.onClickBackground = this.onClickBackground.bind(this);
    this.onClickMask = this.onClickMask.bind(this);
    this.onScratch = this.onScratch.bind(this);
  }
  public render(): JSX.Element {
    return (
      <div>
        <div className={css.authors}>
          <AuthorList
            refetch={this.refetch}
            onClickAuthor={(id) => this.setState({ selectedAuthorId: id })}
          />
        </div>
        <div className={css.container}>
          {this.state.uiMode === UIMode.Editing && (
            <div className={css.mask} onClick={this.onClickMask}>
              <JokeMask coords={this.lastClickCoords} onScratch={this.onScratch} />
            </div>
          )}
          <div className={css.jokes}>
            {this.state.selectedAuthorId === undefined ? (
              <JokeList refetch={this.refetch} />
            ) : (
              <AuthorDetails refetch={this.refetch} authorId={this.state.selectedAuthorId!} />
            )}
          </div>
          <div className={css.background} onClick={this.onClickBackground}>
            <img src="toilet-door-dummy.jpg" />
          </div>
        </div>
      </div>
    );
  }
  public componentDidUpdate(): void {
    this.refetch = false;
  }
  private onClickBackground(event: React.MouseEvent): void {
    this.setState({ uiMode: UIMode.Editing });
    this.lastClickCoords = {
      x: event.clientX,
      y: event.clientY,
    };
  }
  private onClickMask(): void {
    this.setState({ uiMode: UIMode.Default });
  }
  private onScratch(): void {
    this.refetch = true;
    this.setState({ uiMode: UIMode.Default });
  }
}
