import React from 'react';
import ReactDOM from 'react-dom';
import ApolloProvider from './providers/apollo';
import App from './App';
import './style.css';

ReactDOM.render( <ApolloProvider><App /></ApolloProvider>, document.getElementById('root'));