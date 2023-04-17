 //importing dependencies:
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from "@apollo/client"
import { setContext } from "@apollo/client/link/context";

import React from "react"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import SearchBooks from "./pages/SearchBooks"
import SavedBooks from "./pages/SavedBooks"
import Navbar from "./components/Navbar"

//Creating an httpLink that connects to your GraphQL API server
const httpLink = createHttpLink({
  uri: "/graphql",
});

//Setting up the authentication middleware to add the token to the request header
const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("id_token")
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

//Creating an instance of the ApolloClient
const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});


function App() {
  return (
    <ApolloProvider client={client}>
    <Router>
      <>
        <Navbar />
        <Switch>
          <Route exact path="/" component={SearchBooks} />
          <Route exact path="/saved" component={SavedBooks} />
          <Route render={() => <h1 className="display-2">Wrong page!</h1>} />
        </Switch>
      </>
    </Router>
  </ApolloProvider>
  );
}
