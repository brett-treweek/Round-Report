import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { StoreProvider } from "./utils/GobalState";
import Home from "./pages/Home/Home";
import RoundReport from "./pages/RoundReport/RoundReport";
import CreateHazard from "./pages/CreateHazard/CreateHazard";
import History from "./pages/History/History";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import SignIn from "./pages/SignIn/SignIn";


// using http link with apollo server
const httpLink = createHttpLink({
  uri: "http://localhost:3001/graphql"
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
          <StoreProvider>
            <Header />
            <div className="content">
              <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/round-report" component={RoundReport} />
                <Route exact path="/create-hazard" component={CreateHazard} />
                <Route exact path="/history" component={History} />
                <Route exact path="/signIn" component={SignIn} />
              </Switch>
            </div>
            <Footer />
          </StoreProvider>
        </div>
      </Router>
    </ApolloProvider>
  );
}

export default App;
