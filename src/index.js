import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { ApolloProvider } from 'react-apollo';
import { setContext } from 'apollo-link-context';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';
import { ApolloClient } from 'apollo-client';
import { BrowserRouter } from "react-router-dom";

import "./translations/i18n";

require('dotenv').config()

const cache = new InMemoryCache();
const link = new HttpLink({
  uri: 'http://localhost:11117/'
})

const authLink = setContext((_, { headers }) => {
  return {
    headers: {
      ...headers,
      authorization: `U2FsdGVkX19EnPS8C7L/9o/u69PdJQAXlQkZRl2zu3jB6/Ie9JG7/zW3OYoZpYEccELlsPK5rHcDRBrrqs34pQ==`,
    }
  }
});

export const client = new ApolloClient({
  cache,
  link: authLink.concat(link),
})

// const client = new Client({
//   url: "https://jzhxgtettzgthca7uv3r6zp2vy.appsync-api.us-east-1.amazonaws.com/graphql",
//   region:  "us-east-1",
//   auth: {
//     type: 'API_KEY',
//     apiKey: "da2-b25ucfo4cjhyrldpzp7tvaqzpy"
//   }
// });

// const WithProvider = () => (

// );
ReactDOM.render(
  <BrowserRouter>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </BrowserRouter>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
export default client;
