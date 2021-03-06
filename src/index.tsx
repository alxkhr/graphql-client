import { ApolloProvider } from '@apollo/react-hooks';
import ApolloClient from 'apollo-boost';
import * as React from 'react';
import { render } from 'react-dom';

import { App } from './components/app/app';

const client = new ApolloClient({
  uri: 'https://scratches.glitch.me/',
});

render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById('root'),
);
