import { useQuery } from '@apollo/react-hooks';
import * as React from 'react';

import { Author, AuthorsQuery } from '../../../typings/gql-types';
import query from './author-list.graphql';

interface CompProps {
  refetch: boolean;
  onClickAuthor: (author?: Pick<Author, 'name' | 'id'>) => void;
}

export function AuthorList(props: CompProps): JSX.Element {
  const { loading, error, data = { authors: [] }, refetch } = useQuery<AuthorsQuery>(query, {
    pollInterval: 10000,
  });
  if (props.refetch) {
    refetch();
  }
  if (loading || error) {
    return <></>;
  }
  return (
    <div>
      {data.authors
        .map((author, i) => (
          <button key={i} onClick={() => props.onClickAuthor(author)}>
            {author.name}
          </button>
        ))
        .concat([
          <button key="x" onClick={() => props.onClickAuthor(undefined)}>
            <i>all</i>
          </button>,
        ])}
    </div>
  );
}
