import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloProvider } from 'react-apollo';
import { ApolloLink } from 'apollo-link';
import handleErrorMiddleware from '../helper/handleErrorMiddleware';
import React from 'react';

const SPACEX_BASE_URL = 'https://api.spacex.land/graphql/';

const authMiddleware = new ApolloLink((operation, forward) => {
  // add the authorization to the headers
  operation.setContext({
    headers: {
      authorization: localStorage.getItem('token') || null,
    }
  });
  return forward(operation);
})
const httpLink = new HttpLink({
  uri: SPACEX_BASE_URL
});
const cache = new InMemoryCache();
const client = new ApolloClient({
  link: ApolloLink.from([authMiddleware, handleErrorMiddleware, httpLink]),
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