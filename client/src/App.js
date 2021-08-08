import Home from "./pages/Home/Home"
import RoundReport from "./pages/RoundReport/RoundReport"
import CreateHazard from "./pages/CreateHazard/CreateHazard"
import History from "./pages/History/History"
import Header from "./components/Header/Header";import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';
import Footer from "./components/Footer/Footer";
import SignIn from "./pages/SignIn/SignIn";



function App() {
  return (
    <Router>
      <div className="App">
        <Header/>
        <div className="content">
          <Switch>
            <Route exact path='/'>
              <Home/>
            </Route>
            <Route exact path='/round-report'>
              <RoundReport/>
            </Route>
            <Route exact path='/create-hazard'>
              <CreateHazard/>
            </Route>
            <Route exact path='/history'>
              <History/>
            </Route>
            <Route exact path='/signIn'>
              <SignIn/>
            </Route>
          </Switch>
        </div>
        <Footer/>
      </div>
    </Router>
    
  );
}

export default App;
