import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloProvider } from 'react-apollo';
import { ApolloLink } from 'apollo-link';
import handleErrorMiddleware from '../helper/handleErrorMiddleware';
import React from 'react';

const GITHUB_BASE_URL = 'https://api.github.com/graphql';

const httpLink = new HttpLink({
  uri: GITHUB_BASE_URL,
  headers: {
    authorization: 'Bearer XXXXXXXXXXXXgithub-personal-tokenXXXXXX',
  },
});
const cache = new InMemoryCache();
const client = new ApolloClient({
  link: ApolloLink.from([handleErrorMiddleware, httpLink]),
  cache,
});

function ApolloCtxProvider(props){
  return (
    <ApolloProvider client={client}>
      {props.children}
    </ApolloProvider>
  )
}


export default ApolloCtxProvider;