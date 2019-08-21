import * as React from 'react';

import { Author } from '../../../typings/gql-types';
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
  openMenu: boolean;
  selectedAuthor?: Pick<Author, 'name' | 'id'>;
}

export class App extends React.Component<{}, CompState> {
  public state: CompState = {
    uiMode: UIMode.Default,
    openMenu: false,
  };
  private lastClickCoords = { x: 0, y: 0 };
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
          <button onClick={() => this.setState((prevState) => ({ openMenu: !prevState.openMenu }))}>
            🍔
          </button>
          {this.state.openMenu && (
            <AuthorList
              refetch={this.refetch}
              onClickAuthor={(selectedAuthor) => this.setState({ selectedAuthor })}
            />
          )}
        </div>
        <div className={css.container}>
          {this.state.uiMode === UIMode.Editing && (
            <div className={css.mask} onClick={this.onClickMask}>
              <JokeMask
                coords={this.lastClickCoords}
                onScratch={this.onScratch}
                author={this.state.selectedAuthor ? this.state.selectedAuthor.name : undefined}
              />
            </div>
          )}
          <div className={css.jokes}>
            {this.state.selectedAuthor === undefined ? (
              <JokeList refetch={this.refetch} />
            ) : (
              <AuthorDetails refetch={this.refetch} authorId={this.state.selectedAuthor!.id} />
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
