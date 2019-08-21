import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import * as React from 'react';

export function JokeList(): JSX.Element {
  // TODO load on higher component
  const { loading, error, data } = useQuery(gql`
    {
      jokes {
        text
        center {
          x
          y
        }
        author {
          name
        }
      }
    }
  `);
  if (loading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Failed to load: {error.message}</div>;
  }
  return (
    <div>
      {data.jokes.map((joke: any, i: number) => (
        <div
          key={i}
          style={{
            display: 'flex',
            height: '0',
            width: '0',
            alignItems: 'center',
            justifyContent: 'center',
            transform: `translate3d(${joke.center.x}px, ${joke.center.y}px, 0)`,
            fontFamily: '"Comic Sans MS", cursive, sans-serif',
          }}
        >
          <div style={{ whiteSpace: 'pre' }}>{joke.text}</div>
        </div>
      ))}
    </div>
  );
}
