import { useQuery } from '@apollo/react-hooks';
import * as React from 'react';

import query from './author-list.graphql';

interface CompProps {
  refetch: boolean;
  onClickAuthor: (id: string | undefined) => void;
}

export function AuthorList(props: CompProps): JSX.Element {
  const { loading, error, data, refetch } = useQuery(query);
  if (props.refetch) {
    refetch();
  }
  if (loading || error) {
    return <></>;
  }
  return data.authors
    .map((
      author: any, // TODO codegen type
      i: number,
    ) => (
      <button key={i} onClick={() => props.onClickAuthor(author.id)}>
        {author.name}
      </button>
    ))
    .concat([
      <button key="x" onClick={() => props.onClickAuthor(undefined)}>
        <i>all</i>
      </button>,
    ]);
}
