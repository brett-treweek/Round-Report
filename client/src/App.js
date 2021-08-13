import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from "@apollo/client";
import Store from "./utils/GobalState";
import { setContext } from "@apollo/client/link/context";
import Home from "./pages/Home/Home";
import RoundReport from "./pages/RoundReport/RoundReport";
import CreateHazard from "./pages/CreateHazard/CreateHazard";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import SignIn from "./pages/SignIn/SignIn";

// using http link with apollo server
const httpLink = createHttpLink({
  uri: "/graphql",
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("id_token");
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});
function App() {

  return (
    <ApolloProvider client={client}>
      <Router>
        <div className="App">
          <Store>
            <Header />
            <div className="content">
              <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/round-report" component={RoundReport} />
                <Route exact path="/create-hazard" component={CreateHazard} />
                <Route exact path="/signIn" component={SignIn} />
                
              </Switch>
            </div>
            <Footer />
          </Store>
        </div>
      </Router>
    </ApolloProvider>
  );
}

export default App;
