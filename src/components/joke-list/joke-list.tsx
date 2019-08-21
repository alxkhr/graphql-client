import { useQuery } from '@apollo/react-hooks';
import * as React from 'react';

import css from './joke-list.css';
import query from './joke-list.graphql';

interface CompProps {
  refetch: boolean;
}

export function JokeList(props: CompProps): JSX.Element {
  const { loading, error, data, refetch } = useQuery(query); // TODO cast to codegen type
  if (props.refetch) {
    refetch();
  }
  if (loading || error) {
    return <></>;
  }
  return data.jokes.map((
    joke: any, // TODO codegen type
    i: number,
  ) => (
    <div
      key={i}
      className={css.joke}
      style={{ transform: `translate3d(${joke.center.x}px, ${joke.center.y}px, 0)` }}
    >
      <div>{joke.text}</div>
    </div>
  ));
}
