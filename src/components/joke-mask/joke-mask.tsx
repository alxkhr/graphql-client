import { useMutation } from '@apollo/react-hooks';
import * as React from 'react';

import mutation from './joke-mask.graphql';

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

export function JokeMask(props: CompProps): JSX.Element {
  const [text, setText] = React.useState('');
  const [author, setAuthor] = React.useState('');
  const [addJoke] = useMutation(mutation);
  return (
    <form onClick={(e: React.MouseEvent) => e.stopPropagation()}>
      <div>
        <label htmlFor="text">Text</label>
        <textarea autoFocus id="text" value={text} onChange={(e) => setText(e.target.value)} />
      </div>
      <div>
        <label htmlFor="text">Author</label>
        <input id="author" type="text" value={author} onChange={(e) => setAuthor(e.target.value)} />
      </div>
      <button
        onClick={async (e) => {
          e.preventDefault();
          await addJoke({
            variables: {
              text,
              author: author || null,
              centerX: props.coords.x,
              centerY: props.coords.y,
            },
          });
          props.onScratch({ author, text, center: props.coords });
        }}
      >
        Scratch!
      </button>
    </form>
  );
}
