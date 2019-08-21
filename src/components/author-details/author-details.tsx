import { useQuery } from '@apollo/react-hooks';
import * as React from 'react';

import css from './author-details.css';
import query from './author-details.graphql';

interface CompProps {
  authorId: string | null; // TODO maybe codegen type
  refetch: boolean;
}

export function AuthorDetails(props: CompProps): JSX.Element {
  const { loading, error, data, refetch } = useQuery(query, { variables: { id: props.authorId } });
  if (props.refetch) {
    refetch();
  }
  if (loading || error) {
    return <></>;
  }
  return data.author.jokes.map((
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
