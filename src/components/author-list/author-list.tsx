import { useQuery } from '@apollo/react-hooks';
import * as React from 'react';

import { AuthorsQuery } from '../../../typings/gql-types';
import query from './author-list.graphql';

interface CompProps {
  refetch: boolean;
  onClickAuthor: (id: string | undefined) => void;
}

export function AuthorList(props: CompProps): JSX.Element {
  const { loading, error, data = { authors: [] }, refetch } = useQuery<AuthorsQuery>(query);
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
          <button key={i} onClick={() => props.onClickAuthor(author.id)}>
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
