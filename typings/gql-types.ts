export type Maybe<T> = T | null;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string,
  String: string,
  Boolean: boolean,
  Int: number,
  Float: number,
  /** The `Upload` scalar type represents a file upload. */
  Upload: any,
};


export type Author = {
  __typename?: 'Author',
  id: Scalars['ID'],
  name: Scalars['String'],
  jokes: Array<Joke>,
};

export enum CacheControlScope {
  Public = 'PUBLIC',
  Private = 'PRIVATE'
}

export type Coordinates = {
  __typename?: 'Coordinates',
  x: Scalars['Int'],
  y: Scalars['Int'],
};

export type Joke = {
  __typename?: 'Joke',
  text: Scalars['String'],
  center: Coordinates,
  author?: Maybe<Author>,
};

export type Mutation = {
  __typename?: 'Mutation',
  addJoke?: Maybe<Joke>,
};


export type MutationAddJokeArgs = {
  text: Scalars['String'],
  author?: Maybe<Scalars['String']>,
  centerX: Scalars['Int'],
  centerY: Scalars['Int']
};

export type Query = {
  __typename?: 'Query',
  jokes: Array<Joke>,
  authors: Array<Author>,
  author?: Maybe<Author>,
};


export type QueryAuthorArgs = {
  id?: Maybe<Scalars['String']>
};

export type AuthorQueryVariables = {
  id: Scalars['String']
};


export type AuthorQuery = (
  { __typename?: 'Query' }
  & { author: Maybe<(
    { __typename?: 'Author' }
    & { jokes: Array<(
      { __typename?: 'Joke' }
      & Pick<Joke, 'text'>
      & { center: (
        { __typename?: 'Coordinates' }
        & Pick<Coordinates, 'x' | 'y'>
      ) }
    )> }
  )> }
);

export type AuthorsQueryVariables = {};


export type AuthorsQuery = (
  { __typename?: 'Query' }
  & { authors: Array<(
    { __typename?: 'Author' }
    & Pick<Author, 'name' | 'id'>
  )> }
);

export type JokesQueryVariables = {};


export type JokesQuery = (
  { __typename?: 'Query' }
  & { jokes: Array<(
    { __typename?: 'Joke' }
    & Pick<Joke, 'text'>
    & { center: (
      { __typename?: 'Coordinates' }
      & Pick<Coordinates, 'x' | 'y'>
    ), author: Maybe<(
      { __typename?: 'Author' }
      & Pick<Author, 'name'>
    )> }
  )> }
);

export type AddJokeMutationVariables = {
  text: Scalars['String'],
  author?: Maybe<Scalars['String']>,
  centerX: Scalars['Int'],
  centerY: Scalars['Int']
};


export type AddJokeMutation = (
  { __typename?: 'Mutation' }
  & { addJoke: Maybe<(
    { __typename?: 'Joke' }
    & Pick<Joke, 'text'>
    & { author: Maybe<(
      { __typename?: 'Author' }
      & Pick<Author, 'name'>
    )>, center: (
      { __typename?: 'Coordinates' }
      & Pick<Coordinates, 'x' | 'y'>
    ) }
  )> }
);
