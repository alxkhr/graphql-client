import { useQuery } from '@apollo/react-hooks';
import * as React from 'react';

import { AuthorQuery } from '../../../typings/gql-types';
import css from './author-details.css';
import query from './author-details.graphql';

interface CompProps {
  authorId: string | null;
  refetch: boolean;
}

export function AuthorDetails(props: CompProps): JSX.Element {
  const { loading, error, data = { author: null }, refetch } = useQuery<AuthorQuery>(query, {
    variables: { id: props.authorId },
  });
  if (props.refetch) {
    refetch();
  }
  if (loading || error || data.author === null) {
    return <></>;
  }
  return (
    <div>
      {data.author.jokes.map((joke, i) => (
        <div
          key={i}
          className={css.joke}
          style={{ transform: `translate3d(${joke.center.x}px, ${joke.center.y}px, 0)` }}
        >
          <div>{joke.text}</div>
        </div>
      ))}
    </div>
  );
}
