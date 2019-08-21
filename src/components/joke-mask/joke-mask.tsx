import * as React from 'react';

interface Joke {
  text: string;
  author: string;
  center: { x: number; y: number };
} // TODO replace with gql codegen type

interface CompProps {
  coords: {
    x: number;
    y: number;
  };
  onScratch: (joke: Joke) => void;
}

interface CompState {
  text: string;
  author: string;
}

export class JokeMask extends React.Component<CompProps, CompState> {
  public state = {
    text: '',
    author: '',
  };
  constructor(props: CompProps) {
    super(props);
    this.onScratch = this.onScratch.bind(this);
  }
  public render(): JSX.Element {
    return (
      <form>
        <div>
          <label htmlFor="text">Text</label>
          <textarea
            id="text"
            value={this.state.text}
            onChange={(e) => this.setState({ text: e.target.value })}
          />
        </div>
        <div>
          <label htmlFor="text">Author</label>
          <input
            id="author"
            type="text"
            value={this.state.author}
            onChange={(e) => this.setState({ author: e.target.value })}
          />
        </div>
        <button onClick={this.onScratch}>Scratch!</button>
      </form>
    );
  }
  private onScratch(event: React.MouseEvent): void {
    event.preventDefault();
    const { author, text } = this.state;
    const { coords: center } = this.props;
    // TODO request mutation
    this.props.onScratch({ author, text, center });
  }
}
