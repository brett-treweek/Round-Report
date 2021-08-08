import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import RoundReport from "./pages/RoundReport/RoundReport";
import CreateHazard from "./pages/CreateHazard/CreateHazard";
import History from "./pages/History/History";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import SignIn from "./pages/SignIn/SignIn";

function App() {
  return (
    <Router>
      <div className="App">
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
      </div>
    </Router>
  );
}

export default App;
